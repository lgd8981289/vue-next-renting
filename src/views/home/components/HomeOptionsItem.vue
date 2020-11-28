<template>
  <div class="home-options-item">
    <van-image class="options-img" :src="data.icon"></van-image>
    <p>{{ data.name }}</p>
  </div>
</template>

<script>
export default {
  name: 'HomeOptionsItem',
  props: {
    data: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.home-options-item {
  width: 20%;
  line-height: 26px;
  .options-img {
    width: 44px;
    height: 44px;
  }
  p {
    font-size: 12px;
    color: #333333;
    font-weight: 600;
  }
}
</style>
