import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  NavigationGuardNext
} from 'vue-router'

// create alias
type Route = RouteLocationNormalized
type Next = NavigationGuardNext

const lazyLoadComponent = (name: string) => {
  return() => import(`../screens/${name}.vue`)
}

export const routerHistory = createWebHistory()

const routes = [
  {
    path: '/menu-links',
    component: lazyLoadComponent('menuLinks'),
    beforeEnter(to: Route, from: Route, next: Next) {
      next()
    },
  },
  {
    path: '/list-box',
    component: lazyLoadComponent('listbox')
  },
  {
    path: '/dialog',
    component: lazyLoadComponent('alertDialog')
  }
]

export const router = createRouter({
  history: routerHistory,
  strict: true,
  routes
})
