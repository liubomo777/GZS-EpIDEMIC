import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/download',
    name: 'download',
    component: () => import('@/views/login/download.vue')
  },
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/index.vue'),
    // redirect: '/welcome',
    redirect: (to) => {
      return localStorage.getItem('redirecPath') || '/welcome'
    },
    children: [
      /* {
        path: '/worktable',
        name: '工作台',
        component: () => import('@/views/login/worktable.vue')
      }, */
      {
        path: localStorage.getItem('redirecPath') || '/welcome',
        name: localStorage.getItem('redirecPath') ? '驾驶舱' :'首页',
        component: () => import(`@/views${localStorage.getItem('redirecPath') || '/login/welcome'}.vue`)
      },

      {
        path: '/change',
        name: '修改密码',
        component: () => import('@/views/login/change.vue')
      },
      {
        path: '/info',
        name: '账户信息',
        component: () => import('@/views/login/info.vue')
      },
      {
        path: '/settings',
        name: '通知设置',
        component: () => import('@/views/login/settings.vue')
      },
      {
        path: '/bind',
        name: '绑定手机号',
        component: () => import('@/views/login/bind.vue')
      },
      {
        path: '/personal',
        name: '个人中心',
        component: () => import('@/views/login/personal.vue')
      },
      {
        path: '/user',
        name: '用户管理',
        component: () => import('@/views/user/index.vue')
      },
      {
        path: '/message/homeList',
        name: '消息列表',
        component: () => import('@/views/message/homeList.vue')
      }
    ]
  }
  // 所有未定义路由，全部重定向到welcome页
  // {
  //   path: '*',
  //   redirect: '/welcome'
  // }
]

const router = new Router({
  mode: 'history',
  base: process.env.VUE_APP_publicPath,
  routes
})

const originalPush = Router.prototype.push

Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

/* 路由异常错误处理，尝试解析一个异步组件时发生错误，重新渲染目标页面 */
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  const targetPath = router.history.pending.fullPath
  if (isChunkLoadFailed) {
    router.replace(targetPath)
  }
})

export default router
