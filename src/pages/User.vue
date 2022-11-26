<template>
	<div id="user" class="app">
		<div class="divHead">
			<div class="divTitle">
				<i class="el-icon-arrow-left" @click="goBack"></i>个人中心
			</div>
			<div class="divUser">
				<img src="./../assets/headPage.png" />
				<div class="desc">
					<div class="divName">林之迷 <img src="./../assets/women.png" /></div>
					<div class="divPhone">{{userPhone}}</div>
				</div>
			</div>
		</div>
		<div class="divContent">
			<div class="divLinks">
				<div class="item" @click="toAddressPage">
					<img src="./../assets/locations.png" />
					<span>地址管理</span>
					<i class="el-icon-arrow-right"></i>
				</div>
				<div class="divSplit"></div>
				<div class="item" @click="toOrderPage">
					<img src="./../assets/orders.png" />
					<span>历史订单</span>
					<i class="el-icon-arrow-right"></i>
				</div>
			</div>
			<div class="divOrders" v-if="order[0]">
				<div class="title">最新订单</div>
				<div class="timeStatus">
					<span>{{order[0].orderTime}}</span>
					<span>{{getStatus(order[0].status)}}</span>
					<!-- <span>正在派送</span> -->
				</div>
				<div class="dishList">
					<div v-for="(item,index) in order[0].orderDetails" :key="index" class="item">
						<span>{{item.name}}</span>
						<span>x{{item.number}}</span>
					</div>
				</div>
				<div class="result">
					<span>共{{order[0].sumNum}} 件商品,实付</span>
					<span class="price">￥{{order[0].amount}}</span>
				</div>
				<div class="btn" v-if="order[0].status === 4">
					<div class="btnAgain" @click="addOrderAgain">再来一单</div>
				</div>
			</div>
			<div class="quitLogin" @click="toPageLogin">
				退出登录
			</div>
		</div>
	</div>
</template>

<script>
	import {
		orderPagingApi 
	} from "@/api/order"
	export default {
		data() {
			return {
				form: {
					phone: '',
					code: ''
				},
				msgFlag: false,
				order: [{
					orderTime: '', //下单时间
					status: undefined, //订单状态 1已结账，2未结账，3已退单，4已完成，5已取消
					orderDetails: [{
						name: '', //菜品名称
						number: undefined, //数量
					}], //明细
					amount: undefined, //实收金额
					sumNum: 0, //菜品总数
				}],
			}
		},
		computed: {},
		created() {
			this.userPhone = sessionStorage.getItem("userPhone")
			this.initData()
		},
		methods: {
			goBack() {
				history.go(-1)
			},
			toAddressPage() {
				this.$router.push("/addr")
			},
			toOrderPage() {
				this.$router.push("/order")
			},
			initData() {
				this.getLatestOrder()
			},
			async getLatestOrder() {
				const params = {
					page: 1,
					pageSize: 1
				}
				const res = await orderPagingApi(params)
				if (res.code === 1) {
					this.order = res.data.records
					if (this.order && this.order[0].orderDetails) {
						let number = 0
						this.order[0].orderDetails.forEach(item => {
							number += item.number
						})
						this.order[0].sumNum = number
					}
				} else {
					this.$notify({
						type: 'warning',
						message: res.msg
					});
				}
			},
			getStatus(status) {
				let str = ''
				switch (status) {
					case 1:
						str = '待付款'
						break;
					case 2:
						str = '正在派送'
						break;
					case 3:
						str = '已派送'
						break;
					case 4:
						str = '已完成'
						break;
					case 5:
						str = '已取消'
						break;

				}
				return str
			},
			async addOrderAgain() {
				const res = await orderAgainApi({
					id: this.order[0].id
				})
				if (res.code === 1) {
					window.requestAnimationFrame(() => {
						window.location.href = '/front/index.html'
					})
				} else {
					this.$notify({
						type: 'warning',
						message: res.msg
					});
				}
			},
			async toPageLogin() {
				const res = await loginoutApi()
				if (res.code === 1) {
					window.requestAnimationFrame(() => {
						window.location.href = '/front/page/login.html'
					})
				} else {
					this.$notify({
						type: 'warning',
						message: res.msg
					});
				}
			}
		}
	}
</script>

