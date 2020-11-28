import http from './http';

export const getOptions = (params) => {
  return http({
    url: '/api/options',
    method: 'GET',
    params
  });
};
