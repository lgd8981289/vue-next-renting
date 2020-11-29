<template>
  <div class="home-tabs">
    <van-tabs
      v-if="tabsData.length > 0"
      v-model:active="active"
      color="#26ce97"
      title-active-color="#26ce97"
      swipeable
      sticky
    >
      <van-tab :title="item" v-for="(item, index) in tabsData" :key="index">
        <home-room-list :name="item" type="0"></home-room-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getTabs } from '/@api/house';
import HomeRoomList from '/@components/RoomList.vue';
export default {
  name: 'HomeTabs',
  components: {
    HomeRoomList
  },
  data() {
    return {
      active: 0,
      tabsData: [],
      tabsList: {}
    };
  },
  created() {
    this.getTabsData();
  },
  methods: {
    async getTabsData() {
      this.tabsData = await getTabs();
    }
  }
};
</script>

<style lang="scss" scoped></style>
