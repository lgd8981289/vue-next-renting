<template>
  <!-- 绑定 key 解决同页面跳转的问题 -->
  <router-view v-slot="{ Component }">
    <transition :name="transitionName">
      <keep-alive :include="virtualTaskStack">
        <component :is="Component" :key="$route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      transitionName: '',
      virtualTaskStack: [],
      isOnce: false
    };
  },
  // vue监听路由对象$route的方法
  watch: {
    // watch $route 决定使用哪种过渡
    $route(to, from) {
      // 此处是一个 vue 3.0.2 版本的错误：https://github.com/vuejs/vue-next/issues/2550
      // 错误的具体原因可以查看此 bug 修复提交 ：https://github.com/vuejs/vue-next/pull/2551
      const arr = [].concat(this.virtualTaskStack);
      if (!this.isOnce) {
        arr.push(to.name);
        this.virtualTaskStack = [].concat(arr);
        return (this.isOnce = true);
      }
      const routerType = to.params.routerType;
      if (routerType === 'push') {
        arr.push(to.name);
        this.transitionName = 'fold-left';
      } else {
        const index = arr.findIndex((name) => name === from.name);

        if (index != -1) {
          arr.splice(index, 1);
        }
        this.transitionName = 'fold-right';
      }
      /**
       * 初始化虚拟任务栈
       */
      if (to.params.clearTask) {
        arr = ['AppMain'];
      }

      this.virtualTaskStack = [].concat(arr);
    }
  }
};
</script>

<style scoped lang="scss">
#app {
  background-color: white;
  // push页面时：新页面的进入动画
  .fold-left-enter-active {
    animation-name: fold-left-in;
    animation-duration: 0.4s;
  }
  // push页面时：老页面的退出动画
  .fold-left-leave-active {
    animation-name: fold-left-out;
    animation-duration: 0.4s;
  }
  // push页面时：新页面的进入动画
  @keyframes fold-left-in {
    0% {
      transform: translate(100%, 0);
      /* visibility: visible; */
    }
    100% {
      transform: translate(0, 0);
    }
  }
  // push页面时：老页面的退出动画
  @keyframes fold-left-out {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-100%, 0);
      /* visibility: hidden; */
    }
  }

  // 后退页面时：即将展示的页面动画
  .fold-right-enter-active {
    animation-name: fold-right-in;
    animation-duration: 0.4s;
  }
  // 后退页面时：后退的页面执行的动画
  .fold-right-leave-active {
    animation-name: fold-right-out;
    animation-duration: 0.4s;
  }
  // 后退页面时：即将展示的页面动画
  @keyframes fold-right-in {
    0% {
      width: 100%;
      transform: translate(-100%, 0);
      /* visibility: visible; */
    }
    100% {
      width: 100%;
      transform: translate(0, 0);
    }
  }
  // 后退页面时：后退的页面执行的动画
  @keyframes fold-right-out {
    0% {
      width: 100%;
      transform: translate(0, 0);
    }
    100% {
      width: 100%;
      transform: translate(100%, 0);
      /* visibility: hidden; */
    }
  }
}
</style>
