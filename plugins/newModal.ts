export default defineNuxtPlugin(() => {
  // 전역 모달 시스템 초기화
  const { closeAllModals } = useNewModalSystem()

  return {
    provide: {
      // 필요시 전역 메서드 제공
      closeAllNewModals: closeAllModals
    }
  }
})
