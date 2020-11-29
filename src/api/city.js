import http from './http';

export const getCityList = (params) => {
  return http({
    url: '/api/cityList',
    method: 'GET',
    params
  });
};
