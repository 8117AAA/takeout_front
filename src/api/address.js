import axios from "axios"

//获取所有地址
export function addressListApi() {
    return axios({
      'url': '/api/addressBook/list',
      'method': 'get',
    })
  }
//获取最新地址
export function addressLastUpdateApi() {
    return axios({
      'url': '/api/addressBook/lastUpdate',
      'method': 'get',
    })
}

//新增地址
export function  addAddressApi(data){
    return axios({
        'url': '/api/addressBook',
        'method': 'post',
        data
      })
}

//修改地址
export function  updateAddressApi(data){
    return axios({
        'url': '/api/addressBook',
        'method': 'put',
        data
      })
}

//删除地址
export function deleteAddressApi(params) {
    return axios({
        'url': '/api/addressBook',
        'method': 'delete',
        params
    })
}

//查询单个地址
export function addressFindOneApi(id) {
  return axios({
    'url': `/api/addressBook/${id}`,
    'method': 'get',
  })
}

//设置默认地址
export function  setDefaultAddressApi(data){
  return axios({
      'url': '/api/addressBook/default',
      'method': 'put',
      data
    })
}

//获取默认地址
export function getDefaultAddressApi() {
  return axios({
    'url': `/api/addressBook/default`,
    'method': 'get',
  })
}