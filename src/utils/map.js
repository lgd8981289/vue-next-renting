import init from '/@plugins/map.config.js';
import { ref } from 'vue';

async function getLocalCity() {
  let AMap = window.AMap;
  if (!AMap) {
    AMap = await init();
  }
  const citySearch = new AMap.CitySearch();
  return new Promise((resolve, reject) => {
    citySearch.getLocalCity((status, result) => {
      if (status === 'complete' && result.info === 'OK') {
        // 查询成功，result即为当前所在城市信息
        resolve(result.city);
      }
    });
  });
}

export function getAMap() {
  return init();
}

export function getCity() {
  const city = ref('中国');
  const getCity = async () => {
    city.value = (await getLocalCity()).replace('市', '');
  };
  getCity();
  return city;
}
