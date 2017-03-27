import Vue from 'vue'
import Router from 'vue-router'
import Holiday from '@/components/holiday'
import Vacation from '@/components/vacation'
import User from '@/components/user'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'router-active',
  routes: [
    {
      path: '/',
      name: 'vacation',
      component: Vacation
    },
    {
      path: '/holiday',
      name: 'holiday',
      component: Holiday
    },
    {
      path: '/vacation',
      name: 'vacation',
      component: Vacation
    },
    {
      path: '/user',
      name: 'user',
      component: User
    }
  ]
})
