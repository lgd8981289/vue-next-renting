<template>
  <!-- 
  1. 组件应该包含两个插槽：
    1.1 二楼
    1.3 一楼
  2. 组件应该可进行事件监听：
    2.1 scroll 事件监听
    2.2 即将进入二楼的事件
    2.3 已经进入二楼的事件
 -->
  <div class="lgd-floor">
    <!-- 二楼 -->
    <div class="lgd-loft" @click="init()">
      <slot name="floor"></slot>
    </div>
    <!-- 一楼（默认） -->
    <div
      class="lgd-content"
      ref="lgdContent"
      @touchstart="onContentTouchStart"
      @touchmove.stop="onContentTouchMove"
      @touchend="onContentTouchEnd"
    >
      <div class="lgd-content-tips" :style="tipsStyle">
        <i class="iconfont icontuya_huabanfuben"></i>
        <span>{{ tipText }}</span>
      </div>
      <div class="lgd-content-container">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import anime from 'animejs';
import { throttle } from 'lodash-es';
// 下拉的文本
const DOWN_TIP_TEXT = '下拉进入二楼';
// 进入二楼的文本
const FLOOR_TIP_TEXT = '松开进入二楼';
// 偏移量,下拉超过偏移量会进入二楼
const OFFSET = 102;
export default {
  name: 'FloorScroll',
  emits: {
    // 下拉回调, 事件传递两个值
    // 下拉距离与进入二楼距离比例
    onMove: null,
    // 进入二楼之前的回调事件
    toFloor: null,
    // 进入二楼之后的回调事件
    reachFloor: null,
    'update:modelValue': null
  },
  props: {
    tipsStyle: {
      type: Object
    },
    /**
     * 绑定值，控制二楼进入
     * true 为进入二楼，false 为返回一楼
     */
    modelValue: {
      type: Boolean
    },
    /**
     * 该属性，由 props 指定
     * 防止楼层中存在可滚动的元素未回到顶部，用户直接拖动楼层的情况
     */
    isScroll: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      lgdContentEle: null,
      // 是否正在滑动
      isMove: false,
      // 屏幕高度
      availHeight: 0,
      // 手指滑动距离
      distance: 0,
      // 滑动的距离
      diff: 0,
      // 是否已进入二楼
      isFloor: false,
      // 标记文本
      tipText: ''
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    /**
     * 初始化所有状态
     */
    init() {
      if (!this.lgdContentEle) {
        this.lgdContent = this.$refs.lgdContent;
      }
      if (this.availHeight === 0) {
        this.availHeight = screen.availHeight;
      }
      // 状态
      this.isFloor = false;
      // 过渡
      if (this.diff > 0) {
        this.moveContent(0, 150, {
          complete: (anim) => {
            // 回一楼
            this.$emit('update:modelValue', false);
          }
        });
      }
    },
    /**
     * 控制内容区移动
     */
    moveContent(diff, duration, opts) {
      // 获取当前值
      let currentDiff = this.diff;
      this.performAnim({
        translateY: diff,
        duration: duration,
        update: (anim) => {
          // currentDiff 为当前值
          // diff 为目标值
          // anim.progress / 100 为进度百分比
          // 要求：计算出当前百分比下的具体值
          // 计算偏移量的值、

          // 目标值 - 当前值 = 差值
          // 差值 * 百分比 = 百分比差值
          // 当前值 + 百分比差值 = 当前具体值

          this.diff = currentDiff + (diff - currentDiff) * (anim.progress / 100);

          // 在内容去移动时，进行文本判定
          if (this.diff < OFFSET) {
            this.tipText = DOWN_TIP_TEXT;
          } else {
            this.tipText = FLOOR_TIP_TEXT;
          }
          this.$emit('onMove', this.diff, this.diff / OFFSET);
        },
        ...opts
      });
    },
    /**
     * 进入二楼
     */
    toFloor() {
      this.$emit('toFloor');
      // 状态
      this.isFloor = true;
      // 过渡
      this.moveContent(this.availHeight, 300, {
        complete: (anim) => {
          this.$emit('reachFloor');
          // 到二楼
          this.$emit('update:modelValue', true);
        }
      });
    },
    /**
     * 监听手指按下
     */
    onContentTouchStart(event) {
      // 监听内容状态
      if (!this.isScroll) {
        return;
      }
      // 当前处于 二楼 不需要滑动
      if (this.isFloor) {
        return true;
      }
      this.downY = event.touches[0].clientY;
    },
    /**
     * 监听手指滑动
     */
    onContentTouchMove(event) {
      // 监听内容状态
      if (!this.isScroll) {
        return;
      }
      // 当前处于 二楼 不需要滑动
      if (this.isFloor) {
        return true;
      }
      // 处理用户内容和楼层连续滚动的情况
      let moveY = event.touches[0].clientY;
      this.distance = moveY - this.downY;
      // 手指从下向上移动，不需要进行滚动处理
      if (this.distance < 0) {
        return;
      }
      // 当楼层开始滚动时，禁止子元素的滑动行为
      if (event.cancelable) {
        event.preventDefault();
      }

      // 计算增速
      this.moveContent(this.distance * 0.25, 18);
    },
    /**
     * 监听手指抬起
     */
    onContentTouchEnd(event) {
      if (this.isFloor) {
        return true;
      }
      if (this.diff >= OFFSET) {
        this.toFloor();
      } else {
        this.init();
      }
    },
    performAnim: throttle(function (opts) {
      anime({
        targets: '.lgd-content',
        easing: 'easeInOutQuad',
        ...opts
      });
    }, 12)
  },
  watch: {
    modelValue: {
      immediate: true,
      handler: function (val) {
        if (val) {
          this.toFloor();
        } else {
          this.init();
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.lgd-floor {
  height: 100vh;
  width: 100vw;
  position: relative;

  .lgd-loft {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .lgd-content {
    height: 100vh;
    width: 100%;
  }

  .lgd-content-tips {
    position: absolute;
    height: 36px;
    width: 100%;
    margin-top: -54px;
    padding-bottom: 12px;
    line-height: 36px;
    text-align: center;
    font-size: 12px;
    color: white;
    letter-spacing: 12px;
    box-sizing: border-box;
  }
  .lgd-content-container {
    overflow: hidden;
  }
}
</style>
