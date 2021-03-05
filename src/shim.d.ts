declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}


/*
typescript doesn not understand when import .vue fie '*.vue' module
so we define '*.vue' module

declear some type in a moduel
E.g., add RouteMeta to 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {
    // is optional
    isAdmin?: boolean
    // must be declared by every route
    requiresAuth: boolean
  }
}
*/
