<template>
	<div id="login" v-loading="loading">
		<div class="divHead">登录</div>
		<div class="divContainer">
			<el-input placeholder=" 请输入手机号码" v-model="form.phone" maxlength='20' />
			</el-input>
			<div class="divSplit"></div>
			<el-input placeholder=" 请输入验证码" v-model="form.code" maxlength='20' />
			</el-input>
			<span @click='getCode'>获取验证码</span>
		</div>
		<div class="divMsg" v-if="msgFlag">手机号输入不正确，请重新输入</div>
		<el-button type="primary" :class="{btnSubmit:1===1,btnNoPhone:!form.phone,btnPhone:form.phone}"
			@click="btnLogin">登录</el-button>
	</div>
</template>

<script>
	import {loginApi} from "@/api/login";
	export default {
		data() {
			return {
				form: {
					phone: '',
					code: ''
				},
				msgFlag: false,
				loading: false
			}
		},
		computed: {},
		created() {},
		mounted() {},
		methods: {
			getCode() {
				this.form.code = ''
				const regex = /^(13[0-9]{9})|(15[0-9]{9})|(17[0-9]{9})|(18[0-9]{9})|(19[0-9]{9})$/;
				if (regex.test(this.form.phone)) {
					this.msgFlag = false
					this.form.code = (Math.random() * 1000000).toFixed(0)
					sendMsgApi({
						phone: this.form.phone
					})
				} else {
					this.msgFlag = true
				}
			},
			async btnLogin() {
				if (this.form.phone && this.form.code) {
					this.loading = true
					const res = await loginApi(this.form)
					// const res = true
					this.loading = false
					if (res.data.code === 1) {
						sessionStorage.setItem("userPhone", this.form.phone)
						// window.requestAnimationFrame(() => {
						// 	window.location.href = '/front/index.html'
						// })
						this.$router.replace("/")
					} else {
						this.$notify({
							type: 'warning',
							message: res.msg
						});
					}
				} else {
					this.$notify({
						type: 'warning',
						message: '请输入手机号码'
					});
				}
			}
		}
	}
</script>

<style scoped>
	#login .divHead {
		opacity: 1;
		background: #333333;
		height: 88px;
		width: 100%;
		font-size: 18px;
		font-weight: 500;
		text-align: center;
		color: #ffffff;
		line-height: 88px;
	}

	#login .divContainer {
		width: 356px;
		height: 128px;
		opacity: 1;
		background: #ffffff;
		border-radius: 6px;
		margin: 0 auto;
		margin-top: 10px;
		position: relative;
	}

	#login .divContainer input {
		border: 0;
		height: 63px;
	}

	#login .divContainer .divSplit {
		height: 1px;
		background-color: #efefef;
		border: 0;
		margin-left: 10px;
		margin-right: 10px;
	}

	#login .divContainer span {
		position: absolute;
		right: 20px;
		top: 20px;
		cursor: pointer;
		opacity: 1;
		font-size: 12px;
		font-weight: 400;
		text-align: left;
		color: #ffc200;
		letter-spacing: 0px;
	}

	#login .divMsg {
		width: 168px;
		height: 17px;
		opacity: 1;
		font-size: 12px;
		font-weight: 400;
		text-align: center;
		color: #e94e3c;
		line-height: 17px;
		margin-left: 26px;
		margin-top: 10px;
	}

	#login .btnSubmit {
		width: 356px;
		height: 40px;
		margin: 20px 10px 0 10px;
		border-radius: 20px;
		border: 0;

		font-size: 15px;
		font-weight: 500;
		text-align: center;
	}

	#login .btnNoPhone {
		color: #666666;
		background: #d8d8d8;
	}

	#login .btnNoPhone:active {
		background: #afafaf;
	}

	#login .btnPhone {
		background: #ffc200;
		color: #333333;
	}

	#login .btnPhone:active {
		background: rgba(255, 142, 0, 1);
		color: #333333;
	}
</style>
