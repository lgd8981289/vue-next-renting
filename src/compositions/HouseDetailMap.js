import { getAMap, getLocation } from '/@utils/map.js';

export function initDriving(el, toLnglat, onMapClick) {
  return new Promise(async (resolve, reject) => {
    const location = await getLocation();
    const AMap = await getAMap();
    //基本地图加载
    const map = new AMap.Map(el, {
      resizeEnable: true,
      center: [location.position.lng, location.position.lat] //地图中心点
    });
    // 构造路线导航类;
    var driving = new AMap.Driving({
      policy: AMap.DrivingPolicy.LEAST_TIME,
      map: map
    });
    // 根据起终点名称规划驾车导航路线
    driving.search([location.position.lng, location.position.lat], toLnglat, (status, result) => {
      resolve({
        driving,
        fromLnglat: [location.position.lng, location.position.lat],
        searchResult: result
      });
    });
    map.addControl(new AMap.ToolBar());
    map.on('click', onMapClick);
  });
}
