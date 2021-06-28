<template>
	<view class="content">
		<u-tabs :list="list" :is-scroll="false" :current="current" @change="change" inactive-color="#B2B2B2"
			active-color="#B46628" bar-width="80" bar-height="4" class="tabs_style"></u-tabs>
		<view v-if="false">
			<view class="pay_records d_flex flex_betewwen" v-for="index in 4" :key="index">
				<view class="left d_flex">
					<view class="pay_icon">
						<image v-if="index === 1 || index === 3" src="@/static/images/vip/icon-1.png" mode=""></image>
						<image v-else src="@/static/images/vip/icon-2.png" mode=""></image>
					</view>
					<view class="info">
						<view>充值成功</view>
						<view class="time">2021-05-10</view>
					</view>
				</view>
				<view class="right" :class="[index === 3 ? 'right_fail': '']">
					+207.00元
				</view>
			</view>
		</view>
		<common-empty v-else msg="暂无记录"></common-empty>
	</view>
</template>

<script>
	import CommonEmpty from '@/components/empty/Empty.vue'
	export default {
		components: {
			CommonEmpty
		},
		data() {
			return {
				list: [{
					name: '充值记录',
				}, {
					name: '消费记录',
				}],
				current: 0,
			}
		},
		methods: {
			//tab标签改变事件
			change(index) {
				this.current = index;
			},
		},
	}
</script>

<style lang="scss" scoped>
	.tabs_style {
		padding: 10rpx 0;
	}

	.pay_records {
		border-top: 1px solid #CCCCCC;
		padding: 30rpx 32rpx;
	}

	.pay_records:last-child {
		border-bottom: 1px solid #CCCCCC;
	}

	.pay_icon {
		width: 60rpx;
		height: 60rpx;
		margin-right: 30rpx;
	}

	.info,
	.right {
		font-size: 32rpx;
		color: #666666;
	}

	.time {
		color: #B2B2B2;
		font-size: 24rpx;
		margin-top: 12rpx;
	}

	.right_fail {
		color: #B2B2B2;
	}
</style>
