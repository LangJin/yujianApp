<template>
	<!-- 欢迎弹窗 -->
	<u-modal v-model="show" width="626rpx" :show-title="false" :show-confirm-button="false">
		<view class="welcome_bg">
			<image src="../../static/images/home/bg.png" mode=""></image>
		</view>
		<view class="close_btn" @click="close">
			<image src="../../static/images/home/icon_quxiao.png" mode=""></image>
		</view>
		<u-button class="btn" shape="circle" @click="close">知道了</u-button>
	</u-modal>
</template>

<script>
	export default{
		props: {
			show: Boolean
		},
		data() {
			return {
				
			}
		},
		methods: {
			close(){
				this.$emit('close');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.welcome_bg {
		width: 626rpx;
		height: 972rpx;
	}
	
	::v-deep .u-model {
		position: relative;
	}
	
	.btn {
		width: 506rpx;
		height: 88rpx;
		background-color: #333333;
		color: #F1CAAB;
		position: absolute;
		bottom: 4%;
		left: 10%;
	}
	
	.close_btn {
		width: 44rpx;
		height: 44rpx;
		position: absolute;
		top: 22rpx;
		right: 22rpx;
	}
</style>
