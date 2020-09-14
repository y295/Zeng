import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'

import Main from '@/views/Main'
import Singer from '@/views/Singer'
import Ranking from '@/views/Ranking'
import MusicBook from '@/views/MusicBook'
import Search from '@/views/Search'
import SingerBook from '@/views/SingerBook'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {path: '/main', component: Main},
        {path: '/', component: Main},

        {path: '/singers/:id', component: Singer, props: true},

        {path: '/musics/ranking', component: Ranking},

        {path: '/musics/musicbook', component: MusicBook},
        {path: '/musics/musicbook/:id', component: MusicBook, props: true},

        {path: '/musics/singerbook', component: SingerBook},

        {path: '/musics/search/:input', component: Search, props: true}
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    }
  ]
})
