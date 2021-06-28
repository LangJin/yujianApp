<template>
	<u-modal v-model="show" width="626" class="c_modal" :show-title="false" :show-confirm-button="false">
		<view class="PaymentWay">
			<view style="height: 24rpx;"></view>
			<view class="pay_con">
				<view class="con_title">
					需支付金额（元）
				</view>
				<view class="con_cash">
					￥{{totalMoney}}
				</view>
			</view>
			<view class="pay_ways">
				<view class="pay_way_title">
					请选择支付方式
				</view>
				<view class="pay_con">
					<u-radio-group v-model="payIndex" size="50" icon-size="30" active-color="#B46628">
						<view class="pay_item">
							<view class="pay_icon">
								<image src="@/static/images/vip/alipay.png" mode=""></image>
							</view>
							<view class="pay_text">
								<view class="par_text">
									支付宝
									<text class="recommend">推荐</text>
								</view>
								<view class="sub_text">
									数亿用户都在用，安全可托付
								</view>
							</view>
							<view class="choose_icon">
								<u-radio name="2"></u-radio>
							</view>
						</view>
						<view class="pay_item">
							<view class="pay_icon">
								<image src="@/static/images/vip/weChat.png" mode=""></image>
							</view>
							<view class="pay_text">
								<view class="par_text">
									微信
								</view>
								<view class="sub_text">
									数亿用户都在用，安全可托付
								</view>
							</view>
							<view class="choose_icon">
								<u-radio name="1"></u-radio>
							</view>
						</view>
					</u-radio-group>
				</view>
			</view>
			<common-btn msg="立即支付" @toNext="toNext"></common-btn>
		</view>
	</u-modal>
</template>

<script>
	import CommonBtn from '@/components/button/btn.vue'
	export default {
		props: {
			show: Boolean,
			totalMoney: String,
		},
		components: {
			CommonBtn
		},
		data() {
			return {
				payIndex: '1'
			}
		},
		onLoad() {
		},
		methods: {
			toNext() {
				this.$emit("toNext", this.payIndex);
				
				// let _self = this;
				// this.params.type = this.payIndex;
				// // 微信支付
				// if (Number(this.payIndex) == 1) {
				// 	this.$u.toast('暂不支持微信支付！');
				// 	return false;

				// 	// this.$api.selectReport(this.params).then(res => {
				// 	// 	console.log(res);
				// 	// 	uni.requestPayment({
				// 	// 		provider: 'wxpay',
				// 	// 		orderInfo: res.data[0],
				// 	// 		success(res) {
				// 	// 			console.log('success:' + JSON.stringify(res));
				// 	// 		},
				// 	// 		fail(err) {
				// 	// 			console.log('fail:' + JSON.stringify(err));
				// 	// 		}
				// 	// 	})
				// 	// });
				// } else {
				// 	//支付宝支付
				// 	this.$u.toast('暂不支持！');
				// 	return false;
				// 	// this.$api.selectReport(this.params).then(res => {
				// 	// 	console.log(res.data[0].orderId);
				// 	// 	this.orderId = res.data[0].orderId; //订单编号
				// 	// 	uni.requestPayment({
				// 	// 		provider: 'alipay',
				// 	// 		orderInfo: res.data[0].aliStr,
				// 	// 		success(res) {
				// 	// 			console.log('success:' + JSON.stringify(res));
				// 	// 			_self.$u.route('/pages/business/Payment/PaySuccess', {
				// 	// 				orderId: _self.orderId
				// 	// 			});
				// 	// 		},
				// 	// 		fail(err) {
				// 	// 			console.log('fail:' + JSON.stringify(err));
				// 	// 			_self.$u.route('/pages/business/Payment/PayFail');
				// 	// 		}
				// 	// 	})
				// 	// });
				// }
			}
		},
	}
</script>

<style lang="scss" scoped>
	.PaymentWay {
		letter-spacing: 2rpx;
		padding-bottom: 60rpx;

		.pay_con {
			background-color: #FFFFFF;
			padding: 20rpx 30rpx;
			text-align: center;

			.con_title {
				color: #666666;
				font-size: 24rpx;
				padding-left: 10rpx;
				margin: 30rpx 0rpx 24rpx 0rpx;
			}

			.con_cash {
				color: #333333;
				font-size: 60rpx;
				margin-bottom: 40rpx;
			}
		}

		.pay_ways {
			margin-bottom: 100rpx;

			.pay_con {
				padding: 0rpx 30rpx;
			}

			.u-radio-group {
				width: 100%;
			}

			.pay_way_title {
				color: #666666;
				font-size: 24rpx;
				margin: 36rpx 0rpx 14rpx 31rpx;
			}

			.pay_item {
				display: flex;
				text-align: left;
				padding: 20rpx 0rpx;
				align-items: center;
				width: 100%;

				.pay_icon {
					width: 80rpx;
					height: 80rpx;
					margin-right: 16rpx;
					flex-shrink: 0;
				}

				.pay_text {
					flex-shrink: 0;

					.par_text {
						color: #333333;
						font-size: 30rpx;

						.recommend {
							color: #FFFFFF;
							font-size: 20rpx;
							padding: 3rpx 6rpx;
							margin-left: 16rpx;
							border-radius: 5rpx;
							background-color: #00A0E8;
						}
					}

					.sub_text {
						color: #999999;
						font-size: 24rpx;
						margin-top: 5rpx;
					}
				}

				.choose_icon {
					width: 50rpx;
					margin-left: 80rpx;
					flex-shrink: 0;
				}
			}
		}

		/deep/.btn {
			width: 520rpx;
		}
	}
</style>
