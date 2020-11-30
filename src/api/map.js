import http from './http';

export const getArea = (params) => {
  return http({
    url: '/api/area',
    method: 'GET',
    params
  });
};

export const getAreaHouse = (params) => {
  return http({
    url: '/api/area/house',
    method: 'GET',
    params
  });
};

export const getAreaRecommend = (params) => {
  return http({
    url: '/api/area/recommend',
    method: 'GET',
    params
  });
};
