import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vant from 'vant';
import 'vant/lib/index.css';
import App from './App.vue'
import router from './router'

Vue.use(ElementUI);
Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
