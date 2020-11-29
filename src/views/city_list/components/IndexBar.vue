<template>
  <div class="index-bar" v-if="dataSource.cityList.length > 0">
    <van-index-bar
      :index-list="dataSource.indexList"
      highlight-color="#07c160"
      @select="onIndexBarChange"
    >
      <!-- 定位 -->
      <div class="bg">
        <van-index-anchor index="#">定位 / 推荐</van-index-anchor>
        <van-row justify="space-around" gutter="12" class="recommend-row">
          <van-col v-for="(item, index) in dataSource.recommendList" :key="index" span="8">
            <span class="recommend-text" @click="onCityClick(item)">
              <i v-if="index === 0" class="iconfont iconlocation"></i>
              {{ item.name }}
            </span>
          </van-col>
        </van-row>
      </div>
      <!-- 历史 -->
      <!-- 城市列表 -->
      <div v-for="(item, index) in dataSource.cityList" :key="index">
        <van-index-anchor :index="item.initial">{{ item.initial }}</van-index-anchor>
        <van-cell
          v-for="(cityItem, index) in item.list"
          :key="index"
          :title="cityItem.name"
          @click="onCityClick(cityItem)"
        />
      </div>
    </van-index-bar>
  </div>

  <div class="index-bar-skeleton" v-else>
    <van-skeleton title :row="3" />
    <van-skeleton title :row="3" />
    <van-skeleton title :row="3" />
    <van-skeleton title :row="3" />
    <van-skeleton title :row="3" />
  </div>
</template>

<script>
import { getCityList } from '/@api/city';
import { getCity } from '/@utils/map.js';
import { Toast } from 'vant';
export default {
  name: 'IndexBar',
  data() {
    return {
      // 数据源
      dataSource: {
        cityList: [],
        indexList: ['#'],
        recommendList: []
      }
    };
  },
  created() {
    this.getCityList();
  },
  methods: {
    async getCityList() {
      // 获取服务端数据
      const { recommendList, cityList } = await getCityList();
      this.dataSource.cityList = cityList;
      // 筛选索引列表
      this.dataSource.cityList.forEach((item) => {
        this.dataSource.indexList.push(item.initial);
      });
      // 添加定位数据
      recommendList.unshift({
        code: '999',
        name: getCity(),
        pinyin: 'DingWei',
        label: 'DingWei999'
      });
      this.dataSource.recommendList = recommendList;
    },
    /**
     * 监听索引栏点击事件
     */
    onIndexBarChange(index) {
      Toast({
        className: 'index-bar-toast',
        message: index
      });
    },
    /**
     * 监听城市点击事件
     */
    onCityClick(city) {
      this.$store.commit('setCity', city.name);
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.index-bar {
  overflow-y: scroll;
  height: 100%;

  // 深度选择操作符
  ::v-deep(.van-index-anchor) {
    background-color: #f7f8fa;
  }

  ::v-deep(.van-index-bar__index) {
    margin-bottom: 6px;
  }

  .recommend-row {
    padding: 0 16px;
    .recommend-text {
      display: block;
      width: 100%;
      height: 24px;
      line-height: 24px;
      text-align: center;
      font-size: 14px;
      background-color: white;
      // color: #333;
      border: 1px solid #ebedf0;
    }

    .recommend-text:nth-child(1) {
      margin-bottom: 6px;
    }
  }
}

.index-bar-skeleton {
  ::v-deep(.van-skeleton) {
    margin-top: 18px;
  }
}
</style>
