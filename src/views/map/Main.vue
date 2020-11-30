<template>
  <div class="map-main">
    <div id="map-container"></div>
    <van-popup v-model:show="isShowPop" position="bottom" :style="{ height: '60%' }">
      <van-nav-bar class="map_nav_bar" :title="navBarName" />
      <room-list class="map_room_list" v-if="isShowPop" type="1"></room-list>
    </van-popup>
  </div>
</template>

<script>
const ZOOMS = [11.8, 13.6, 16.8];
const cityMapStyle = {
  width: '72px',
  height: '72px',
  textAlign: 'center',
  borderRadius: '50%',
  fontSize: '12px',
  backgroundColor: 'rgba(38, 206, 151 , 0.9)',
  color: 'white',
  padding: '12px 0',
  lineHeight: '22px',
  boxSizing: 'border-box'
};
const houseMapStyle = {
  width: '172px',
  height: '22px',
  lineHeight: '22px',
  textAlign: 'center',
  borderRadius: '10px',
  fontSize: '12px',
  backgroundColor: 'rgba(38, 206, 151 , 0.9)',
  color: 'white'
};
import { getArea } from '/@api/map';
import { getAMap } from '/@utils/map.js';
import unit from '/@utils/unit.js';
import RoomList from '/@components/RoomList.vue';

let AMap,
  map = null;
export default {
  name: 'MapMain',
  data() {
    return {
      level: 0,
      isAutoZoom: false,
      isShowPop: false,
      navBarName: ''
    };
  },
  components: {
    RoomList
  },
  mounted() {
    this.initMap();
  },
  methods: {
    /**
     * 获取覆盖点数据
     */
    async initMarkerData(data) {
      const areaData = await getArea({
        parentId: data.id,
        level: this.level
      });
      // 因为数据不全的原因，所以处理空数据问题
      if (areaData.length === 0) return;
      areaData.forEach((item) => {
        item.unitPrice = unit(item.mid_price);
        item.unitPropNum = unit(item.prop_num);
      });
      this.initMarker(areaData);
    },
    /**
     * 获取房产数据
     */
    async initHouseData(data) {
      this.navBarName = data.name;
      this.isShowPop = true;
    },
    /**
     * 初始化地图控件
     */
    async initMap() {
      AMap = await getAMap();

      map = new AMap.Map('map-container', {
        zoom: ZOOMS[0],
        center: ['116.44976', '39.92656']
      });
      /**
       * 监听地图的缩放变化
       */
      map.on('zoomchange', () => {
        // 自动缩放不需要监听变化
        if (this.isAutoZoom) return;
        const currentZoom = map.getZoom();
        if (currentZoom < ZOOMS[0]) {
          return;
        }
        let level = 0;
        ZOOMS.some((item, index) => {
          // 最后一个元素
          if (index === ZOOMS.length - 1) {
            if (currentZoom >= item) {
              level = index;
              return true;
            }
          }
          let nextItem = ZOOMS[index + 1];
          if (currentZoom >= item && currentZoom < nextItem) {
            level = index;
            return true;
          }
          return false;
        });
        if (this.level === level) return;
        this.level = level;
        this.initMarkerData();
      });

      map.on('zoomend', () => {
        this.isAutoZoom = false;
      });

      this.initMarkerData('600');
    },
    /**
     * 根据数据设置覆盖物
     */
    initMarker(data) {
      /**
       * 自动缩放，进行主动跳转
       */
      if (this.isAutoZoom) {
        // 设置zoom级别
        this.level++;
        map.setZoom(ZOOMS[this.level]);
      }
      // 清除所有的覆盖物
      map.clearMap();
      // 绘制覆盖物
      let markerArr = [];
      data.forEach((item) => {
        let marker = this.getMarker(item);
        markerArr.push(marker);
      });
      map.add(markerArr);
      // 平移地图点
      const point = data[0];
      map.panTo([point.lng, point.lat]);
    },
    /**
     * 设置单一覆盖物
     */
    getMarker(data) {
      // 是否最底部
      let isBottom = this.level === ZOOMS.length - 1;
      // 展示文字
      let text = isBottom
        ? `${data.name} ${data.unitPrice} (${data.unitPropNum}套)`
        : `${data.name} <br /> ${data.unitPropNum}`;
      // 展示样式
      let style = isBottom ? houseMapStyle : cityMapStyle;
      let marker = new AMap.Text({
        text: text,
        anchor: 'center', // 设置文本标记锚点
        cursor: 'pointer',
        style: style,
        position: [data.lng, data.lat],
        data: {
          id: data.id,
          name: data.name
        }
      });
      // 监听覆盖物的点击事件
      marker.on('click', (e) => {
        // 缩放级别之内，表示需要进行下一级的缩放
        if (this.level < ZOOMS.length - 1) {
          // 标记为自动缩放
          this.isAutoZoom = true;
          // 获取最新数据
          this.initMarkerData(e.target._originOpts.data);
        } else {
          // 移动到对应的位置
          map.panTo([e.lnglat.lng, e.lnglat.lat]);
          // 缩放级别之外，表示需要展示房产数据
          this.initHouseData(e.target._originOpts.data);
        }
      });
      return marker;
    }
  }
};
</script>

<style lang="scss" scoped>
.map-main {
  height: 100%;
  #map-container {
    height: 100%;
  }
  .map_nav_bar {
    position: fixed;
    top: 40%;
    width: 100%;
  }
  .map_room_list {
    margin-top: 46px;
  }
}
</style>
