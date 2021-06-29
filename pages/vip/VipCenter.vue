<template>
	<view class="vipCenter">
		<u-navbar back-icon-color="#FFFFFF" title="VIP中心" title-color="#F1CAAB" title-size="36" :background="background"
			:border-bottom="false">
			<view slot="right" class="right_btn" @click="toPayRecords">记录</view>
		</u-navbar>
		<view class="content">
			<view class="vip_card" v-if="info.isVip === 2">
				<image src="@/static/images/vip/bg.png" mode=""></image>
			</view>
			<view v-else class="already_vip_card">
				<view class="card_info d_flex">
					<view class="avater">
						<image v-if="info.avatarUrl" :src="info.avatarUrl" mode=""></image>
						<image v-else src="@/static/images/vip/icon_logo.png" mode=""></image>
					</view>
					<view class="info">
						<view class="info_1">{{ info.nickName }}</view>
						<view class="info_2 d_flex">
							<view class="in_icon">
								<image src="@/static/images/home/icon_vip.png" mode=""></image>
							</view>
							<text>{{ info.vipEndTime | date('yyyy-mm-dd') }} 到期</text>
						</view>
					</view>
				</view>
				<view class="expiration_date">距离会员到期还有 <text>{{info.vipDays}}</text> 天</view>
			</view>
			<view class="card_bg">
				<view class="h2">开通会员畅享海量内容</view>
				<view class="sub_h4">全站海量内容尽享</view>
				<scroll-view scroll-x="true" class="scroll-view-x" scroll-with-animation="true">
					<view class="card_box d_flex">
						<view :class="['card-layout', value === index ? 'active-card-layout' : '']"
							v-for="(item, index) in cardList" :key="item.id" @click="payCardType(index)">
							<view class="top_icon">
								<image src="@/static/images/vip/icon_1.png" mode=""></image>
							</view>
							<view class="card_date" :class="value === index ? 'active_color': ''">{{item.dicName}}
							</view>
							<view class="pay_cash d_flex" :class="value === index ? 'active_pay_cash': ''">
								￥<view class="cash">{{item.dicValue}}</view>
							</view>
							<view class="old_cash">{{item.oldPrice}}/{{item.day}}天</view>
							<view :class="value === index ? 'active_cash': 'cash_day'">
								≈<text>{{item.priceOfDay}}</text>元/天</view>
						</view>
					</view>
				</scroll-view>
				<view class="pay_note">购买即表示同意《会员服务协议》</view>
			</view>
			<view class="vip_privilege" v-show="info.isVip === 1">VIP特权</view>
			<view class="items d_flex flex_betewwen">
				<view class="item" v-for="(item, index) in itemList" :key="index">
					<view class="item_icon">
						<image :src="item.image" mode=""></image>
					</view>
					<view class="item_text">{{item.text}}</view>
					<view class="item_sub_text">{{item.subText}}</view>
				</view>
			</view>
		</view>

		<!-- 支付弹窗 -->
		<payment-way :show="paymentShow" :totalMoney="totalMoney" @toNext="handlePay" @close="handleClose">
		</payment-way>

		<!-- 支付成功 -->
		<success-modal :show="sucessShow" :info="info" msg="马上享受会员服务" @close="successClose"></success-modal>

		<!-- 支付失败 -->
		<fail-modal :show="failShow" @close="failClose"></fail-modal>
	</view>
</template>

