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

async function getGeoLocation() {
  let AMap = window.AMap;
  if (!AMap) {
    AMap = await init();
  }
  const geolocation = new AMap.Geolocation({
    timeout: 10 * 1000,
    maximumAge: 24 * 3600 * 1000
  });

  return new Promise((resolve, reject) => {
    geolocation.getCurrentPosition((status, result) => {
      if (status == 'complete') {
        resolve(result);
      } else {
        reject(result);
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

export async function getLocation() {
  return await getGeoLocation();
}
