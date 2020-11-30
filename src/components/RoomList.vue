<template>
  <div class="room-list">
    <van-list
      v-if="type === '0'"
      model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <room-item v-for="item in list" :key="item.id" :data="item"></room-item>
    </van-list>
    <div v-else>
      <room-item v-for="item in list" :key="item.id" :data="item"></room-item>
    </div>
  </div>
</template>

<script>
import RoomItem from './RoomItem.vue';
import initHomeRoomList from '/@compositions/HomeRoomList';
import initMapRoomList from '/@compositions/MapRoomList.js';
export default {
  name: 'RoomList',
  components: {
    RoomItem
  },
  props: {
    // type 标记数据的类型：
    // 0：用于首页的数据展示
    // 1：用于地图的房产列表展示
    // 2：用于房产详情的推荐展示
    type: {
      type: String,
      required: true
    },
    // 当 type === 2 时，用作推荐房产的数据获取
    houseId: {
      type: String
    },
    name: {
      type: String
    }
  },
  setup(props) {
    switch (props.type) {
      case '0':
        return initHomeRoomList(props);
      case '1':
        return initMapRoomList();
        break;
    }
  }
};
</script>

<style lang="scss" scoped>
.room-list {
  font-size: 16px;
}
</style>
