<template>
	<view class="no_data d_flex">
		<view class="no_data_icon">
			<image src="@/static/images/mine/no_data.png" mode=""></image>
		</view>
		<view>{{ msg }}</view>
		<view class="sub_text">{{ subMsg }}</view>
	</view>
</template>

<script>
	export default {
		props: {
			msg: String,
			subMsg: String
		},
		data() {
			return {

			}
		},
		methods: {

		},
	}
</script>

<style lang="scss" scoped>
	.no_data {
		text-align: center;
		color: #333333;
		font-size: 32rpx;
		flex-direction: column;
		margin-top: 352rpx;

		.no_data_icon {
			width: 284rpx;
			height: 284rpx;
			margin-bottom: 40rpx;
		}
		.sub_text{
			color: #888888;
			font-size: 24rpx;
			margin-top: 20rpx;
		}
	}
</style>
