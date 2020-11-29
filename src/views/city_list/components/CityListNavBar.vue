<template>
  <van-nav-bar @click-left="onClickLeft" class="nav-bar" fixed>
    <template #left>
      <i class="iconfont iconback nav-bar-item nav-bar-left"></i>
    </template>
    <template #title>
      <span class="nav-bar-item nav-bar-title">选择城市</span>
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped></style>
