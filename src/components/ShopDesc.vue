<template>
	<div class="divTitle">
		<div class="divStatic">
			<img src="../assets/logo.png" class="logo" />
			<div class="divDesc">
				<div class="divName">菩提阁餐厅</div>
				<div class="divSend">
					<span><img src="../assets/time.png" /> 距离1.5km</span>
					<span><img src="../assets/money.png" /> 配送费6元</span>
					<span><img src="../assets/location.png" /> 预计时长12min</span>
				</div>
			</div>
		</div>
		<div class="divDesc">
			简介: 菩提阁中餐厅是菩提阁点餐的独立的品牌，定位“大众 化的美食外送餐饮”，旨为顾客打造专业美食。
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
	.divHead {
		background-image: url("../assets/mainBg.png");
		background-repeat: no-repeat;
		height: 152px;
		background-size: contain;
	}
	
	.divHead img {
		position: absolute;
		left: 19px;
		top: 41px;
		width: 28px;
		height: 28px;
	}
	
	.divTitle {
		width: 345px;
		height: 118px;
		opacity: 1;
		background: #ffffff;
		border-radius: 6px;
		box-shadow: 0px 2px 5px 0px rgba(69, 69, 69, 0.1);
		position: absolute;
		left: 50%;
		top: 77px;
		transform: translate(-50%, 0);
		box-sizing: border-box;
		padding: 14px 0 0 8px;
	}
	
	.divTitle .divStatic {
		display: flex;
	}
	
	.divTitle .divStatic .logo {
		width: 39px;
		height: 39px;
		opacity: 1;
		background: #333333;
		border-radius: 6px;
		margin-right: 10px;
	}
	
	.divTitle .divStatic .divDesc .divName {
		width: 90px;
		height: 25px;
		opacity: 1;
		font-size: 18px;
		font-weight: 500;
		text-align: left;
		color: #20232a;
		line-height: 25px;
	}
	
	.divTitle .divStatic .divDesc .divSend {
		opacity: 1;
		font-size: 11px;
		font-weight: 400;
		text-align: left;
		color: #333333;
		margin-bottom: 10px;
	}
	
	.divTitle .divStatic .divDesc .divSend img {
		width: 14px;
		height: 14px;
		opacity: 1;
		vertical-align: sub;
	}
	
	.divTitle .divStatic .divDesc .divSend span {
		margin-right: 12px;
	}
	
	.divTitle .divStatic .divDesc .divSend span:last-child {
		margin-right: 0;
	}
	
	.divTitle>.divDesc {
		opacity: 1;
		font-size: 12px;
		font-weight: 400;
		text-align: left;
		color: #9b9b9b;
		line-height: 17px;
		margin-right: 18px;
		padding-top: 9px;
		border-top: 1px dashed #ebebeb;
	}
</style>
