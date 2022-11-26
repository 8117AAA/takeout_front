<template>
	<div id="add_order" class="app">
		<div class="divHead">
			<div class="divTitle">
				<i class="el-icon-arrow-left" @click="goBack"></i>菩提阁
			</div>
		</div>
		<div class="divContent">
			<div class="divAddress">
				<div @click="toAddressPage">
					<div class="address">{{address.detail}}</div>
					<div class="name">
						<span>{{address.consignee}}{{address.sex === '1' ? '先生':'女士'}}</span>
						<span>{{address.phone}}</span>
					</div>
					<i class="el-icon-arrow-right"></i>
				</div>
				<div class="divSplit"></div>
				<div class="divFinishTime">预计{{finishTime}}送达</div>
			</div>
			<div class="order">
				<div class="title">订单明细</div>
				<div class="divSplit"></div>
				<div class="itemList">
					<div class="item" v-for="(item,index) in cartData" :key="index">
						<el-image :src="imgPathConvert(item.image)">
							<div slot="error" class="image-slot">
								<img src="./../assets/noImg.png" />
							</div>
						</el-image>
						<div class="desc">
							<div class="name">{{item.name}}</div>
							<div class="numPrice">
								<span class="num">x{{item.number}}</span>
								<div class="price">
									<span class="spanMoney">￥</span>{{item.amount}}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="note">
				<div class="title">备注</div>
				<van-field v-model="note" rows="2" autosize type="textarea" maxlength="50" placeholder="请输入您需要备注的信息"
					show-word-limit />
			</div>
		</div>
		<div class="divCart">
			<div :class="{imgCartActive: cartData && cartData.length > 0, imgCart:!cartData || cartData.length<1}">
			</div>
			<div :class="{divGoodsNum:1===1, moreGoods:cartData && cartData.length > 99}"
				v-if="cartData && cartData.length > 0">{{ goodsNum }}</div>
			<div class="divNum">
				<span>￥</span>
				<span>{{goodsPrice}}</span>
			</div>
			<div class="divPrice"></div>
			<div :class="{btnSubmitActive: cartData && cartData.length > 0, btnSubmit:!cartData || cartData.length<1}"
				@click="goToPaySuccess">去支付</div>
		</div>
	</div>
</template>

