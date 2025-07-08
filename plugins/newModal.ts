export default defineNuxtPlugin((nuxtApp) => {
  // 전역 모달 시스템 초기화
  const { closeAllModals, cleanup } = useNewModalSystem();

  // 브라우저 종료 시 자동 정리
  if (process.client) {
    // 페이지 언로드 시 정리
    const handleBeforeUnload = () => {
      cleanup();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // 페이지 이동 시에도 정리 (SPA에서 필요)
    nuxtApp.hook('app:beforeMount', () => {
      // 기존 리스너가 있다면 정리
      cleanup();
    });

    // 라우트 변경 시 모달 정리 (옵션)
    nuxtApp.hook('page:finish', () => {
      // 페이지 변경 시 모달 닫기 (선택사항)
      // closeAllModals();
    });

    // 플러그인 해제 시 정리
    nuxtApp.hook('app:beforeUnmount', () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      cleanup();
    });
  }

  return {
    provide: {
      // 전역 메서드 제공
      closeAllNewModals: closeAllModals,
      cleanupNewModals: cleanup,
      
      // 기존 모달 API와 유사한 새로운 API (향후 확장 가능)
      newModal: {
        closeAll: closeAllModals,
        cleanup: cleanup
      }
    }
  };
});
