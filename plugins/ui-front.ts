import anime, { AnimeParams } from 'animejs';

interface ScrollOptions {
  left?: number;
  top?: number;
}

const scrollTo = (el = 'window', option?: ScrollOptions, speed: number = 500, fn?: () => void) => {
  let wrap: Element | null = window.document.scrollingElement || window.document.body || window.document.documentElement;
  if (el !== 'window') {
    if (typeof el === 'string') {
      wrap = document.querySelector(el);
    } else {
      wrap = el;
    }
  }
  if (wrap === null) return;
  let leftVal = wrap.scrollLeft;
  let topVal = wrap.scrollTop;

  if (option) {
    if (option.left !== undefined) leftVal = option.left;
    if (option.top !== undefined) topVal = option.top;
  }

  anime({
    targets: wrap,
    scrollLeft: leftVal,
    scrollTop: topVal,
    duration: speed,
    easing: 'easeInOutQuad',
    complete: () => {
      if (fn) fn();
    }
  } as AnimeParams);
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('anime', anime);
  nuxtApp.provide('scrollTo', scrollTo);
});
