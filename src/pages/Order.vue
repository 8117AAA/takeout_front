<template>
	<div id="order" class="app">
		<div class="divHead">
			<div class="divTitle">
				<i class="el-icon-arrow-left" @click="goBack"></i>菩提阁
			</div>
		</div>
		<div class="divBody" v-if="orderList.length > 0">
			<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
				<van-cell v-for="(order,index) in orderList" :key="index" class="item">
					<div class="timeStatus">
						<span>{{order.orderTime}}</span>
						<span>{{getStatus(order.status)}}</span>
						<!-- <span>正在派送</span> -->
					</div>
					<div class="dishList">
						<div v-for="(item,index) in order.orderDetails" :key="index" class="item">
							<span>{{item.name}}</span>
							<span>x{{item.number}}</span>
						</div>
					</div>
					<div class="result">
						<span>共{{order.sumNum}} 件商品,实付</span><span class="price">￥{{order.amount}}</span>
					</div>
					<div class="btn" v-if="order.status === 4">
						<div class="btnAgain" @click="addOrderAgain(order)">再来一单</div>
					</div>
				</van-cell>
			</van-list>
		</div>
		<div class="divNoData" v-else>
			<div class="divContainer">
				<img src="./../assets/no_order.png" />
				<div>暂无订单</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				paging: {
					page: 1,
					pageSize: 5
				},
				orderList: [],
				loading: false,
				finished: false
			}
		},
		computed: {},
		created() {
			this.initData()
		},
		mounted() {},
		methods: {
			goBack() {
				const url = document.referrer
				//表示是从订单页面跳转过来的
				if (url.includes('success')) {
					window.requestAnimationFrame(() => {
						window.location.href = '/front/index.html'
					})
				} else {
					history.go(-1)
				}
			},
			initData() {
				this.getList()
			},
			async getList() {
				if (this.finished) {
					this.loading = false;
					return
				}
				const res = await orderPagingApi(this.paging)
				if (res.code === 1) {
					this.orderList.push(...res.data.records)
					let records = res.data.records
					if (records && Array.isArray(records)) {
						records.forEach(item => {
							let number = 0
							item.orderDetails.forEach(ele => {
								number += ele.number
							})
							item.sumNum = number
						})
					}
					this.loading = false;
					if (this.paging.page >= res.data.pages) {
						this.finished = true;
					}
					this.paging.page = this.paging.page + 1
				} else {
					this.$notify({
						type: 'warning',
						message: res.msg
					});
				}
			},
			async addOrderAgain(order) {
				const res = await orderAgainApi({
					id: order.id
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
			}
		}
	}
</script>

<style scoped>
	#order {
		height: 100%;
	}

	#order .divHead {
		width: 100%;
		height: 88px;
		opacity: 1;
		background: #333333;
		position: relative;
	}

	#order .divHead .divTitle {
		font-size: 18px;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 500;
		text-align: center;
		color: #ffffff;
		line-height: 25px;
		letter-spacing: 0;
		position: absolute;
		bottom: 13px;
		width: 100%;
	}

	#order .divHead .divTitle i {
		position: absolute;
		left: 16px;
		top: 50%;
		transform: translate(0, -50%);
	}

	#order .divBody {
		margin: 10px 12px 10px 12px;
		background: #ffffff;
		border-radius: 6px;
		padding-left: 10px;
		padding-right: 10px;
		height: calc(100% - 108px);
		overflow-y: auto;
	}

	#order .divBody .van-list .van-cell::after {
		border: 0;
	}

	#order .divBody .item .timeStatus {
		height: 46px;
		line-height: 16px;
		font-size: 14px;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: left;
		color: #666666;
		line-height: 20px;
		letter-spacing: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2px dashed #efefef;
		border-top: 1px solid #efefef;
	}

	#order .divBody .item .timeStatus span:first-child {
		color: #333333;
	}

	#order .divBody .item .dishList {
		padding-top: 10px;
		padding-bottom: 11px;
	}

	#order .divBody .item .dishList .item {
		padding-top: 5px;
		padding-bottom: 5px;
		display: flex;
		justify-content: space-between;
		height: 20px;
		opacity: 1;
		font-size: 14px;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: left;
		color: #666666;
		line-height: 20px;
		letter-spacing: 0;
	}

	#order .divBody .item .result {
		display: flex;
		justify-content: flex-end;
		height: 20px;
		opacity: 1;
		font-size: 14px;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: left;
		color: #666666;
		line-height: 20px;
	}

	#order .divBody .item .result .price {
		color: #343434;
	}

	#order .divBody .item .btn {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 17px;
		margin-top: 20px;
	}

	#order .divBody .btn .btnAgain {
		width: 124px;
		height: 36px;
		opacity: 1;
		border: 1px solid #e5e4e4;
		border-radius: 19px;
		opacity: 1;
		font-size: 14px;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 500;
		text-align: center;
		color: #333333;
		line-height: 36px;
		letter-spacing: 0;
		position: relative;
	}

	#order .divNoData {
		width: 100%;
		height: calc(100% - 88px);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	#order .divNoData .divContainer img {
		width: 240px;
		height: 129px;
	}

	#order .divNoData .divContainer div {
		font-size: 24px;
		font-family: PingFangSC, PingFangSC-Medium;
		font-weight: 500;
		text-align: center;
		color: #333333;
		line-height: 33px;
		height: 33px;
		margin-top: 20px;
	}
</style>
