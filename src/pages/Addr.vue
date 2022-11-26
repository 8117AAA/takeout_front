<template>
	<div id="address" class="app">
		<div class="divHead">
			<div class="divTitle">
				<i class="el-icon-arrow-left" @click="goBack"></i>地址管理
			</div>
		</div>
		<div class="divContent">
			<div class="divItem" v-for="(item,index) in addressList" :key="index" @click.capture="itemClick(item)">
				<div class="divAddress">
					<span
						:class="{spanCompany:item.label === '公司',spanHome:item.label === '家',spanSchool:item.label === '学校'}">{{item.label}}</span>
					{{item.detail}}
				</div>
				<div class="divUserPhone">
					<span>{{item.consignee}}</span>
					<span>{{item.sex === '0' ? '女士' : '先生'}}</span>
					<span>{{item.phone}}</span>
				</div>
				<img src="./../assets/edit.png" @click.stop.prevent="toAddressEditPage(item)" />
				<div class="divSplit"></div>
				<div class="divDefault">
					<img src="./../assets/checked_true.png" v-if="item.isDefault === 1">
					<img src="./../assets/checked_false.png" @click.stop.prevent="setDefaultAddress(item)" v-else>设为默认地址
				</div>
			</div>
		</div>
		<div class="divBottom" @click="toAddressCreatePage">+ 添加收货地址</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				addressList: [
					    {
							id:11900,
					    label:'公司',
					    detail:'金燕龙写字楼 4层电梯口fsdfdsfsdfsdfsssssssssssss（电梯可…）',
					    consignee:'周先生',//姓名
					    phone:18544445566,//手机号
					    isDefault:0,//是否是默认
					},
					{
					    label:'家',
					    detail:'金燕龙写字楼 4层电梯口（电梯可…）',
					    consignee:'周先生',//姓名
					    phone:18544445566,//手机号
					    isDefault:0,//是否是默认
					},
					{
					    label:'学校',
					    detail:'金燕龙写字楼 4层电梯口（电梯可…）',
					    consignee:'周先生',//姓名
					    phone:18544445566,//手机号
					    isDefault:0,//是否是默认
					},
					{
					    label:'公司',
					    detail:'金燕龙写字楼 4层电梯口（电梯可…）',
					    consignee:'周先生',//姓名
					    phone:18544445566,//手机号
					    isDefault:0,//是否是默认
					},
					{
					    label:'公司',
					    detail:'金燕龙写字楼 4层电梯口（电梯可…）',
					    consignee:'周先生',//姓名
					    phone:18544445566,//手机号
					    isDefault:0,//是否是默认
					},
					{
					    label:'公司',
					    detail:'金燕龙写字楼 4层电梯口（电梯可…）',
					    consignee:'周先生',//姓名
					    phone:18544445566,//手机号
					    isDefault:1,//是否是默认
					}
				],
			}
		},
		computed: {},
		created() {
			this.initData()
		},
		mounted() {},
		methods: {
			goBack() {
				history.go(-1)
			},
			toAddressEditPage(item) {
				this.$router.push({name:"addredit",query:{id:item.id}})
			},
			toAddressCreatePage() {
				this.$router.push("/addredit");
			},
			async initData() {
				const res = await addressListApi()
				if (res.code === 1) {
					this.addressList = res.data
				} else {
					this.$message.error(res.msg)
				}
			},
			async setDefaultAddress(item) {
				if (item.id) {
					const res = await setDefaultAddressApi({
						id: item.id
					})
					if (res.code === 1) {
						this.initData()
					} else {
						this.$message.error(res.msg)
					}
				}
			},
			itemClick(item) {
				const url = document.referrer
				//表示是从订单页面跳转过来的
				if (url.includes('order')) {
					this.setDefaultAddress(item)
					history.go(-1)
				}
			}

		}
	}
</script>

<style scoped>
	#address .divHead {
	  width: 100%;
	  height: 88px;
	  opacity: 1;
	  background: #333333;
	  position: relative;
	}
	
	#address .divHead .divTitle {
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
	
	#address .divHead .divTitle i {
	  position: absolute;
	  left: 16px;
	  top: 50%;
	  transform: translate(0, -50%);
	}
	
	#address .divContent {
	  height: calc(100vh - 157px);
	  overflow: auto;
	}
	
	#address .divContent .divItem {
	  height: 128px;
	  opacity: 1;
	  background: #ffffff;
	  border-radius: 6px;
	  margin-top: 10px;
	  margin-left: 10px;
	  margin-right: 9px;
	  padding-left: 12px;
	  position: relative;
	}
	
	#address .divContent .divItem > img {
	  width: 16px;
	  height: 16px;
	  position: absolute;
	  top: 40px;
	  right: 24px;
	}
	
	#address .divContent .divItem .divDefault img {
	  width: 16px;
	  height: 16px;
	  opacity: 1;
	}
	
	#address .divContent .divItem .divAddress {
	  font-size: 14px;
	  font-family: PingFangSC, PingFangSC-Regular;
	  font-weight: 400;
	  text-align: left;
	  color: #333333;
	  line-height: 20px;
	  letter-spacing: 0;
	  padding-top: 21px;
	  overflow: hidden;
	  text-overflow: ellipsis;
	  white-space: nowrap;
	  width: 280px;
	}
	
	#address .divContent .divItem .divAddress span {
	  width: 34px;
	  height: 20px;
	  opacity: 1;
	  font-size: 12px;
	  display: inline-block;
	  text-align: center;
	  margin-right: 4px;
	  margin-bottom: 10px;
	}
	
	#address .divContent .divItem .divUserPhone span {
	  height: 20px;
	  opacity: 1;
	  font-size: 14px;
	  font-family: PingFangSC, PingFangSC-Regular;
	  font-weight: 400;
	  text-align: left;
	  color: #999999;
	  line-height: 20px;
	  letter-spacing: 0;
	  margin-right: 10px;
	}
	
	#address .divContent .divItem .divUserPhone span:first-child {
	  margin-right: 2px;
	}
	
	#address .divContent .divItem .divAddress .spanCompany {
	  background-color: #e1f1fe;
	}
	
	#address .divContent .divItem .divAddress .spanHome {
	  background: #fef8e7;
	}
	
	#address .divContent .divItem .divAddress .spanSchool {
	  background: #e7fef8;
	}
	
	#address .divContent .divItem .divSplit {
	  height: 1px;
	  opacity: 1;
	  background: #efefef;
	  border: 0;
	  margin-top: 16px;
	  margin-bottom: 10px;
	  margin-right: 10px;
	}
	
	#address .divContent .divItem .divDefault {
	  height: 18px;
	  opacity: 1;
	  font-size: 13px;
	  font-family: PingFangSC, PingFangSC-Regular;
	  font-weight: 400;
	  text-align: left;
	  color: #333333;
	  line-height: 18px;
	  letter-spacing: 0;
	}
	
	#address .divContent .divItem .divDefault img {
	  height: 18px;
	  width: 18px;
	  margin-right: 5px;
	  vertical-align: bottom;
	}
	
	#address .divBottom {
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
	  line-height: 36px;
	  letter-spacing: 0;
	  position: absolute;
	  bottom: 23px;
	  left: 50%;
	  transform: translate(-50%, 0);
	  width: 334px;
	}
</style>
