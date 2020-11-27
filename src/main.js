import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import initVant from './plugins/vant';

const app = createApp(App);
app.use(router);
app.use(store);
initVant(app);
app.mount('#app');
