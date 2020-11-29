<template>
  <div class="home-nav-bar" :style="homeNavBarStyle">
    <div class="home-nav-bar-content">
      <div class="left" @click="toCityList">
        <span class="nav-bar-title">{{ $store.state.city }}</span>
        <i class="iconfont iconjiantou nav-bar-left-icon"></i>
      </div>
      <!-- 中 -->
      <div class="center">
        <home-card class="home-card" :style="homeCardStyle"></home-card>
      </div>
      <!-- 右 -->
      <div class="right" @click="toMap">
        <i class="iconfont iconditu nav-bar-icon nav-bar-right-icon"></i>
        <span class="nav-bar-title">地图</span>
      </div>
    </div>
    <van-image
      class="home-nav-bar-bg"
      :style="homeNavBarBgStyle"
      src="http://res.lgdsunday.club/renting_middle_floor.jpg"
      fit="cover"
    ></van-image>
  </div>
</template>

<script>
const INITIAL_CARD_BOTTOM = -36;
const MAX_CARD_TRANSLATEY = 45;
const INITIAL_CARD_MARGIN = 18;
const MIN_CARD_MARGIN = 65;
const INITIAL_NAVBAR_HEIGHT = 76;
const MIN_NAVBAR_HEIGHT = 52;
const INITIAL_NAV_BAR_BG = '38, 206, 151';
import { throttle } from 'lodash-es';
import { getCity } from '/@utils/map.js';
import { useStore } from 'vuex';
import HomeCard from './HomeCard.vue';
export default {
  components: {
    HomeCard
  },
  emits: {
    heightChange: null,
    toMap: null
  },
  props: {
    contentScrollTop: {
      type: Number,
      required: true
    },
    floorScrollRatio: {
      type: Number,
      required: true
    },
    floorScrollDiff: {
      type: Number,
      required: true
    }
  },
  created() {
    const sotre = useStore();
    sotre.commit('setCity', getCity());
  },
  data() {
    return {
      city: getCity(),
      homeNavBarStyle: {
        height: INITIAL_NAVBAR_HEIGHT + 'px',
        backgroundColor: `rgba(${INITIAL_NAV_BAR_BG}, 0)`
      },
      homeCardStyle: {
        bottom: INITIAL_CARD_BOTTOM + 'px',
        position: 'absolute',
        right: INITIAL_CARD_MARGIN + 'px',
        left: INITIAL_CARD_MARGIN + 'px',
        boxShadow: '0px 0px 5px #ccc',
        translateY: '0px'
      },
      homeNavBarBgStyle: {
        opacity: 1
      }
    };
  },
  methods: {
    /**
     * 当用户向上滑动时，动画序列
     */
    upAnim: throttle(function (opt) {
      this.upAnimNavBarStyle();
      this.upAnimCardStyle();
      this.upAnimBgStyle();
    }, 12),
    upAnimNavBarStyle() {
      const height = INITIAL_NAVBAR_HEIGHT - this.contentScrollTop;
      if (height <= MIN_NAVBAR_HEIGHT) {
        this.homeNavBarStyle.height = MIN_NAVBAR_HEIGHT + 'px';
        return;
      }
      this.homeNavBarStyle.height = height + 'px';
    },
    upAnimCardStyle(opt) {
      if (this.contentScrollTop >= MAX_CARD_TRANSLATEY) {
        this.homeCardStyle.transform = `translateY(-${MAX_CARD_TRANSLATEY}px)`;
        this.homeCardStyle.left = this.homeCardStyle.right = MIN_CARD_MARGIN + 'px';
        return;
      }
      this.homeCardStyle.transform = `translateY(-${this.contentScrollTop}px)`;
      this.homeCardStyle.left = this.homeCardStyle.right =
        INITIAL_CARD_MARGIN + this.contentScrollTop + 'px';
    },
    upAnimBgStyle() {
      let opacity = 1 - this.contentScrollTop / MIN_NAVBAR_HEIGHT;

      if (opacity <= 0) {
        this.homeNavBarBgStyle.opacity = 0;
        return;
      }
      this.homeNavBarBgStyle.opacity = opacity;
    },
    // 当用户向下进行滑动时候，动画序列
    downAnim: throttle(function (opt) {
      this.downAnimCardStyle();
      this.downAnimNavBarStyle();
    }, 12),
    downAnimCardStyle(opt) {
      this.homeCardStyle.transform = `translateY(${this.floorScrollDiff}px)`;
    },
    downAnimNavBarStyle() {
      const opacity = 1 - this.floorScrollRatio;
      this.homeNavBarStyle.backgroundColor = `rgba(${INITIAL_NAV_BAR_BG},${opacity})`;
      this.homeNavBarBgStyle.opacity = opacity;
    },
    toMap() {
      this.$emitter.emit('toMap');
    },
    toCityList() {
      this.$router.push({
        name: 'CityList',
        params: {
          routerType: 'push'
        }
      });
    }
  },
  watch: {
    /**
     * 检测一楼的滚动行为
     */
    contentScrollTop: {
      handler(val) {
        this.upAnim();
      },
      immediate: true
    },
    /**
     * 检测楼层的滚动行为
     */
    floorScrollDiff: {
      handler(val) {
        // 动画只需要在一楼无滚动时进行
        if (this.contentScrollTop !== 0) {
          return;
        }

        this.downAnim();
      },
      immediate: true
    },
    'homeNavBarStyle.height': {
      handler() {
        this.$emit('heightChange', parseInt(this.homeNavBarStyle.height));
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'src/assets/css/constant.scss';
.home-nav-bar {
  background-color: $mainColor;
  position: fixed;
  width: 100%;
  z-index: 9;

  .home-nav-bar-bg {
    width: 100%;
    height: 100%;
    top: 0;
    position: absolute;
    z-index: -1;
  }

  &-content {
    width: 100%;
    height: 52px;
    line-height: 52px;
    display: flex;
    color: white;
    position: relative;
    top: 0;
    font-size: 12px;
  }
  .left {
    position: absolute;
    left: 0;
    top: 0;
    span {
      display: inline-block;
      max-width: 46px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow-wrap: a;
      vertical-align: bottom;
    }
  }
  .right {
    position: absolute;
    right: 0;
    top: 0;
    i {
      margin-right: 2px;
    }
  }

  .left,
  .right {
    padding: 0 16px;
    img {
      width: 100%;
      align-self: center;
    }
  }
}
</style>
