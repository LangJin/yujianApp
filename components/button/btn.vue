<template>
	<view class="base_btn">
		<u-button type="primary" shape="circle" @click="toNext" class="btn" hover-class="none">{{msg}}</u-button>
	</view>
</template>

<script>
	export default{
		props: {
			msg: String
		},
		data() {
			return {
				
			}
		},
		methods: {
			toNext(){
				this.$emit("toNext");
			}
		},
	}
</script>

<style lang="scss" scoped>
	.base_btn{
		width: 100%;
		margin: 0 auto;
		letter-spacing: 1px;
	}
	.btn{
		width: 610rpx;
		height: 88rpx;
		font-size: 32rpx;
		background-color: #B46628;
	}
</style>
