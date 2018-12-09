import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueX from 'vuex';
import VueResource from 'vue-resource';

Vue.use(VueX);
Vue.use(VueResource);

const store = new VueX.Store({
  state: {
    position: 90,
  },
  mutations: {
    setPosition(state, position) {
      state.position = position;
    }
  },
  actions: {
    setPosition({ commit }, position) {
      commit('setPosition', position);
      Vue.http.post('/api/position', {
        position,
      });
    }
  }
})

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
