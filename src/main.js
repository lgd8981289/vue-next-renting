import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import initVant from './plugins/vant';

const app = createApp(App);
app.use(router);
initVant(app);
app.mount('#app');
