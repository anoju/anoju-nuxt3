import type { LoadingInput, LoadingOptions } from '~/types/modal';

export const useLoading = () => {
  const isLoading: Ref<boolean> = ref(false);
  const loadingShow: Ref<boolean> = ref(false);
  const loadingTxt: Ref<string | null> = ref(null);

  const isObject = (options: LoadingInput): options is LoadingOptions => {
    return typeof options === 'object' && options !== null;
  };

  const showLoading = (options: LoadingInput) => {
    if (options) {
      isLoading.value = true;
      if (isObject(options) && options.txt) {
        loadingTxt.value = options.txt;
      } else if (typeof options === 'string') {
        loadingTxt.value = options;
      }
      nextTick(() => {
        loadingShow.value = true;
      });
    } else if (options === false) {
      loadingShow.value = false;
      setTimeout(() => {
        isLoading.value = false;
        loadingTxt.value = null;
      }, 200);
    }
  };

  return {
    isLoading: readonly(isLoading),
    loadingShow: readonly(loadingShow),
    loadingTxt: readonly(loadingTxt),
    showLoading
  };
};
