<template>
	<view class="content">
		<view class="title">
			请选择举报原因
		</view>
		<u-cell-group>
			<u-cell-item title="恶意欺诈" @click="toChooseType(1)"></u-cell-item>
			<u-cell-item title="广告骚扰" @click="toChooseType(2)"></u-cell-item>
			<u-cell-item title="色情淫秽" @click="toChooseType(3)"></u-cell-item>
			<u-cell-item title="资料虚假" @click="toChooseType(4)"></u-cell-item>
			<u-cell-item title="恶意辱骂" @click="toChooseType(5)"></u-cell-item>
			<u-cell-item title="其他" @click="toChooseType(6)"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			toChooseType(index) {
				let pages = getCurrentPages();
				let beforePage = pages[pages.length - 2];
				
				if (index === 1)
					beforePage.$vm.typeValue = '恶意欺诈';
				else if (index === 2)
					beforePage.$vm.typeValue = '广告骚扰';
				else if (index === 3)
					beforePage.$vm.typeValue = '色情淫秽';
				else if (index === 4)
					beforePage.$vm.typeValue = '资料虚假';
				else if (index === 5)
					beforePage.$vm.typeValue = '恶意辱骂';
				else if (index === 6)
					beforePage.$vm.typeValue = '其他';
				
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		height: 68rpx;
		line-height: 68rpx;
		background-color: #F4F4F4;
		color: #B2B2B2;
		font-size: 28rpx;
		padding-left: 32rpx;
	}

	.u-cell {
		padding: 20rpx 32rpx;
	}
</style>
