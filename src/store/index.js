import { createStore } from 'vuex';

export default createStore({
  state: {
    city: '中国'
  },
  mutations: {
    setCity(state, city) {
      state.city = city;
    }
  },
  actions: {},
  modules: {}
});
