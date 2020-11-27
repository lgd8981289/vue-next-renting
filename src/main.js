import { createApp } from 'vue';
import App from './App.vue';
import initVant from './plugins/vant';

const app = createApp(App);
initVant(app);
app.mount('#app');
