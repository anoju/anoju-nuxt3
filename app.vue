<script lang="ts" setup>
const vhChk = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};
const deviceChk = () => {
  const pcClass = pcClassChk();
  const mobileClass = mobileClassChk();
  if (pcClass.length) document.documentElement.classList.add(...pcClass);
  if (mobileClass.length) document.documentElement.classList.add(...mobileClass);
};
const pcClassChk = () => {
  const $agent = navigator.userAgent;
  const isWindow = $agent.match(/windows/i) != null;
  const isMac = $agent.match(/macintosh/i) != null;
  const isChrome = $agent.match(/chrome/i) != null;
  const isFirefox = $agent.match(/firefox/i) != null;
  const isOpera = $agent.match(/opera|OPR/i) != null;
  const isSafari = $agent.match(/safari/i) != null;
  const isEdge = $agent.match(/edge/i) != null;
  const isMsie = $agent.match(/rv:11.0|msie/i) != null;
  const isIe11 = $agent.match(/rv:11.0/i) != null;
  const isIe10 = $agent.match(/msie 10.0/i) != null;
  const isIe9 = $agent.match(/msie 9.0/i) != null;
  const isIe8 = $agent.match(/msie 8.0/i) != null;
  const isAny = isWindow || isMac;

  const rtnClass = [];
  if (isAny) {
    if (isWindow) rtnClass.push('window');
    if (isMac) rtnClass.push('mac');
    if (isMsie) rtnClass.push('msie');
    if (isIe11) rtnClass.push('ie11');
    if (isIe10) rtnClass.push('ie10');
    if (isIe9) rtnClass.push('ie9');
    if (isIe8) rtnClass.push('ie8');
    if (isEdge) {
      rtnClass.push('edge');
    } else if (isOpera) {
      rtnClass.push('opera');
    } else if (isChrome) {
      rtnClass.push('chrome');
    } else if (isSafari) {
      rtnClass.push('safari');
    } else if (isFirefox) {
      rtnClass.push('firefox');
    }
  }
  return rtnClass;
};
const mobileClassChk = () => {
  const $agent = navigator.userAgent;
  const isAndroid = $agent.match(/Android/i) != null;
  const isBlackBerry = $agent.match(/BlackBerry/i) != null;
  const isIOS = $agent.match(/iPhone|iPad|iPod|iOS/i) != null;
  const isIPhone = $agent.match(/iPhone/i) != null;
  const isIPad = $agent.match(/iPad/i) != null;
  const isOpera = $agent.match(/Opera Mini/i) != null;
  const isWindows = $agent.match(/IEMobile/i) != null;
  const isNaverApp = $agent.indexOf('NAVER(inapp') !== -1;
  const isDaumApp = $agent.match(/DaumApps/i) != null;
  const isKakaoTalk = $agent.match(/KAKAOTALK/i) != null;
  // const isApp = $agent.match(/KBSecMyDataApp/i) != null;
  const isAny = isAndroid || isIOS || isBlackBerry || isOpera || isWindows;
  function tabletchk() {
    const standard = 760;
    if (window.screen.width < window.screen.height) {
      if (window.screen.width > standard) return true;
      return false;
    }
    if (window.screen.height > standard) return true;
    return false;
  }
  const isTablet = tabletchk();
  function versionChk(str: string, num: number) {
    const $sliceStart = navigator.userAgent.indexOf(str) + (str.length + 1);
    const $sliceEnd = $sliceStart + num;
    const $version = parseInt(navigator.userAgent.slice($sliceStart, $sliceEnd));
    return $version;
  }
  const rtnClass = [];
  if (isAny) {
    rtnClass.push('mobile');
    if (isTablet) rtnClass.push('tablet');

    if (isIOS) {
      rtnClass.push('ios');
      const isIPhoneVersion = versionChk('iPhone OS', 2);
      const isIPadVersion = versionChk('iPad; CPU OS', 2);
      if (isIPhone && isIPhoneVersion >= 10) rtnClass.push(`iphone_${isIPhoneVersion}`);
      if (isIPad && isIPadVersion >= 10) rtnClass.push(`ipad_${isIPadVersion}`);
    }
    if (isAndroid) rtnClass.push('android');

    if (isNaverApp) rtnClass.push('naver_app'); // 네이버앱
    if (isDaumApp) rtnClass.push('daum_app'); // 다음앱
    if (isKakaoTalk) rtnClass.push('kakao_talk'); // 카카오톡
    //  if (isApp) rtnClass.push('is_app');
  }

  return rtnClass;
};
// life cycle
onMounted(() => {
  deviceChk();
  vhChk();
  window.addEventListener('resize', vhChk);
});
onUnmounted(() => {
  window.removeEventListener('resize', vhChk);
});
</script>
<template>
  <div id="wrap">
    <NuxtPage />
  </div>
</template>
