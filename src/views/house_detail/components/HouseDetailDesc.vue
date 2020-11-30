<template>
  <div class="house-detail-desc">
    <p class="house-detail-desc-name">{{ data.name }}</p>
    <p class="house-detail-desc-price">{{ data.price }} <span>元/㎡</span></p>
    <p class="house-detail-desc-tags">
      <van-tag v-for="tag in data.tags" :key="tag" type="success">
        {{ tag }}
      </van-tag>
    </p>
    <p class="house-detail-desc-area">建面 &nbsp; {{ data.minArea }}-{{ data.maxArea }}㎡</p>
    <p class="house-detail-desc-address">地址 &nbsp; {{ data.address }}</p>
  </div>
</template>

<script>
export default {
  name: 'HouseDetailDesc',
  props: {
    data: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'src/assets/css/constant.scss';
.house-detail-desc {
  background-color: white;
  padding: $margin;
  font-size: 14px;
  p {
    margin-bottom: 6px;
  }
  &-name {
    font-size: 18px;
    font-weight: 600;
  }
  &-price {
    font-size: 20px;
    font-weight: 600;
    color: #fd503c;
    span {
      font-size: 12px;
    }
  }
  &-tags {
    .van-tag {
      margin-right: 6px;
    }
  }
}
</style>
