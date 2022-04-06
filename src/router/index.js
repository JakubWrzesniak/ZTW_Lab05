import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthorsView from '../views/AuthorsView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      layout: 'AppLayoutHome'
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/authors',
    name: 'authors',
    component: AuthorsView,
    meta: {
      layout: 'AppLayoutAuthors'
    }
  },
  {
    path: '/author/:id',
    name: 'author-details',
    component: () => import('../views/AuthorView')
  },
  {
    path: '/book/:id',
    name: 'book-details',
    component: () => import('../views/BookView')
  }
  // {
  //   path: '/bookadd',
  //   name: 'bookadd',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/BookAdd.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
