import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import initVant from './plugins/vant';

import './assets/css/style.css';
import './assets/icon/iconfont.css';

const app = createApp(App);
app.use(router);
app.use(store);
initVant(app);
app.mount('#app');
