import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserDetailsView  from '../views/UserDetailsView.vue'
import UserInfo from '../components/UserInfo.vue'
import UserAlbums from '@/components/UserAlbums.vue'
import UserPhotos from '@/components/UserPhotos.vue'
import UserComments from '@/components/UserComments.vue'
import UserTodos from '@/components/UserTodos.vue'
import UserPosts from '@/components/UserPosts.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/user/:id/posts',
    name: 'UserPosts',
    component: UserPosts
  },
  {
    path: '/user/:id/info',
    name: 'UserInfo',
    component: UserInfo
  },
  {
    path: '/user/:id/albums',
    name: 'UserAlbums',
    component: UserAlbums
  },
  {
    path: '/user/:id/photos',
    name: 'UserPhotos',
    component: UserPhotos
  },
  {
    //comments
    path: '/user/:id/comments',
    name: 'UserComments',
    component: UserComments
  },
  {
    //todo
    path: '/user/:id/todos',
    name: 'UserTodos',
    component: UserTodos
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
