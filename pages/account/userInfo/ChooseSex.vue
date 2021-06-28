<template>
	<view class="login">
		<view class="title">
			<view class="app_name">请选择你的性别</view>
			<view class="sub_intro">
				确定性别后不可更改
			</view>
			<view class="cut_line"></view>
		</view>
		<view class="content d_flex">
			<view class="sex_box" @click="changeSex(1)">
				<image v-if="sex === 1" src="@/static/images/user/3.png" mode=""></image>
				<image v-else src="@/static/images/user/4.png" mode=""></image>
				<text>男</text>
			</view>
			<view class="sex_box" @click="changeSex(2)">
				<image v-if="sex === 2" src="@/static/images/user/1.png" mode=""></image>
				<image v-else src="@/static/images/user/2.png" mode=""></image>
				<text>女</text>
			</view>
		</view>
		<common-btn msg="下一步" @toNext="toNext"></common-btn>
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
				userId: undefined,
				sex: 1
			}
		},
		onLoad() {
			let user = uni.getStorageSync('loginUser');
			this.userId = user ? user.id : undefined;
		},
		methods: {
			toNext() {
				let data = {
					id: this.userId,
					gender: this.sex
				};
				this.$api.saveUserInfo(data).then(res => {
					if (res.code == 1) {
						uni.navigateTo({
							url: './UserInfo'
						})
					}
				})
			},
			changeSex(index) {
				if (index !== this.sex) {
					this.sex = index;
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #FAFAFA;
	}
</style>
<style lang="scss" scoped>
	.login {
		padding: 60rpx;
	}

	.content {
		margin-top: 120rpx;
		margin-bottom: 180rpx;
		padding: 0 40rpx;
		justify-content: space-around;
	}

	.sex_box {
		width: 180rpx;
		height: 180rpx;
		text-align: center;
	}
</style>
