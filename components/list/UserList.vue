<template>
	<view class="l_box">
		<view class="l_item d_flex" v-for="(item, index) in userList" :key="index" @click="toPersonalPage(item.id)">
			<view class="item_left">
				<image :class="item.gender === gender ? 'image_blur': ''" v-if="item.avatarUrl" :src="item.avatarUrl"
					mode=""></image>
				<image :class="item.gender === gender ? 'image_blur': ''" v-else src="@/static/images/home/logo.png"
					mode=""></image>
			</view>
			<view class="item_right">
				<view class="r_top d_flex flex_betewwen">
					<view class="top_l d_flex">
						<view>{{ item.nickName }}</view> 
						<view class="top_icon_vip" v-if="item.isVip === 1">
							<image src="@/static/images/home/icon_vip.png" mode=""></image>
						</view>
						<view class="top_icon_renzheng">
							<image src="@/static/images/home/renzheng.png" mode=""></image>
						</view>
					</view>
					<view v-if="flag" class="top_r">{{ item.isOnLine === 1 ? '在线' : '离线'}}</view>
					<view v-else class="top_time">{{ item.createTime }}</view>
				</view>
				<view class="r_center">
					<view class="map d_flex">
						<view class="c_icon">
							<image src="@/static/images/home/icon_zuobiao.png" mode=""></image>
						</view>
						<view class="b_label">
							{{ item.city ? item.city : '成都市' }}
						</view>
						<view class="b_label" v-if="item.distance">
							{{ item.distance }}km
						</view>
					</view>
					<view class="info d_flex">
						<view class="c_icon">
							<image src="@/static/images/home/icon_ziliao.png" mode=""></image>
						</view>
						<view class="b_label second_back_color">
							{{item.gender === 0 ? '未知' : item.gender === 1 ? '男': '女'}} · {{ item.age }}岁
						</view>

						<view class="b_label second_back_color" v-if="item.height">
							{{ item.height }}
						</view>
						<view class="b_label second_back_color" v-if="item.weight">
							{{ item.weight }}
						</view>
					</view>
					<view class="occupation d_flex">
						<view class="c_icon">
							<image src="@/static/images/home/icon_gongzuo.png" mode=""></image>
						</view>
						<view class="b_label third_back_color" v-if="item.occupation">
							{{ item.occupation }}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			flag: Boolean,
			gender: Number,
			userList: {
				type: Array,
				default: () => {}
			}
		},
		data() {
			return {

			}
		},
		methods: {
			//去个人主页
			toPersonalPage(userId) {
				uni.navigateTo({
					url: `/pages/index/personal/Personal?id=${userId}`,

				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.l_box {
		.l_item {
			margin: 69rpx 35rpx;
		}

		.item_left {
			width: 158rpx;
			height: 254rpx;
			margin-right: 24rpx;
			flex-shrink: 0;

			image {
				border-radius: 8rpx;
			}
		}

		.item_right {
			width: 500rpx;

			.top_l {
				color: #333333;
				font-size: 36rpx;
				font-weight: bold;
				align-items: center;

				.top_icon_vip {
					width: 32rpx;
					height: 32rpx;
					margin-left: 20rpx;
					image{
						margin-bottom: 20rpx;
					}
				}

				.top_icon_renzheng {
					width: 156rpx;
					height: 36rpx;
					margin-left: 20rpx;
				}
			}

			.top_time {
				color: #999999;
				font-size: 24rpx;
			}
		}
	}

	.r_center {
		margin-top: 30rpx;
		color: #888888;
		font-size: 24rpx;

		.c_icon {
			width: 32rpx;
			height: 32rpx;
			margin-right: 20rpx;
		}

		.b_label {
			padding: 10rpx;
			margin-right: 30rpx;
			background: linear-gradient(180deg, #FEF5D8 0%, #FFFFFF 100%);
			border-radius: 8rpx;
		}

		.info {
			margin: 20rpx 0;
		}

		.second_back_color {
			background: linear-gradient(180deg, #CDF5ED 0%, #FFFFFF 100%);
		}

		.third_back_color {
			background: linear-gradient(180deg, #FADCD7 0%, #FFFFFF 100%);
		}
	}
</style>
