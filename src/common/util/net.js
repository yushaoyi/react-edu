import axios from 'axios'
import qs from 'qs'
import { HTTP_SUCCESS_CODE, HTTP_TIMEOUT, SERVER_URL } from '@/common/config'
import * as Fun from './function'

const instance = axios.create({
  timeout: HTTP_TIMEOUT,
  baseURL: SERVER_URL
})

instance.interceptors.request.use((config) => {
  // let token = Fun.getSg('token')

  if (config.headers['is-mutile-data']) {
    delete config.headers['is-mutile-data']
  } else {
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    if (config.method === 'post' || config.method === 'put') {
      console.log(config.method)
      config.data = qs.stringify(config.data)
    }
  }
  return config
}, (err) => {
  return Promise.reject(err) // 错误传参
})

instance.interceptors.response.use((res) => {
  if (res.status !== 200) { // res status检查
    checkStatus(res)
    return Promise.reject(res)
  }
  let status = res.data ? res.data.status : ''
  if (!status) {
    // 服务器错误，请稍后再试~
    return Promise.reject(res)
  } else if (status && status.code !== HTTP_SUCCESS_CODE) { // 业务错误处理
    // UI.toastError(status.message)
    return Promise.reject(res)
  }
  return res // 返回正常结果
}, (err) => {
  if (err.response) {
    checkStatus(err.response)
  } else {
    if (err.code === 'ECONNABORTED') {

    } else {

    }
  }
  return Promise.reject(err) // 网络异常
})


function checkStatus (res) {
  let status = res.status
  switch (status) {
    case 401: // 登录无权限 跳转登录

      // setTimeout(() => {
      //   router.push({path: '/login'})
      // }, 1000)
      break
    case 403: // 拒绝访问
      break
    case 404: // 请求地址出错
      break
    case 500: // 服务器内部错误
      // UI.toastError('网络错误，请稍后再试~')
      break
    case 502: // 网关错误
      // UI.toastError('网络错误，请稍后再试~')
      break
    case 504: // 网关超时
      // UI.toastError('网络错误，请稍后再试~')
      break
    default:
      break
  }
}

const method = (type, api, params = {}, options = {}) => {
  return new Promise((resolve, reject) => {
    instance[type](api, params, options)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
/**
 * @param url
 * @param params
 * @returns {Promise}
 */
export function postServer (url, params) {
  return method('post', url, params)
}

export function getServer (url, params) {
  params = params || {}
  url = Fun.parseGetParams(url, params)
  return method('get', url)
}

export function putServer (url, params) {
  return method('put', url, params)
}

export function postFormServer (url, params) {
  return method('post', url, params, {
    headers: {
      'is-mutile-data': 1,
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function deleteServer (url, params) {
  return method('delete', url, params)
}
