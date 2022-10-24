import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import power from '@/components/power/power'
import Roles from '@/components/power/Roles'
import user from '@/components/user'
import Cate from '@/components/goods/Cate'
import showMessage from '../page/showMessage'
import welcome from '../page/welcome'

Vue.use(Router)

export default new Router({
// const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/showMessage',
      name: 'showMessage',
      component: showMessage,
      redirect: '/welcome',
      children: [
        {path: '/welcome', component: welcome},
        {path: '/user', component: user},
        {path: '/power', component: power},
        {path: '/Roles', component: Roles},
        {path: '/Cate', component: Cate}
      ]
    }
  ]
})
// 路由导航守卫
// router.beforeEach((to, from, next) => {
//   // to 将要跳转的地方
//   // from 哪个路径跳转过来的
//   // next 放行函数 next()直接放行   next('/login')强制跳转
//   if (to.path === '/HelloWorld') {
//     return next()
//   }
//   const token = window.sessionStorage.getItem('token')
//   if (!token) return next('/HelloWorld') 
// })

// export default router
