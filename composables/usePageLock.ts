export const usePageLock = () => {
  const isLock = ref(false);
  const lockTop: Ref<number | null> = ref(null);

  const lockPage = (): void => {
    lockTop.value = window.pageYOffset * -1;
    isLock.value = true;
  };

  const unlockPage = (): void => {
    isLock.value = false;
    nextTick(() => {
      if (lockTop.value !== null) {
        window.scrollTo(0, lockTop.value * -1);
        lockTop.value = null;
      }
    });
  };

  const lockStyle = computed(() => {
    const rtnVal: any = {};
    if (lockTop.value !== null) rtnVal.top = lockTop.value + 'px';
    return rtnVal;
  });

  return {
    isLock: readonly(isLock),
    lockTop: readonly(lockTop),
    lockStyle,
    lockPage,
    unlockPage
  };
};
