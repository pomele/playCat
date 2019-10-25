// import Vue from 'vue'
import axios from 'axios'
// import GLOBAL_CONFIG from './config'
// import Qs from 'qs'

// const config = process.env.NODE_ENV === 'production' ? 'production' : 'dev'
axios.defaults = {
  url: '/login',
  method: 'get', // 默认是 get

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'localhost'
}

// 设置默认的配置项
// const  CONFIG = GLOBAL_CONFIG['GLOBAL_CONFIG'];

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 获取token
  let TOKEN = sessionStorage.token
  // 设置token
  if (TOKEN) {
    config.headers['X-ODAPI-Authorization'] = TOKEN
  }
  // 返回配置项
  return config
}, (error) => {
  // 请求错误时做些事
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          sessionStorage.token = ''
          this.router.replace({
            path: 'login',
            query: {redirect: this.router.currentRoute.fullPath}
          })
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  }
)

export default axios
