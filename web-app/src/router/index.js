import Vue from 'vue';
import Router from 'vue-router';
import FontMap from '@/components/FontMap';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FontMap',
      component: FontMap,
    },
  ],
});
