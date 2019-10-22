/*
 * @Author: 钱锟
 * @Date: 2018-03-12 13:50:52
 * @Last Modified by: 宿帅
 * @Last Modified time: 2018-03-23 19:51:26
 */

import IP from './ip.config'
const key = process.env.NODE_ENV === 'production' ? 'production' : 'dev'
const prefix = IP[key]
const commonPrefix = prefix + '/sensefocus/common/'

const common = {
  logout: prefix + '/logout',
  login: prefix + '/login',
  configList: prefix + '/config/list',
  getAllDeviceGroup: commonPrefix + 'device/all_group',
  getMediaAllDeviceGroup: commonPrefix + 'media/device/all_group',
  changePassWord: commonPrefix + 'change_password',
  normalFile: prefix + '/common/file/normal',
  downloadTemplate: commonPrefix + 'download/template/',
  publicKey: prefix + '/common/public_key'
}

const api = {
  common,
}

export default api