<script>
	import {cartListApi} from "@/api/main"
	import {getDefaultAddressApi} from "@/api/address"
	export default {
		data() {
			return {
				address: {
					phone: '', //手机号
					consignee: '', //姓名
					detail: '', //详细地址
					sex: '1',
					id: undefined
				},
				finishTime: '', //送达时间
				cartData: [],
				note: '' //备注信息
			}
		},
		computed: {
			goodsNum() {
				let num = 0
				this.cartData.forEach(item => {
					num += item.number
				})
				if (num < 99) {
					return num
				} else {
					return '99+'
				}
			},
			goodsPrice() {
				let price = 0
				this.cartData.forEach(item => {
					price += (item.number * item.amount)
				})
				return price
			}
		},
		created() {
			this.initData()
		},
		mounted() {},
		methods: {
			goBack() {
				history.go(-1)
			},
			initData() {
				//获取默认的地址
				this.defaultAddress()
				//获取购物车的商品
				this.getCartData()
			},
			//获取默认地址
			async defaultAddress() {
				const res = await getDefaultAddressApi()
				if (res.code === 1) {
					this.address = res.data
					this.getFinishTime()
				} else {
					this.$router.push("/addredit")
				}
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
			toAddressPage() {
				this.$router.push("/addr")
			},
			//获取购物车数据
			async getCartData() {
				const res = await cartListApi({})
				if (res.code === 1) {
					this.cartData = res.data
				} else {
					this.$notify({
						type: 'warning',
						message: res.msg
					});
				}
			},
			async goToPaySuccess() {
				const params = {
					remark: this.note,
					payMethod: 1,
					addressBookId: this.address.id
				}
				const res = await addOrderApi(params)
				if (res.code === 1) {
					window.requestAnimationFrame(() => {
						window.location.replace('/front/page/pay-success.html')
					})
				} else {
					this.$notify({
						type: 'warning',
						message: res.msg
					});
				}
			},
			//网络图片路径转换
			imgPathConvert(path) {
				return imgPath(path)
			},
		}
	}
</script>

<style scoped>
	#add_order .divHead {
	  width: 100%;
	  height: 88px;
	  opacity: 1;
	  background: #333333;
	  position: relative;
	}
	
	#add_order .divHead .divTitle {
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
	
	#add_order .divHead .divTitle i {
	  position: absolute;
	  left: 16px;
	  top: 50%;
	  transform: translate(0, -50%);
	}
	
	#add_order .divContent {
	  margin: 10px 10px 0 10px;
	  height: calc(100vh - 56px - 110px);
	  overflow-y: auto;
	}
	
	#add_order .divContent .divAddress {
	  height: 120px;
	  opacity: 1;
	  background: #ffffff;
	  border-radius: 6px;
	  position: relative;
	  padding: 11px 10px 0 16px;
	}
	
	#add_order .divContent .divAddress .address {
	  height: 25px;
	  opacity: 1;
	  font-size: 18px;
	  font-family: PingFangSC, PingFangSC-Regular;
	  font-weight: 500;
	  text-align: left;
	  color: #20232a;
	  line-height: 25px;
	  margin-bottom: 4px;
	  overflow: hidden;
	  text-overflow: ellipsis;
	  white-space: nowrap;
	  width: 300px;
	}
	
	#add_order .divContent .divAddress .name {
	  height: 17px;
	  opacity: 1;
	  font-size: 12px;
	  font-family: PingFangSC, PingFangSC-Regular;
	  font-weight: 400;
	  text-align: left;
	  color: #333333;
	  line-height: 17px;
	}
	
	#add_order .divContent .divAddress .name span:first-child {
	  margin-right: 2px;
	}
	
	#add_order .divContent .divAddress i {
	  position: absolute;
	  right: 14px;
	  top: 32px;
	}
	
	#add_order .divContent .divAddress .divSplit {
	  width: 100%;
	  height: 1px;
	  opacity: 1;
	  border: 0;
	  background-color: #ebebeb;
	  margin-top: 14px;
	}
	
	#add_order .divContent .divAddress .divFinishTime {
	  height: 47px;
	  opacity: 1;
	  font-size: 12px;
	  font-family: PingFangSC, PingFangSC-Regular;
	  font-weight: 400;
	  text-align: left;
	  color: #333333;
	  line-height: 47px;
	  margin-left: 2px;
	}
	
	#add_order .divContent .order {
	  background: #ffffff;
	  border-radius: 6px;
	  margin-top: 10px;
	  margin-bottom: 10px;
	  padding: 3px 10px 7px 16px;
	}
	
	#add_order .divContent .order .title {
	  height: 56px;
	  line-height: 56px;
	  opacity: 1;
	  font-size: 16px;
	  font-family: PingFangSC, PingFangSC-Regular;
	  font-weight: 500;
	  text-align: left;
	  color: #333333;
	  letter-spacing: 0;
	}
	
	#add_order .divContent .order .divSplit {
	  height: 1px;
	  opacity: 1;
	  background-color: #efefef;
	  border: 0;
	}
	
	#add_order .divContent .order .itemList .item {
	  display: flex;
	}
	
	#add_order .divContent .order .itemList .item .el-image {
	  padding-top: 20px;
	  padding-bottom: 20px;
	  width: 64px;
	  height: 64px;
	}
	
	#add_order .divContent .order .itemList .item .el-image img {
	  width: 64px;
	  height: 64px;
	}
	
	#add_order .divContent .order .itemList .item:first-child .desc {
	  border: 0;
	}
	
	#add_order .divContent .order .itemList .item .desc {
	  padding-top: 20px;
	  padding-bottom: 20px;
	  border-top: 2px solid #ebeef5;
	  width: calc(100% - 64px);
	}
	
	#add_order .divContent .order .itemList .item .desc .name {
	  height: 22px;
	  opacity: 1;
	  font-size: 16px;
	  font-family: PingFangSC, PingFangSC-Semibold;
	  font-weight: 600;
	  text-align: left;
	  color: #20232a;
	  line-height: 22px;
	  letter-spacing: 0;
	  margin-left: 10px;
	  margin-bottom: 16px;
	}
	
	#add_order .divContent .order .itemList .item .desc .numPrice {
	  height: 22px;
	  display: flex;
	  justify-content: space-between;
	}
	
	#add_order .divContent .order .itemList .item .desc .numPrice span {
	  margin-left: 12px;
	  height: 20px;
	  opacity: 1;
	  font-size: 14px;
	  font-family: PingFangSC, PingFangSC-Regular;
	  font-weight: 400;
	  text-align: left;
	  color: #818693;
	  line-height: 20px;
	  letter-spacing: 0;
	  display: inline-block;
	}
	
	#add_order .divContent .order .itemList .item .desc .numPrice .price {
	  font-size: 20px;
	  font-family: DIN, DIN-Medium;
	  font-weight: 500;
	  text-align: left;
	  color: #e94e3c;
	}
	
	#add_order
	  .divContent
	  .order
	  .itemList
	  .item
	  .desc
	  .numPrice
	  .price
	  .spanMoney {
	  color: #e94e3c;
	  font-size: 12px;
	}
	
	#add_order .divContent .note {
	  height: 164px;
	  opacity: 1;
	  background: #ffffff;
	  border-radius: 6px;
	  margin-top: 11px;
	  padding: 3px 10px 10px 11px;
	}
	
	#add_order .divContent .note .title {
	  height: 56px;
	  opacity: 1;
	  font-size: 16px;
	  font-family: PingFangSC, PingFangSC-Regular;
	  font-weight: 500;
	  text-align: left;
	  color: #333333;
	  line-height: 56px;
	  letter-spacing: 0px;
	  border-bottom: 2px solid #efefef;
	}
	
	#add_order .divContent .note .van-cell {
	  height: 103px;
	}
	
	#add_order .divCart {
	  width: 345px;
	  height: 44px;
	  opacity: 1;
	  background: #000000;
	  border-radius: 25px;
	  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.25);
	  margin: 0 auto;
	  margin-top: 10px;
	  z-index: 3000;
	  position: absolute;
	  /* bottom: 35px; */
	  bottom: 12px;
	  left: 50%;
	  transform: translate(-50%, 0);
	}
	
	#add_order .divCart .imgCartActive {
	  background-image: url("./../assets/cart_active.png");
	}
	
	#add_order .divCart .imgCart {
	  background-image: url("./../assets/cart.png");
	}
	
	#add_order .divCart > div:first-child {
	  width: 60px;
	  height: 60px;
	  position: absolute;
	  left: 11px;
	  bottom: 0;
	  background-size: 60px 60px;
	}
	
	#add_order .divCart .divNum {
	  font-size: 12px;
	  font-family: DIN, DIN-Medium;
	  font-weight: 500;
	  text-align: left;
	  color: #ffffff;
	  letter-spacing: 0px;
	  position: absolute;
	  left: 92px;
	  top: 10px;
	}
	
	#add_order .divCart .divNum span:last-child {
	  font-size: 20px;
	}
	
	#add_order .divCart > div:last-child {
	  width: 102px;
	  height: 36px;
	  opacity: 1;
	  border-radius: 18px;
	  font-size: 15px;
	  font-family: PingFangSC, PingFangSC-Regular;
	  font-weight: 500;
	  text-align: center;
	  line-height: 36px;
	  position: absolute;
	  right: 5px;
	  top: 4px;
	}
	
	#add_order .divCart .btnSubmit {
	  color: white;
	  background: #d8d8d8;
	}
	#add_order .divCart .btnSubmitActive {
	  color: #333333;
	  background: #ffc200;
	}
	
	#add_order .divCart .divGoodsNum {
	  width: 18px;
	  height: 18px;
	  opacity: 1;
	  background: #e94e3c;
	  border-radius: 50%;
	  text-align: center;
	  font-size: 12px;
	  font-family: PingFangSC, PingFangSC-Regular;
	  font-weight: 500;
	  color: #ffffff;
	  line-height: 18px;
	  position: absolute;
	  left: 57px;
	  top: -5px;
	}
	
	#add_order .divCart .moreGoods {
	  width: 25px;
	  height: 25px;
	  line-height: 25px;
	}

</style>
