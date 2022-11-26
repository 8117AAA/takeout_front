import Vue from 'vue'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import User from '@/pages/User'
import Addr from '@/pages/Addr'
import AddrEdit from '@/pages/AddrEdit'
import Order from '@/pages/Order'
import OrderAdd from '@/pages/OrderAdd'
import Pay from '@/pages/Pay'
import NetworkErr from '@/pages/NetworkErr'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [{
	path: '/',
	component: Home
}, {
	path: '/login',
	component: Login
}, {
	path: '/user',
	component: User
}, {
	path: '/addr',
	component: Addr
}, {
	path: '/addredit',
	name: 'addredit',
	component: AddrEdit
}, {
	path: '/order',
	component: Order
}, {
	path: '/orderadd',
	component: OrderAdd
}, {
	path: '/Pay',
	component: Pay
}, {
	path: '/networkerr',
	component: NetworkErr
}]

const router = new Router({
	routes: constantRouterMap
})

export default router
