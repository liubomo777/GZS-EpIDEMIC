import axios from 'axios'
import router from '../router'
import { message } from '@/utils/message'
import { base64 } from '@/utils'

const service = axios.create({
  // 设置超时时间
  timeout: 160000,
  headers: {
    'Content-Type': 'application/json'
  },
  baseURL: process.env.VUE_APP_baseApi
})
// post请求的时候，我们需要加上一个请求头，所以可以在这里进行一个默认的设置
// 即设置post的请求头为application/x-www-form-urlencoded;charset=UTF-8

/**
 * 请求前拦截
 * 用于处理需要在请求前的操作
 */
service.interceptors.request.use(config => {
  if (localStorage.getItem('p3_tk')) {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('p3_tk')
  }
  if (config.method === 'form_data') {
    config.method = 'post'
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.headers.Authorization = 'Basic ' + base64('business:business')
  }
  if (config.method === 'upload') {
    config.method = 'post'
    config.headers.post['Content-Type'] = 'multipart/form-data'
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
/**
 * 请求响应拦截
 * 用于处理需要在请求返回后的操作
 */
service.interceptors.response.use(response => {
  const responseCode = response.status
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则的话抛出错误
  if (responseCode === 200) {
    if (response.data.resp_code === 200 || response.data.size) {
      return Promise.resolve(response.data)
    } else if (response.data.resp_code === 403) {
      message.error('无权限访问')
      return Promise.reject(response.data)
    } else if (response.data.resp_code === 500) {
      message.error(response.data.resp_msg || '网络繁忙，请稍后再试')
      return Promise.reject(response.data)
    } else {
      message.error(response.data.resp_msg || '网络繁忙，请稍后再试')
      return Promise.reject(response.data)
    }
  }
}, error => {
  // 断网 或者 请求超时 状态
  console.log(error)
  if (!error.response) {
    // 请求超时状态
    if (error.message.includes('timeout')) {
      console.log('超时了')
    } else {
      // 可以展示断网组件
      console.log('断网了')
      message.error('请求失败，请检查网络是否已连接')
    }
    return Promise.reject('请求失败，请检查网络是否已连接')
  }
  // 服务器返回不是 2 开头的情况，会进入这个回调
  // 可以根据后端返回的状态码进行不同的操作
  const responseCode = error.response.status
  switch (responseCode) {
    // 401：未登录
    case 401:
      message.error('登录信息已过期，请重新登录')
      // 跳转登录页
      // localStorage.removeItem('p3_tk')
      // localStorage.removeItem('business_menus')
      // localStorage.removeItem('userInfo')
      window.location.href = process.env.VUE_APP_publicPath + '/login?redirect=' + router.currentRoute.fullPath
      // // router.replace({
      //   path: '/login',
      //   query: {
      //     redirect: router.currentRoute.fullPath
      //   }
      // })
      break
    // 403: token过期
    case 403:
      // 弹出错误信息
      message.error('无权限访问')
      break
    // 404请求不存在
    case 404:
      message.error('网络请求不存在')
      break
    // 其他错误，直接抛出错误提示
    default:
      if (error.response.data.resp_msg) {
        message.error(error.response.data.resp_msg)
      } else {
        message.error('网络繁忙，请稍后再试')
      }
  }
  return Promise.reject(error?.response?.data)
})

export default service
