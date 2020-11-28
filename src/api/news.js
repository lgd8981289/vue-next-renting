import http from './http';

export const getNews = (params) => {
  return http({
    url: '/api/news',
    method: 'GET',
    params
  });
};
