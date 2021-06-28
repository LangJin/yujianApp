<template>
	<view class="content">
		<view v-if="recordList&&recordList.length">
			<view class="pay_records d_flex flex_betewwen" v-for="(item, index) in recordList" :key="index">
				<view class="left d_flex">
					<view class="pay_icon">
						<image src="@/static/images/vip/icon-2.png" mode=""></image>
					</view>
					<view class="info">
						<view>{{ item.status === 1 ? '申请中' : item.status === 2 ? '申请通过' : '申请失败' }}</view>
						<view class="time">2021-05-10</view>
					</view>
				</view>
				<view class="right" :class="[index === 3 ? 'right_fail': '']">
					+{{ item.money }}元
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
				recordList: [],
				pageSize: 20,
				pageNum: 1
			}
		},
		onLoad() {
			this.getUserWithdrawRecord();
		},
		methods: {
			getUserWithdrawRecord() {
				this.$api.userWithdrawalRecordList(this.pageSize, this.pageNum).then(res => {
					if (res.code == 1) {
						this.recordList = res.data;
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
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
