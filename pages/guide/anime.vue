<script lang="ts" setup>
useHead({
  title: 'Anime.js 애니메이션 샘플'
});

// Anime.js 샘플들
const { $anime } = useNuxtApp();

// 애니메이션 대상 요소들
const boxRef = ref<HTMLElement | null>(null);
const textRef = ref<HTMLElement | null>(null);
const circlesRef = ref<HTMLElement | null>(null);
const staggerRef = ref<HTMLElement | null>(null);

// 1. 기본 박스 애니메이션
const animateBox = () => {
  if (!boxRef.value) return;
  $anime({
    targets: boxRef.value,
    translateX: 250,
    scale: 1.5,
    rotate: '1turn',
    backgroundColor: '#ff6b6b',
    duration: 1000,
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: false
  });
};

// 2. 텍스트 애니메이션 (입력 효과)
const animateText = () => {
  if (!textRef.value) return;
  const text = textRef.value;
  text.innerHTML = text.textContent!.replace(/\S/g, "<span class='letter'>$&</span>");

  $anime({
    targets: '.letter',
    opacity: [0, 1],
    scale: [0.3, 1],
    duration: 600,
    delay: (el: any, i: number) => 100 * i,
    easing: 'easeOutExpo'
  });
};

// 3. 원형 대거 애니메이션
const animateCircles = () => {
  if (!circlesRef.value) return;
  $anime({
    targets: circlesRef.value.querySelectorAll('.circle'),
    scale: [
      { value: 0.1, easing: 'easeOutSine', duration: 500 },
      { value: 1, easing: 'easeInOutQuad', duration: 1200 }
    ],
    delay: $anime.stagger(200, { grid: [3, 3], from: 'center' })
  });
};

// 4. 순차 애니메이션
const animateStagger = () => {
  if (!staggerRef.value) return;
  $anime({
    targets: staggerRef.value.querySelectorAll('.stagger-item'),
    translateY: [-30, 0],
    opacity: [0, 1],
    rotate: [180, 0],
    scale: [0.5, 1],
    duration: 800,
    delay: $anime.stagger(100),
    easing: 'easeOutElastic(1, .8)'
  });
};

// 5. 복합 애니메이션 (새로운 샘플)
const complexBoxRef = ref<HTMLElement | null>(null);
const animateComplex = () => {
  if (!complexBoxRef.value) return;
  $anime
    .timeline({
      easing: 'easeOutExpo',
      duration: 750
    })
    .add({
      targets: complexBoxRef.value,
      translateX: 200,
      rotateY: 180,
      backgroundColor: '#ff6b6b',
      borderRadius: ['8px', '50%']
    })
    .add(
      {
        targets: complexBoxRef.value,
        scale: [1, 1.4],
        rotateY: 360,
        backgroundColor: '#4ecdc4',
        borderRadius: ['50%', '8px']
      },
      '-=500'
    )
    .add({
      targets: complexBoxRef.value,
      translateX: 0,
      scale: 1,
      rotateY: 0
    });
};

// 6. Path 애니메이션
const pathRef = ref<HTMLElement | null>(null);
const animatePath = () => {
  if (!pathRef.value) return;
  const path = $anime.path(pathRef.value.querySelector('path'));

  $anime({
    targets: pathRef.value.querySelector('.circle-follow'),
    translateX: path('x'),
    translateY: path('y'),
    rotate: path('angle'),
    duration: 3000,
    easing: 'easeInOutQuad',
    loop: false
  });
};

// 7. 모든 애니메이션 리셋
const resetAnimations = () => {
  // 박스 리셋
  if (boxRef.value) {
    $anime({
      targets: boxRef.value,
      translateX: 0,
      scale: 1,
      rotate: 0,
      backgroundColor: '#4ecdc4',
      duration: 500,
      easing: 'easeInOutQuad'
    });
  }

  // 텍스트 리셋
  if (textRef.value) {
    textRef.value.innerHTML = 'Anime.js Text Animation';
  }

  // 원형들 리셋
  if (circlesRef.value) {
    $anime({
      targets: circlesRef.value.querySelectorAll('.circle'),
      scale: 1,
      duration: 300
    });
  }

  // 순차 요소들 리셋
  if (staggerRef.value) {
    $anime({
      targets: staggerRef.value.querySelectorAll('.stagger-item'),
      translateY: 0,
      opacity: 1,
      rotate: 0,
      scale: 1,
      duration: 300
    });
  }

  // 복합 애니메이션 박스 리셋
  if (complexBoxRef.value) {
    $anime({
      targets: complexBoxRef.value,
      translateX: 0,
      scale: 1,
      rotate: 0,
      rotateY: 0,
      backgroundColor: '#4ecdc4',
      borderRadius: '8px',
      duration: 500
    });
  }

  // Path 애니메이션 리셋
  if (pathRef.value) {
    $anime({
      targets: pathRef.value.querySelector('.circle-follow'),
      translateX: 0,
      translateY: 0,
      rotate: 0,
      duration: 500
    });
  }
};

// 헤더 타이틀 설정
provide('headerTitle', 'Anime.js 샘플');
</script>

