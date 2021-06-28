<template>
	<view class="content">
		<view class="main">
			<view class="date">
				星期一下午 1：32
			</view>
			<view class="notices">
				<view class="notice d_flex">
					<view class="notice_icon">
						<image src="@/static/images/vip/icon_logo.png" mode=""></image>
					</view>
					<view class="notice_content">
						欢迎来到XXX，XXX是
						主打高端线下约会的平
						台，所有魅力女生资料
						都通过真人认证，保证
						真实有效，您可以放心
						使用～
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		},
	}
</script>

<style lang="scss" scoped>
.date{
	text-align: center;
	color: #888888;
	font-size: 24rpx;
	margin-top: 56rpx;
}
.notice{
	margin-top: 46rpx;
	align-items: flex-start;
	
	.notice_icon{
		width: 	80rpx;
		height: 80rpx;
		flex-shrink: 0;
		margin-right: 20rpx;
	}
	.notice_content{
		width: 324rpx;
		background-color: #F8F8F8;
		padding: 20rpx;
		border-radius: 8rpx;
		line-height: 38rpx;
	}
}
</style>
