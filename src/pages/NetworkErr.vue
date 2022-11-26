<template>
	<div id="no_wifi" class="app">
		<div class="divHead">
			<div class="divTitle">
				<i class="el-icon-arrow-left" @click="goBack"></i>菩提阁
			</div>
		</div>
		<div class="divContent">
			<img src="./../assets/no_wifi.png" />
			<div class="divDesc">网络连接异常</div>
			<div class="btnRefresh" @click="toPagePrev">点击刷新</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		computed: {},
		created() {

		},
		mounted() {},
		methods: {
			goBack() {
				history.go(-1)
			},
			toPagePrev() {
				history.go(-1)
			}
		}
	}
</script>

<style scoped>
	#no_wifi .divHead {
	  width: 100%;
	  height: 88px;
	  opacity: 1;
	  background: #333333;
	  position: relative;
	}
	
	#no_wifi .divHead .divTitle {
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
	
	#no_wifi .divHead .divTitle i {
	  position: absolute;
	  left: 16px;
	  top: 50%;
	  transform: translate(0, -50%);
	}
	
	#no_wifi .divContent {
	  height: calc(100vh - 88px);
	  width: 100%;
	  background: #ffffff;
	  display: flex;
	  flex-direction: column;
	  text-align: center;
	  align-items: center;
	}
	
	#no_wifi .divContent img {
	  width: 239px;
	  height: 130px;
	  margin-top: 104px;
	  margin-bottom: 19px;
	}
	
	#no_wifi .divContent .divDesc {
	  height: 33px;
	  opacity: 1;
	  font-size: 24px;
	  font-family: PingFangSC, PingFangSC-Regular;
	  font-weight: 500;
	  text-align: center;
	  color: #333333;
	  line-height: 33px;
	  letter-spacing: 0;
	  margin-bottom: 20px;
	}
	
	#no_wifi .divContent .btnRefresh {
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
