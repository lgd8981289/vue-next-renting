// issues: https://github.com/axios/axios/issues/1879
// 因为 vite 不支持 commonJS 导入，而 axios 并没有提供 ECMAScript（ESM） 版本，所以直接在 vite 中无法使用 axios 。 这里我们借助了一个 镜像库，来解决这个问题
import { axios } from '@bundled-es-modules/axios';
import { Dialog } from 'vant';

const $http = axios.create({
  baseURL: 'https://api.renting.lgdsunday.club/'
});

$http.interceptors.response.use(
  function (response) {
    const data = response.data;
    // 处理错误信息
    if (data.status !== 200) {
      Dialog.alert({
        message: data.description
      });
    }
    return data.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default $http;
