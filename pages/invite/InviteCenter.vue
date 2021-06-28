<template>
	<view class="content">
		<view class="items">
			<view class="item">
				<view class="left d_flex">
					<view class="avater">
						<image v-if="info.avatarUrl" :src="info.avatarUrl" mode=""></image>
						<image v-else src="@/static/images/vip/icon_logo.png" mode=""></image>
					</view>
					<view class="info">
						<view>{{ info.nickName }}</view>
						<view class="sub_text">{{ info.gender === 1 ? '男' : info.gender === 2 ? '女' : '未知' }} · {{ info.age }}岁</view>
					</view>
				</view>
			</view>
			<view class="balance d_flex flex_betewwen">
				<u-table border-color="#E5E5E5" font-size="24" color="#888888"
					:style="{ 'width': '528rpx', 'flex-shrink': '0'}">
					<u-tr :style="{ height: '66rpx' }">
						<u-td>累计获得(元)</u-td>
						<u-td>累计邀请(人)</u-td>
						<u-td>可提现(元)</u-td>
					</u-tr>
					<u-tr class="bal_data">
						<u-td>{{ info.invitationMoney? info.invitationMoney: '0.00' }}</u-td>
						<u-td>{{ info.invitationNum }}</u-td>
						<u-td>{{ info.canUseMoney }}</u-td>
					</u-tr>
				</u-table>
				<u-button type="primary" :custom-style="customStyle" class="withdraw_btn" 
					hover-class="none" @click="toWithdraw">提<br /> 现</u-button>
			</view>
		</view>
		<view class="invite_img">
			<image src="@/static/images/invite/bg1.png" mode=""></image>
		</view>
		<view class="items reward_rules">
			<view class="h4">奖励规则</view>
			<view class="rules">
				<view>1.每通过链接二维码邀请一位用户 <text>首次充值VIP</text> 时即可获得相应奖励;</view>
				<view>2.被邀请用户首次充值会员时,前往<text>公众号"遇见App"</text>可享受八折优惠;</view>
				<view>3.邀请奖励每 <text>满200元</text> 即可提现, 3个工作日内到账。</view>
			</view>
			<u-table border-color="#E5E5E5" font-size="22" color="#888888" class="award_table">
				<u-tr>
					<u-td>会员类型</u-td>
					<u-td>月会员</u-td>
					<u-td>季会员</u-td>
					<u-td>年会员</u-td>
				</u-tr>
				<u-tr class="award_data">
					<u-td class="amount_bonus">奖励金额</u-td>
					<u-td>110 元</u-td>
					<u-td>250 元</u-td>
					<u-td>350 元</u-td>
				</u-tr>
			</u-table>
		</view>
		<view class="items invite_way">
			<view class="h4 d_flex">
				<view>邀请方法</view>
				<view class="view_qrcode" @click="toQRcode">查看二维码</view>
			</view>
			<view class="way d_flex">
				<view class="step1">
					<view class="step_icon">
						<image src="@/static/images/invite/icon_1.png" mode=""></image>
					</view>
					<view class="step_text">
						保存二维码<br />
						或链接
					</view>
				</view>
				<view class="next_icon">
					<image src="@/static/images/invite/icon_5.png" mode=""></image>
				</view>
				<view class="step2">
					<view class="step_icon">
						<image src="@/static/images/invite/icon_2.png" mode=""></image>
					</view>
					<view class="step_text">
						分享给朋友<br />
						或群
					</view>
				</view>
				<view class="next_icon">
					<image src="@/static/images/invite/icon_5.png" mode=""></image>
				</view>
				<view class="step3">
					<view class="step_icon">
						<image src="@/static/images/invite/icon_3.png" mode=""></image>
					</view>
					<view class="step_text">
						对方下载充值<br />
						即可领取现金
					</view>
				</view>
			</view>
		</view>
		<view class="qrcode_img" @click="toQRcode">
			<image src="@/static/images/invite/bg3.png" mode=""></image>
		</view>
		<common-btn msg="复制邀请链接到剪切板" @toNext="toNext"></common-btn>
	</view>
</template>

<script>
	import CommonBtn from '@/components/button/btn.vue'
	
	export default {
		components: {
			CommonBtn
		},
		data() {
			return {
				customStyle: {
					width: '100rpx',
					height: '143rpx',
					backgroundColor: '#F6A349',
					marginRight: '0',
					fontSize: '28rpx',
					lineHeight: '48rpx'
				}, 
				info: {}
			}
		},
		onLoad() {
			this.info = uni.getStorageSync('info');
		},
		methods: {
			//复制邀请链接到剪切板
			toNext(){
				
			},
			//提现
			toWithdraw(){
				uni.navigateTo({
					url: './withdraw/WithdrawDeposit'
				})
			},
			//二维码页面
			toQRcode(){
				uni.navigateTo({
					url: './shareQRCode/QRCode'
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 20rpx 32rpx 50rpx 32rpx;
	}

	.items {
		background-color: #FFFFFF;
		box-shadow: 0px 3rpx 6rpx rgba(0, 0, 0, 0.16);
		border-radius: 8rpx;
		padding: 30rpx 20rpx;

		.item {
			margin: 0;
			margin-bottom: 30rpx;
		}
	}

	.bal_data {
		.u-td {
			height: 78rpx;
			color: #333333 !important;
			font-size: 36rpx !important;
		}
	}

	.invite_img {
		width: 686rpx;
		height: 166rpx;
		margin: 20rpx 0;
	}

	.reward_rules {
		color: #333333;
		font-size: 24rpx;
	}

	.h4 {
		padding-bottom: 20rpx;
		border-bottom: 1px solid #E5E5E5;

		.view_qrcode {
			margin-left: 40rpx;
			color: #888888;
			opacity: 0.8;
		}
	}

	.rules {
		margin: 30rpx 0 20rpx 0;
		color: #666666;
		font-size: 20rpx;
		line-height: 28rpx;

		view {
			margin-bottom: 10rpx;
		}

		text {
			color: #B46628;
		}
	}

	.award_table {
		.u-tr {
			height: 64rpx;
		}
	}

	.award_data {
		.u-td:not(:first-child) {
			font-size: 24rpx !important;
			color: #333333 !important;
		}
	}

	.invite_way {
		margin: 20rpx 0;
		font-size: 24rpx;
	}

	.way {
		margin-top: 30rpx;
		justify-content: space-around;
		text-align: center;

		.step_icon {
			width: 70rpx;
			height: 70rpx;
			margin: 0 auto;
			margin-bottom: 10rpx;
		}

		.step_text {
			color: #B46628;
			font-size: 22rpx;
		}
	}

	.next_icon {
		width: 44rpx;
		height: 44rpx;
	}
	.qrcode_img{
		width: 100%;
		height: 117rpx;
		margin-bottom: 22rpx;
	}
	::v-deep .btn{
		width: 380rpx;
		height: 68rpx;
		background-color: #FFFFFF;
		border: 1px solid #FB8A30;
		color: #FB8A30;
		font-size: 28rpx;
		margin-bottom: 20rpx;
	}
</style>
