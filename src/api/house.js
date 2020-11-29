import http from './http';

export const getTabs = (params) => {
  return http({
    url: '/api/tabs',
    method: 'GET',
    params
  });
};

export const getList = (params) => {
  return http({
    url: '/api/list',
    method: 'GET',
    params
  });
};