<template>
  <uiInner class="anime-page">
    <h1 class="page-title">Anime.js 애니메이션 샘플</h1>
    <p class="page-description">다양한 Anime.js 애니메이션 효과를 확인해보세요.</p>

    <!-- 1. 기본 박스 애니메이션 -->
    <div class="sample-item">
      <h2>1. 기본 박스 애니메이션</h2>
      <p>이동, 크기 변화, 회전, 색상 변경을 포함한 기본적인 애니메이션입니다.</p>
      <div class="sample-area">
        <div ref="boxRef" class="anime-box"></div>
      </div>
      <uiButton primary @click="animateBox">박스 애니메이션 실행</uiButton>
    </div>

    <!-- 2. 텍스트 애니메이션 -->
    <div class="sample-item">
      <h2>2. 텍스트 애니메이션</h2>
      <p>글자별로 순차적으로 나타나는 타이핑 효과입니다.</p>
      <div class="sample-area">
        <div ref="textRef" class="anime-text">Anime.js Text Animation</div>
      </div>
      <uiButton primary @click="animateText">텍스트 애니메이션 실행</uiButton>
    </div>

    <!-- 3. 원형 그리드 애니메이션 -->
    <div class="sample-item">
      <h2>3. 원형 그리드 애니메이션</h2>
      <p>3x3 그리드의 중앙에서 시작해서 바깥쪽으로 퍼져나가는 애니메이션입니다.</p>
      <div class="sample-area">
        <div ref="circlesRef" class="circles-grid">
          <div v-for="i in 9" :key="i" class="circle"></div>
        </div>
      </div>
      <uiButton primary @click="animateCircles">원형 애니메이션 실행</uiButton>
    </div>

    <!-- 4. 순차 애니메이션 -->
    <div class="sample-item">
      <h2>4. 순차 애니메이션 (Stagger)</h2>
      <p>여러 요소가 시간 차이를 두고 순차적으로 나타나는 애니메이션입니다.</p>
      <div class="sample-area">
        <div ref="staggerRef" class="stagger-container">
          <div v-for="i in 5" :key="i" class="stagger-item">{{ i }}</div>
        </div>
      </div>
      <uiButton primary @click="animateStagger">순차 애니메이션 실행</uiButton>
    </div>

    <!-- 5. 복합 애니메이션 (Timeline) -->
    <div class="sample-item">
      <h2>5. 복합 애니메이션 (Timeline)</h2>
      <p>여러 애니메이션을 시간순으로 연결한 복합적인 애니메이션입니다.</p>
      <div class="sample-area">
        <div ref="complexBoxRef" class="anime-box"></div>
      </div>
      <uiButton primary @click="animateComplex">복합 애니메이션 실행</uiButton>
    </div>

    <!-- 6. Path 애니메이션 -->
    <div class="sample-item">
      <h2>6. Path 따라가기 애니메이션</h2>
      <p>SVG Path를 따라 움직이는 애니메이션입니다.</p>
      <div class="sample-area">
        <div ref="pathRef" class="path-container">
          <svg viewBox="0 0 300 200" width="300" height="200">
            <path d="M50,150 Q100,50 200,100 T250,50" stroke="#ddd" stroke-width="2" fill="none" />
            <circle class="circle-follow" cx="50" cy="150" r="8" fill="#ff6b6b" />
          </svg>
        </div>
      </div>
      <uiButton primary @click="animatePath">Path 애니메이션 실행</uiButton>
    </div>

    <!-- 리셋 버튼 -->
    <div class="sample-item reset-section">
      <uiButton line @click="resetAnimations">모든 애니메이션 리셋</uiButton>
    </div>
  </uiInner>
</template>

<style lang="scss" scoped>
.anime-page {
  .page-title {
    font-size: 3.2rem;
    font-weight: bold;
    margin-bottom: 16px;
    color: #2c3e50;
    text-align: center;
  }

  .page-description {
    font-size: 1.6rem;
    color: #666;
    text-align: center;
    margin-bottom: 40px;
  }

  .sample-item {
    margin-bottom: 50px;
    padding: 30px;
    background: #f8f9fa;
    border-radius: 12px;
    border: 1px solid #e9ecef;

    &.reset-section {
      text-align: center;
      background: #fff;
      border: 2px dashed #dee2e6;
    }

    h2 {
      font-size: 2.2rem;
      font-weight: bold;
      margin-bottom: 10px;
      color: #495057;
    }

    p {
      font-size: 1.4rem;
      color: #6c757d;
      margin-bottom: 20px;
      line-height: 1.6;
    }

    .sample-area {
      min-height: 150px;
      background: white;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      margin-bottom: 20px;
      padding: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
    }
  }
}

/* 박스 애니메이션 */
.anime-box {
  width: 60px;
  height: 60px;
  background-color: #4ecdc4;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 텍스트 애니메이션 */
.anime-text {
  font-size: 2.8rem;
  font-weight: bold;
  color: #2c3e50;
  text-align: center;

  :deep(.letter) {
    display: inline-block;
    opacity: 1;
  }
}

/* 원형 그리드 */
.circles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  width: 180px;

  .circle {
    width: 50px;
    height: 50px;
    background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
}

/* 순차 애니메이션 */
.stagger-container {
  display: flex;
  gap: 20px;

  .stagger-item {
    width: 60px;
    height: 60px;
    background: linear-gradient(45deg, #ff9a9e 0%, #fecfef 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
}

/* Path 애니메이션 */
.path-container {
  svg {
    border: 1px solid #f0f0f0;
    border-radius: 4px;
  }

  .circle-follow {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
}

/* 반응형 */
@media (max-width: 768px) {
  .anime-page {
    .page-title {
      font-size: 2.4rem;
    }

    .sample-item {
      padding: 20px;

      h2 {
        font-size: 1.8rem;
      }

      .sample-area {
        min-height: 120px;
        padding: 20px;
      }
    }
  }

  .anime-text {
    font-size: 2rem;
  }

  .circles-grid {
    width: 150px;
    gap: 10px;

    .circle {
      width: 40px;
      height: 40px;
    }
  }

  .stagger-container {
    gap: 10px;

    .stagger-item {
      width: 45px;
      height: 45px;
      font-size: 1.6rem;
    }
  }
}
</style>