<style scoped>
	#user {
		height: 100%;
	}

	#user .divHead {
		width: 100%;
		height: 164px;
		opacity: 1;
		background: #ffc200;
		box-sizing: border-box;
		padding-left: 12px;
		padding-right: 12px;
	}

	#user .divHead .divTitle {
		height: 25px;
		opacity: 1;
		font-size: 18px;
		font-weight: 500;
		text-align: center;
		color: #333333;
		line-height: 25px;
		letter-spacing: 0;
		padding-top: 50px;
		margin-bottom: 18px;
		position: relative;
	}

	#user .divHead .divTitle i {
		position: absolute;
		left: 0;
		margin-top: 5px;
	}

	#user .divHead .divUser {
		display: flex;
	}

	#user .divHead .divUser>img {
		width: 58px;
		height: 58px;
		border-radius: 50%;
		margin-right: 16px;
	}

	#user .divHead .divUser .desc {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	#user .divHead .divUser .desc .divName {
		opacity: 1;
		font-size: 16px;
		font-weight: 500;
		text-align: left;
		color: #333333;
		margin-right: 6px;
		margin-bottom: 5px;
		display: flex;
		align-items: center;
	}

	#user .divHead .divUser .desc .divName img {
		width: 16px;
		height: 16px;
		opacity: 1;
		margin-left: 6px;
	}

	#user .divHead .divUser .desc .divPhone {
		font-size: 14px;
		font-weight: 400;
		text-align: left;
		color: #333333;
	}

	#user .divContent {
		height: calc(100% - 174px);
		overflow-y: auto;
	}

	#user .divLinks {
		height: 104px;
		opacity: 1;
		background: #ffffff;
		border-radius: 6px;
		padding-left: 17px;
		padding-right: 11px;
		margin: 10px;
	}

	#user .divLinks .item {
		height: 51px;
		line-height: 51px;
		position: relative;
		display: flex;
		align-items: center;
	}

	#user .divLinks .divSplit {
		height: 1px;
		opacity: 1;
		background-color: #ebebeb;
		border: 0;
	}

	#user .divLinks .item img {
		width: 18px;
		height: 18px;
		margin-right: 5px;
	}

	#user .divLinks .item i {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translate(0, -50%);
	}

	#user .divOrders {
		margin: 0 10px 10px 10px;
		background: #ffffff;
		border-radius: 6px;
		padding-left: 10px;
		padding-right: 10px;
		padding-bottom: 17px;
	}

	#user .divOrders .title {
		height: 60px;
		line-height: 60px;
		opacity: 1;
		font-size: 16px;
		font-weight: 500;
		text-align: left;
		color: #333333;
		letter-spacing: 0;
		border-bottom: 2px solid #efefef;
	}

	#user .divOrders .timeStatus {
		height: 46px;
		line-height: 16px;
		font-size: 14px;
		font-weight: 400;
		text-align: left;
		color: #666666;
		line-height: 20px;
		letter-spacing: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2px dashed #efefef;
	}

	#user .divOrders .timeStatus span:first-child {
		color: #333333;
	}

	#user .divOrders .dishList {
		padding-top: 10px;
		padding-bottom: 11px;
	}

	#user .divOrders .dishList .item {
		padding-top: 5px;
		padding-bottom: 5px;
		display: flex;
		justify-content: space-between;
		height: 20px;
		opacity: 1;
		font-size: 14px;
		font-weight: 400;
		text-align: left;
		color: #666666;
		line-height: 20px;
		letter-spacing: 0;
	}

	#user .divOrders .result {
		display: flex;
		justify-content: flex-end;
		height: 20px;
		opacity: 1;
		font-size: 14px;
		font-weight: 400;
		text-align: left;
		color: #666666;
		line-height: 20px;
	}

	#user .divOrders .result .price {
		color: black;
	}

	#user .divOrders .btn {
		margin-top: 20px;
		display: flex;
		justify-content: flex-end;
	}

	#user .divOrders .btn .btnAgain {
		width: 124px;
		height: 36px;
		opacity: 1;
		border: 1px solid #e5e4e4;
		border-radius: 19px;
		opacity: 1;
		font-size: 14px;
		font-weight: 500;
		text-align: center;
		color: #333333;
		line-height: 36px;
		letter-spacing: 0;
		position: relative;
	}

	#user .quitLogin {
		margin: 0 10px 10px 10px;
		height: 50px;
		opacity: 1;
		background: #ffffff;
		border-radius: 6px;
		opacity: 1;
		font-size: 15px;
		font-weight: 500;
		text-align: center;
		color: #333333;
		line-height: 50px;
	}
</style>
