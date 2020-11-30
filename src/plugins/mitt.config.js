import mitt from 'mitt';

export default function initMitt(app) {
  app.config.globalProperties.$emitter = mitt();
}
