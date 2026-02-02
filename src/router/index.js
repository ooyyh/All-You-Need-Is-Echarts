import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/index.vue'),
      children:[
        {
          path: '/bar',
          name: 'bar',
          component: () => import('../components/bar.vue')
        },
        {
          path: '/line',
          name: 'line',
          component: () => import('../components/line.vue')
        },
        {
          path: '/pie',
          name: 'pie',
          component: () => import('../components/pie.vue')
        },
        {
          path: '/scatter',
          name: 'scatter',
          component: () => import('../components/scatter.vue')
        },
        {
          path: '/radar',
          name: 'radar',
          component: () => import('../components/radar.vue')
        },
        {
          path: '/gauge',
          name: 'gauge',
          component: () => import('../components/gauge.vue')
        },
        {
          path: '/funnel',
          name: 'funnel',
          component: () => import('../components/funnel.vue')
        },
        {
          path: '/heatmap',
          name: 'heatmap',
          component: () => import('../components/heatmap.vue')
        }
      ]
    }
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
