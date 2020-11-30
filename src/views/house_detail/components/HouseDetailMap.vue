<template>
  <div class="house-detail-map">
    <p class="house-detail-map-title">路线规划</p>
    <div class="house-detail-map-container" ref="container"></div>
    <van-popup v-model:show="isShowNavgationPop" position="bottom" :style="{ height: '100%' }">
    </van-popup>
  </div>
</template>

<script>
import { initDriving } from '/@compositions/HouseDetailMap.js';
import { ref, onMounted } from 'vue';
export default {
  name: 'HouseDetailMap',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const container = ref(null);
    onMounted(() => {
      initDriving(container.value, [props.data.lng, props.data.lat], () => {});
    });

    return {
      container
    };
  }
};
</script>

<style lang="scss" scoped>
@import 'src/assets/css/constant.scss';
.house-detail-map {
  padding: $margin;
  background-color: white;
  &-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  &-container {
    width: 100%;
    height: 150px;
  }
}
</style>
