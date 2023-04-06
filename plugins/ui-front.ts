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

/*
const getStyle = (el: any, styleProp: string): string => {
  let value;
  const defaultView = el.ownerDocument.defaultView;
  // W3C standard way:
  if (defaultView && defaultView.getComputedStyle) {
    // sanitize property name to css notation (hypen separated words eg. font-Size)
    styleProp = styleProp.replace(/([A-Z])/g, '-$1').toLowerCase();
    return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
  } else if (el['currentStyle']) {
    // IE
    // sanitize property name to camelCase
    styleProp = styleProp.replace(/\-(\w)/g, function (str, letter) {
      return letter.toUpperCase();
    });
    value = el['currentStyle'][styleProp];
    return value;
  }

  return '';
};
*/
const getStyle = (element: any, attr: string): string | null => {
  let strValue = null;
  if (document.defaultView && document.defaultView.getComputedStyle) {
    strValue = document.defaultView.getComputedStyle(element, null).getPropertyValue(attr);
  } else if (element.currentStyle) {
    attr = attr.replace(/\-(\w)/g, (strMatch, p1) => p1.toUpperCase());
    strValue = element.currentStyle[attr];
  }
  return strValue;
};

/*
const getOffset(element: HTMLElement): { left: number, top: number } => {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left + window.pageXOffset,
    top: rect.top + window.pageYOffset
  };
}
*/
const getOffset = function (element: HTMLElement): { left: number; top: number } {
  let $el = element;
  let $elX = 0;
  let $elY = 0;
  let isSticky = false;
  while ($el && !Number.isNaN($el.offsetLeft) && !Number.isNaN($el.offsetTop)) {
    let $style = window.getComputedStyle($el);
    // const $matrix = new WebKitCSSMatrix($style.transform);
    if ($style.position === 'sticky') {
      isSticky = true;
      $el.style.position = 'static';
    }
    $elX += $el.offsetLeft;
    // $elX += $matrix.m41; //translateX
    $elY += $el.offsetTop;
    // $elY += $matrix.m42;  //translateY
    if (isSticky) {
      isSticky = false;
      $el.style.position = '';
      if ($el.getAttribute('style') === '') $el.removeAttribute('style');
    }
    $el = $el.offsetParent as HTMLElement;
    if ($el !== null) {
      $style = window.getComputedStyle($el);
      $elX += parseInt($style.borderLeftWidth);
      $elY += parseInt($style.borderTopWidth);
    }
  }
  return { left: $elX, top: $elY };
};

const getSiblings = (element: Element): Array<Element> => {
  const siblings: Array<Element> = [];
  let sibling: Element | null = element.parentElement?.firstElementChild || null;
  while (sibling) {
    if (sibling !== element) {
      siblings.push(sibling);
    }
    sibling = sibling.nextElementSibling;
  }
  return siblings;
};

const getParents = (elem: Element, selector?: string): Element[] => {
  const parents: Element[] = [];
  while (elem && elem.parentElement) {
    elem = elem.parentElement;
    if (selector) {
      if (elem.matches(selector)) {
        parents.push(elem);
      }
    } else {
      parents.push(elem);
    }
  }
  return parents;
};

const getIndex = (elem: Element): number | null => {
  if (elem.parentElement) {
    const index = Array.prototype.slice.call(elem.parentElement.children).indexOf(elem);
    return index;
  }
  return null;
};

const slideDown = (elem: HTMLElement, speed: number = 500, fn?: () => void) => {
  if (getStyle(elem, 'display') !== 'none' || elem.classList.contains('_slide_ing')) return;
  elem.classList.add('_slide_ing');
  if (speed === undefined) speed = 500;
  elem.removeAttribute('style');
  let isHide = false;
  if (getStyle(elem, 'display') === 'none') {
    elem.style.display = 'block';
    isHide = true;
  }
  const elHeight = elem.offsetHeight;
  const mgT = getStyle(elem, 'margin-top');
  const elMgT = mgT ? parseInt(mgT, 10) : 0;
  const mgB = getStyle(elem, 'margin-bottom');
  const elMgB = mgB ? parseInt(mgB, 10) : 0;
  const pdT = getStyle(elem, 'padding-top');
  const elPdT = pdT ? parseInt(pdT, 10) : 0;
  const pdB = getStyle(elem, 'padding-bottom');
  const elPdB = pdB ? parseInt(pdB, 10) : 0;

  elem.style.overflow = 'hidden';
  elem.style.height = '0px';
  elem.style.marginTop = '0px';
  elem.style.marginBottom = '0px';
  elem.style.paddingTop = '0px';
  elem.style.paddingBottom = '0px';

  anime({
    targets: elem,
    height: elHeight,
    marginTop: elMgT,
    marginBottom: elMgB,
    paddingTop: elPdT,
    paddingBottom: elPdB,
    duration: speed,
    easing: 'easeInOutQuad',
    complete: () => {
      elem.removeAttribute('style');
      elem.classList.remove('_slide_ing');
      if (isHide) elem.style.display = 'block';
      if (fn !== undefined && typeof fn === 'function') {
        fn();
      }
    }
  });
};

const slideUp = (elem: HTMLElement, speed: number = 500, fn?: () => void) => {
  if (getStyle(elem, 'display') === 'none' || elem.classList.contains('_slide_ing')) return;
  elem.classList.add('_slide_ing');
  elem.style.overflow = 'hidden';
  anime({
    targets: elem,
    height: 0,
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0,
    duration: speed,
    easing: 'easeInOutQuad',
    complete: () => {
      elem.removeAttribute('style');
      elem.classList.remove('_slide_ing');
      elem.style.display = 'none';
      if (fn !== undefined && typeof fn === 'function') {
        fn();
      }
    }
  });
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('anime', anime);
  nuxtApp.provide('scrollTo', scrollTo);
  nuxtApp.provide('getOffset', getOffset);
  nuxtApp.provide('getSiblings', getSiblings);
  nuxtApp.provide('getParents', getParents);
  nuxtApp.provide('getIndex', getIndex);
  nuxtApp.provide('slideDown', slideDown);
  nuxtApp.provide('slideUp', slideUp);
});
