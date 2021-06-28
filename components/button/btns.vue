<template>
	<view class="btn_box">
		<u-button class="btn chat" type="primary" shape="circle" @click="privateChat" hover-class="none">私聊</u-button>
		<u-button v-show="flag" class="btn like l_bg" type="primary" shape="circle" @click="like" hover-class="none">喜欢</u-button>
	</view>
</template>

<script>
	export default {
		props: {
			flag: Boolean
		},
		data() {
			return {
				
			}
		},
		methods: {
			privateChat() {
				this.$emit("privateChat")
			},
			like() {
				this.$emit("like")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btn_box {
		position: fixed;
		bottom: 50rpx;
		left: auto;
		width: 100%;
		margin: auto;
		letter-spacing: 1px;
		display: flex;

		.chat {
			background: url(../../static/images/home/icon_siliao.png) no-repeat 100rpx center;
			background-size: 50rpx 50rpx;
		}

		.like {
			background: url(../../static/images/home/icon_xihuan.png) no-repeat 100rpx center;
			background-size: 50rpx 50rpx;
		}

		.btn {
			width: 342rpx;
			height: 120rpx;
			font-size: 36rpx;
			background-color: #B46628;
			padding-left: 100rpx;
		}
		.l_bg{
			background-color: #F1CAAB;
			color: #333333;
		}
	}
</style>
