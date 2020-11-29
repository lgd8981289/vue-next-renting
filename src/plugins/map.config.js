import AMapLoader from '@amap/amap-jsapi-loader';
function init() {
  if (window.AMap) {
    return new Promise((resolve, reject) => resolve(window.AMap));
  }
  return AMapLoader.load({
    // 申请好的Web端开发者Key，首次调用 load 时必填
    key: '1140bde0f083c320481282c74832afb0',
    // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    version: '2.0',
    // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    plugins: [
      'AMap.CitySearch',
      'AMap.CircleMarker',
      'AMap.Driving',
      'AMap.Geolocation',
      'AMap.ToolBar'
    ]
    // Loca: {
    //   // 是否加载 Loca， 缺省不加载
    //   version: '1.3.2' // Loca 版本，缺省 1.3.2
    // }
  })
    .then((AMap) => {
      window.AMap = AMap;
      return AMap;
    })
    .catch((err) => {
      return err;
    });
}

export default init;