<script>
	import CommonBtn from '@/components/button/btn.vue'
	import SuccessModal from '@/components/payModal/SuccessMask.vue'
	import FailModal from '@/components/payModal/FailModal.vue'
	import PaymentWay from '@/components/payModal/PaymentWay.vue'
	import {
		WXPayApp
	} from '@/utils/pay.js'

	export default {
		components: {
			CommonBtn,
			SuccessModal,
			FailModal,
			PaymentWay
		},
		data() {
			return {
				background: {
					background: 'rgba(255, 255, 255, 0)'
				},
				value: 0,
				cardList: [{
						id: 1,
						day: 30,
						price: 207,
						oldPrice: 218,
						priceOfDay: 6.67
					},
					{
						id: 2,
						day: 90,
						price: 663,
						oldPrice: 698,
						priceOfDay: 3.56
					},
					{
						id: 3,
						day: 180,
						price: 1207,
						oldPrice: 1218,
						priceOfDay: 3.35
					},
				],
				itemList: [{
					id: 1,
					image: require('@/static/images/vip/icon_2.png'),
					text: '解锁微信',
					subText: '每日10个'
				}, {
					id: 2,
					image: require('@/static/images/vip/icon_3.png'),
					text: '每天畅聊',
					subText: '每日10个'
				}, {
					id: 3,
					image: require('@/static/images/vip/icon_4.png'),
					text: '阅读即焚',
					subText: '时间更长'
				}, {
					id: 4,
					image: require('@/static/images/vip/icon_5.png'),
					text: '尊贵身份',
					subText: '专属标志'
				}, {
					id: 5,
					image: require('@/static/images/vip/icon_6.png'),
					text: '个人身份',
					subText: '安全保密'
				}, {
					id: 6,
					image: require('@/static/images/vip/icon_7.png'),
					text: '隐身模式',
					subText: '保护隐私'
				}, {
					id: 7,
					image: require('@/static/images/vip/icon_8.png'),
					text: '每日动态',
					subText: '每天一条'
				}, {
					id: 8,
					image: require('@/static/images/vip/icon_9.png'),
					text: '更多特权',
					subText: '敬请期待'
				}],
				totalMoney: '0.00',
				sucessShow: false,
				failShow: false,
				info: {},
				paymentShow: false,
				params: {},
			}
		},
		onPageScroll(object) {
			if (object.scrollTop > 50) {
				this.background = {
					background: '#282A37'
				}
			} else {
				this.background = {
					background: 'rgba(0, 0, 0, 0)'
				}
			}
		},
		onLoad() {
			this.getVipPrice();
			this.getUserInfo();
		},
		methods: {
			getUserInfo() {
				this.$api.getUserInfo().then(res => {
					if (res.code == 1) {
						let data = res.data[0];
						this.info = data;
						uni.setStorageSync('isVip', data.isVip);
					}
				})
			},
			getVipPrice() {
				this.$api.getVipPrice(1001).then(res => {
					if (res.code == 1) {
						this.cardList = res.data;
						this.totalMoney = this.cardList[0].dicValue;
					}
				})
			},
			//充值记录
			toPayRecords() {
				uni.navigateTo({
					url: './rechargeRecord/RecordList'
				})
			},
			//选择会员卡类型
			payCardType(index) {
				this.value = index;
				this.totalMoney = this.cardList[index].dicValue;
				this.paymentShow = true;
			},
			//支付弹窗  支付
			handlePay(payIndex) {
				let _self = this;
				this.params.money = this.totalMoney;
				// 微信支付
				if (Number(payIndex) == 1) {
					this.$api.createOrder(this.params).then(res => {
						this.paymentShow = false;
						WXPayApp(res.data[0]).then(res => {
							_self.sucessShow = true;
							_self.getUserInfo();
						}).catch(e => {
							_self.failShow = true;
						})
					});
				} else {
					//支付宝支付
					this.$u.toast('暂不支持！');
					return false;
				}
			},
			//支付弹窗  关闭
			handleClose() {
				this.paymentShow = false;
			},
			//支付成功弹窗
			successClose() {
				this.sucessShow = false;
			},
			//支付失败弹窗
			failClose() {
				this.failShow = false;
			}
		}
	}
</script>
<style>
	page {
		background-color: #282A37;
	}
</style>
<style lang="scss" scoped>
	@import '@/assets/vip.scss';
</style>
