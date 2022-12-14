import axios from "axios"

//获取所有的菜品分类
export function categoryListApi() {
    return axios({
      'url': '/api/category/list',
      'method': 'get',
    })
  }

//获取菜品分类对应的菜品
export function dishListApi(data) {
    return axios({
        'url': '/api/dish/list',
        'method': 'get',
        params:{...data}
    })
}

//获取菜品分类对应的套餐
export function setmealListApi(data) {
    return axios({
        'url': '/api/setmeal/list',
        'method': 'get',
        params:{...data}
    })
}

//获取购物车内商品的集合
export function cartListApi(data) {
    return axios({
        'url': '/api/shoppingCart/list',
        'method': 'get',
        params:{...data}
    })
}

//购物车中添加商品
export function  addCartApi(data){
    return axios({
        'url': '/api/shoppingCart/add',
        'method': 'post',
        data
      })
}

//购物车中修改商品
export function  updateCartApi(data){
    return axios({
        'url': '/api/shoppingCart/sub',
        'method': 'post',
        data
      })
}

//删除购物车的商品
export function clearCartApi() {
    return axios({
        'url': '/api/shoppingCart/clean',
        'method': 'delete',
    })
}

//获取套餐的全部菜品
export function setMealDishDetailsApi(id) {
    return axios({
        'url': `/api/setmeal/dish/${id}`,
        'method': 'get',
    })
}


