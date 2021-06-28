<template>
	<view class="content">
		<view class="main">
			<view class="can_withdraw">
				<view>可提现余额</view>
				<view class="cash">¥ <text>0</text> （元）</view>
			</view>
			<u-form :model="form" ref="uForm" :border-bottom="false" :error-type="errortype" label-position="top">
				<u-form-item label="提现金额（元）" prop="money" :border-bottom="false">
					<u-input v-model="form.money" type="number" placeholder="请输入提现金额" :customStyle="customStyle"
						:clearable="clearable">
					</u-input>
				</u-form-item>
				<u-form-item label="支付宝账号" prop="aliNum" :border-bottom="false">
					<u-input v-model="form.aliNum" placeholder="请输入支付宝账号" :customStyle="customStyle"
						:clearable="clearable" />
				</u-form-item>
				<u-form-item label="姓名" prop="userName" :border-bottom="false">
					<u-input v-model="form.userName" placeholder="请输入姓名" :customStyle="customStyle"
						:clearable="clearable" />
				</u-form-item>
				<u-form-item label="身份证号" prop="idCardNum" :border-bottom="false">
					<u-input v-model="form.idCardNum" placeholder="请输入该姓名的身份证号" :customStyle="customStyle"
						:clearable="clearable" />
				</u-form-item>
				<view class="idCard_note">身份证号填写错误将无法到帐，请认真核实</view>
			</u-form>
			<common-btn msg="立即提现" @toNext="toNext"></common-btn>
		</view>
		<view class="foot_note">
			<view>依据缴税政策每次提现将会收取您7%的税费</view>
			<view class="note_detail">点击提现即表示您同意并遵守<text>《共享经济合作伙伴协议》</text></view>
		</view>
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
				form: {},
				rules: {
					money: [{
						required: true,
						message: '请输入提现金额',
						trigger: ['blur']
					}, {
						validator: (rule, value, callback) => {
							return this.$u.test.amount(value);
						},
						message: '提现金额为正数且最多两位小数',
						trigger: ['blur'],
					}],
					aliNum: [{
							required: true,
							message: '请输入支付宝账号',
							trigger: ['blur']
						},
						{
							validator: (rule, value, callback) => {
								return this.$u.test.mobile(value);
							},
							message: '支付宝账号格式不正确',
							trigger: ['blur'],
						}
					],
					userName: [{
						required: true,
						message: '请输入姓名',
						trigger: ['blur']
					}],
					idCardNum: [{
							required: true,
							message: '请输入身份证号',
							trigger: ['blur']
						},
						{
							validator: (rule, value, callback) => {
								return this.$u.test.idCard(value);
							},
							message: '身份证号格式不正确',
							trigger: ['blur'],
						}
					],
				},
				clearable: false,
				errortype: ['toast'],
				customStyle: {
					background: '#FFFFFF',
					boxShadow: '0px 3rpx 6rpx rgba(0, 0, 0, 0.16)',
					borderRadius: '60rpx',
					height: '88rpx',
					lineHeight: '88rpx'
				},
				user: null
			}
		},
		onNavigationBarButtonTap(option) {
			if (option.index == 0) {
				uni.navigateTo({
					url: '../withdrawRecords/WithdrawCashRecords'
				})
			}
		},
		onLoad() {
			this.user = uni.getStorageSync('loginUser') ? uni.getStorageSync('loginUser') : null;
		},
		methods: {
			//提现
			toNext() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.form.userId = this.user.id;
						this.$api.saveUserWithdrawalRecord(this.form).then(res => {
							if (res.code == 1) {
								this.$u.toast(res.msg);
								// this.$refs.r
							}
						})
					}
				})
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss" scoped>
	.can_withdraw {
		width: 686rpx;
		height: 427rpx;
		background: url(@/static/images/invite/bg_4.png) no-repeat;
		background-size: 100% 100%;
		text-align: center;
		padding-top: 242rpx;
		font-size: 32rpx;
		color: #FFFFFF;

		.cash {
			width: 408rpx;
			height: 90rpx;
			background-color: #FFE14C;
			font-size: 24rpx;
			color: #E64322;
			line-height: 90rpx;
			margin: 21rpx auto;
			border-radius: 8rpx;

			text {
				font-size: 42rpx;
				margin-left: 8rpx;
			}
		}
	}

	/deep/.u-input__input {
		padding-left: 32rpx !important;
	}

	/deep/.btn {
		width: 686rpx;
		margin-top: 40rpx;
	}

	.idCard_note {
		color: #D42A27;
		font-size: 22rpx;
	}

	.foot_note {
		text-align: center;
		color: #B2B2B2;
		font-size: 22rpx;
		margin-top: 30rpx;
		padding-bottom: 48rpx;

		.note_detail {
			margin-top: 19rpx;

			text {
				color: #333333;
			}
		}
	}
</style>
