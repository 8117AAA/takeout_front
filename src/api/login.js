import axios from "axios"

export function loginApi(data) {
    return axios({
      'url': '/api/user/login',
      'method': 'post',
      data
    })
  }

export function loginoutApi() {
  return axios({
    'url': '/api/user/loginout',
    'method': 'post',
  })
}

  