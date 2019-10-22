
import '@/assets/css/less/public/style.less'
import '@/assets/css/style.css'
import router from '@/router'
import store from '@/store'
import {util} from '@/plugins'
import axios from '@/config/axios.config'
import api from '@/config/api'
//
// if (process.env.NODE_ENV === 'development') {
//   require('@/mock')
// }

export {
  api,
  axios,
  router,
  store,
  util
}
