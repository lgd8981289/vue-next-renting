<template>
  <van-nav-bar @click-left="onClickLeft" class="nav-bar" fixed>
    <template #left>
      <i class="iconfont iconback nav-bar-item nav-bar-left"></i>
    </template>
    <template #title>
      <span class="nav-bar-item nav-bar-title">{{ title }}</span>
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  name: 'HouseDetailNavBar',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-bar {
  background: none;
  z-index: 999;
  height: 46px;
  line-height: 46px;
  .nav-bar-item {
    color: white;
    font-weight: 600;
  }
}
.van-hairline--bottom::after {
  border: none;
}
</style>
