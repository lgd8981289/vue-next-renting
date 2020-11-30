<template>
  <div class="house-detail-panorama">
    <van-loading v-if="isShowLoading" size="24px" vertical>加载中...</van-loading>
    <i class="iconfont iconduquanjing house-detail-panorama-icon" v-show="isShowIcon"></i>
    <div class="house-detail-panorama-container" ref="panoramaContainer"></div>
    <i class="iconfont iconquanping full" @click="onFullClick" v-show="!isFull"></i>
    <i class="iconfont iconback full-back" @click="onHalfClick" v-show="isFull"></i>
  </div>
</template>

<script>
import { renderPanorama, onDestory } from '/@compositions/Panorama.js';
import { ref, onMounted } from 'vue';
import anime from 'animejs';
export default {
  name: 'HouseDetailPanorama',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // 是否进入全屏
      isFull: false,
      // 3D 视窗的原始高度
      panoramaHeight: 0,
      // 控制 loading 的显示
      isShowLoading: true,
      // 控制 360全景图标显示
      isShowIcon: false,
      panoramaContainer: null
    };
  },
  mounted() {
    this.panoramaContainer = this.$refs.panoramaContainer;
    this.initPanorama();
  },
  unmounted() {
    onDestory();
  },
  activated() {
    this.initPanorama();
  },
  methods: {
    initPanorama() {
      renderPanorama({
        el: this.panoramaContainer,
        src: this.data.panoramaImg,
        complete: () => {
          this.isShowLoading = false;
          this.isShowIcon = true;
        }
      });
    },
    onFullClick() {
      this.panoramaHeight = this.panoramaContainer.clientHeight;
      this.isShowIcon = false;
      anime({
        targets: '.house-detail-panorama-container',
        easing: 'easeInOutQuad',
        zIndex: [9999, 9999],
        width: window.innerHeight,
        height: window.innerWidth,
        translateX: (window.innerWidth - window.innerHeight) / 2,
        translateY: (window.innerHeight - window.innerWidth) / 2,
        rotate: '90deg',
        begin: (anim) => {
          onDestory();
        },
        complete: (anim) => {
          this.isFull = true;
          renderPanorama({
            el: this.panoramaContainer,
            src: this.data.panoramaImg,
            isHorizontal: true
          });
        }
      });
    },
    onHalfClick() {
      anime({
        targets: '.house-detail-panorama-container',
        easing: 'easeInOutQuad',
        zIndex: 0,
        width: window.innerWidth,
        height: this.panoramaHeight,
        translateX: 0,
        translateY: 0,
        rotate: 0,
        begin: (anim) => {
          onDestory();
        },
        complete: (anim) => {
          this.isFull = false;
          renderPanorama({
            el: this.panoramaContainer,
            src: this.data.panoramaImg,
            isHorizontal: false
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.house-detail-panorama {
  height: 280px;
  width: 100%;
  box-sizing: border-box;
  &-container {
    height: 100%;
    width: 100vw;
    position: absolute;
    background-color: black;
  }

  .van-loading {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
  }

  &-icon {
    font-size: 38px;
    color: white;
    position: absolute;
    top: 40%;
    left: 50%;
    z-index: 9;
    transform: translateX(-50%);
  }

  .full-back {
    position: absolute;
    font-size: 24px;
    color: white;
    z-index: 99999;
    padding: 16px;
    right: 0;
    transform: rotate(90deg);
  }

  .full {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 18px;
    color: white;
    padding: 16px;
    font-weight: bold;
  }

  .half {
  }
}
</style>
