import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import CategoryList from '@/views/CategoryList.vue'
import CategoryEdit from '@/views/CategoryEdit.vue'

import MusicList from '@/views/MusicList.vue'
import MusicEdit from '@/views/MusicEdit.vue'

import SingerList from '@/views/SingerList.vue'
import SingerEdit from '@/views/SingerEdit.vue'

import UserList from '@/views/UserList.vue'

import Login from '@/views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {path: '/categories/create', component: CategoryEdit},
        {path: '/categories/list', component: CategoryList},
        {path: '/categories/create/:id', component: CategoryEdit, props: true},
        {path: '/', component: CategoryList},

        {path: '/user/list', component: UserList},

        {path: '/music/create', component: MusicEdit},
        {path: '/music/list', component: MusicList},
        {path: '/music/create/:id', component: MusicEdit, props: true},

        {path: '/singer/create', component: SingerEdit},
        {path: '/singer/list', component: SingerList},
        {path: '/singer/create/:id', component: SingerEdit, props: true}
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
