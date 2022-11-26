<template>
	<div id="pay_success" class="app">
		<div class="divHead">
			<div class="divTitle">
				<i class="el-icon-arrow-left" @click="goBack"></i>
				菩提阁
				<img src="../assets/home.png" @click="toMainPage" />
			</div>
		</div>
		<div class="divContent">
			<img src="../assets/success.png" />
			<div class="divSuccess">下单成功</div>
			<div class="divDesc">预计{{finishTime}}到达</div>
			<div class="divDesc1">后厨正在加紧制作中，请耐心等待~</div>
			<div class="btnView" @click="toOrderPage">查看订单</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				finishTime: ''
			}
		},
		computed: {},
		created() {
			this.getFinishTime()
		},
		mounted() {},
		methods: {
			goBack() {
				window.requestAnimationFrame(() => {
					window.location.replace('/front/index.html')
				})
			},
			toOrderPage() {
				window.requestAnimationFrame(() => {
					window.location.replace('/front/page/order.html')
				})
			},
			toMainPage() {
				window.requestAnimationFrame(() => {
					window.location.replace('/front/index.html')
				})
			},
			//获取送达时间
			getFinishTime() {
				let now = new Date()
				let hour = now.getHours() + 1
				let minute = now.getMinutes()
				if (hour.toString().length < 2) {
					hour = '0' + hour
				}
				if (minute.toString().length < 2) {
					minute = '0' + minute
				}
				this.finishTime = hour + ':' + minute
			},

		}
	}
</script>

<style scoped>
	#pay_success .divHead {
	  width: 100%;
	  height: 88px;
	  opacity: 1;
	  background: #333333;
	  position: relative;
	}
	
	#pay_success .divHead .divTitle {
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
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	}
	
	#pay_success .divHead .divTitle i {
	  margin-left: 16px;
	}
	
	#pay_success .divHead .divTitle img {
	  width: 18px;
	  height: 18px;
	  margin-right: 19px;
	}
	
	#pay_success .divContent {
	  height: calc(100vh - 88px);
	  width: 100%;
	  background: #ffffff;
	  display: flex;
	  flex-direction: column;
	  text-align: center;
	  align-items: center;
	}
	
	#pay_success .divContent img {
	  margin-top: 148px;
	  margin-bottom: 19px;
	  width: 90px;
	  height: 86px;
	}
	
	#pay_success .divContent .divSuccess {
	  height: 33px;
	  opacity: 1;
	  font-size: 24px;
	  font-family: PingFangSC, PingFangSC-Regular;
	  font-weight: 500;
	  text-align: center;
	  color: #333333;
	  line-height: 33px;
	  margin-top: 19px;
	  margin-bottom: 10px;
	}
	
	#pay_success .divContent .divDesc,
	.divDesc1 {
	  height: 22px;
	  opacity: 1;
	  font-size: 16px;
	  font-family: PingFangSC, PingFangSC-Regular;
	  font-weight: 400;
	  text-align: center;
	  color: #666666;
	  line-height: 22px;
	}
	
	#pay_success .divContent .divDesc1 {
	  margin-top: 7px;
	  margin-bottom: 20px;
	}
	
	#pay_success .divContent .btnView {
	  width: 124px;
	  height: 36px;
	  opacity: 1;
	  background: #ffc200;
	  border-radius: 18px;
	  opacity: 1;
	  font-size: 15px;
	  font-family: PingFangSC, PingFangSC-Regular;
	  font-weight: 500;
	  text-align: center;
	  color: #333333;
	  line-height: 21px;
	  letter-spacing: 0;
	  line-height: 36px;
	}

</style>
