<template>
  <div class="house-detail-swiper">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in data.imags" :key="index">
        <van-image fit="cover" class="swiper-img" :src="image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: 'HouseDetailSwiper',
  props: {
    data: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.house-detail-swiper {
  height: 280px;

  .swiper-img {
    width: 100%;
    height: 280px;
  }
}
</style>
