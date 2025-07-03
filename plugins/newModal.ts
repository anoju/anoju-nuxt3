import type { Component, AsyncComponentLoader } from 'vue'
import type { NewModalOptions, NewLoadingInput, NewLikeOptions } from '@/types/newModal'

export default defineNuxtPlugin(() => {
  const { open, showLoading, showLike } = useNewModal()

  return {
    provide: {
      // 간단한 API
      newModal: (
        component: Component | AsyncComponentLoader,
        props: Record<string, any> = {},
        options: NewModalOptions = {}
      ) => open(component, props, options),

      // 로딩
      newLoading: (input: NewLoadingInput = true) => showLoading(input),

      // 좋아요
      newLike: (options: NewLikeOptions | string = {}) => showLike(options)
    }
  }
})
