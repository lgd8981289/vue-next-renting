<template>
  <div class="room-item" @click="onItemClick">
    <div class="room-item-container">
      <van-image class="room-item-icon" :src="data.icon" fit="cover"></van-image>
      <div class="room-item-detail">
        <h3 class="room-item-detail-name">{{ data.name }}</h3>
        <p class="room-item-detail-map-area">
          {{ data.maps.join(' - ') }}
          &nbsp;&nbsp; 建面 {{ data.minArea }}-{{ data.maxArea }} ㎡
        </p>
        <p class="room-item-detail-price">
          {{ data.price }}
          <span>元/㎡</span>
        </p>
        <div>
          <van-tag
            class="room-item-detail-tag"
            plain
            type="primary"
            v-for="(tag, index) in data.tags"
            :key="index"
            color="#6b6b6b"
            text-color="#6b6b6b"
            >{{ tag }}</van-tag
          >
        </div>
      </div>
    </div>
    <van-divider />
  </div>
</template>

<script>
export default {
  name: 'RoomItem',
  props: {
    data: {
      type: Object,
      required: true,
      default() {
        return {};
      }
    }
  },
  methods: {
    onItemClick() {
      this.$router.push({
        name: 'HouseDetail',
        query: {
          houseId: this.data.id
        },
        params: {
          routerType: 'push'
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.room-item {
  background-color: white;
  &-icon {
    width: 110px;
    height: 110px;
  }
  &-container {
    display: flex;
    padding: 12px;

    .room-item-detail {
      margin-left: 8px;
      font-size: 0px;
      line-height: 28px;
      &-name {
        font-size: 18px;
        font-weight: bold;
      }
      &-map-area {
        font-size: 12px;
      }
      &-price {
        color: #fd503c;
        font-size: 22px;
        font-weight: bolder;
        span {
          font-size: 12px;
        }
      }
      &-tag {
        margin-right: 2px;
      }
    }
  }
}
</style>
