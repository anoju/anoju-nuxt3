import type { LikeObj } from '~/types/modal';

export const useLike = () => {
  const likes = ref<LikeObj[]>([]);
  const likeIdx = ref(0);

  const showLike = (likeType: string = 'heart'): void => {
    const idx = likeIdx.value;
    likes.value.push({
      idx,
      type: likeType,
      show: false,
      visible: false
    });
    likeIdx.value += 1;

    nextTick(() => {
      const $like = likes.value[idx];
      $like.show = true;
      const timer = 2000;

      setTimeout(() => {
        $like.show = false;
        setTimeout(() => {
          $like.visible = false;
          const showLikes = likes.value.filter((obj) => obj.show);
          if (showLikes.length === 0) {
            likes.value = [];
            likeIdx.value = 0;
          }
        }, 300);
      }, timer);
    });
  };

  return {
    likes: readonly(likes),
    showLike
  };
};
