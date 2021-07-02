<template>
	<view class="Home">
		<u-navbar :is-back="false" title="">
			<view class="slot-wrap">
				<view class="f_img" @click="showSelectList">
					<image src="@/static/images/home/icon_xiala.png" mode=""></image>
				</view>
				<text>附近</text>
			</view>
			<u-select v-model="selectShow" label-name="name" value-name="id" mode="mutil-column-auto" :list="selectList"
				@confirm="selectConfirm">
			</u-select>
			<view slot="right" class="more" @click="showMenu">
				<u-icon name="arrow-down-fill" color="#FFFFFF" size="22" style="margin-right: 6rpx;"></u-icon>
				{{ sex === 0 ? '全部' : sex === 1 ? '只看女生' : '只看男生' }}
			</view>
		</u-navbar>
		<view class="content">
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="change" inactive-color="#888888"
				active-color="#B46628" bar-width="44" font-size="32"></u-tabs>
			<common-list :userList="userList" :flag="true" :gender="gender" :isVip="isVip" :city="city"></common-list>
			<u-loadmore v-show="userList && userList.length > 20" :status="status" @loadmore="loadmore"></u-loadmore>
		</view>
		<welcome-modal :show="welcomeShow" @close="welcomeClose"></welcome-modal>
		<!-- 选择性别遮罩 -->
		<u-mask :show="sexSelectShow" :mask-click-able="false" :duration="0">
			<view class="warp">
				<view class="rect" @tap.stop>
					<view @click="changeSex(1)">只看女生</view>
					<view @click="changeSex(2)">只看男生</view>
					<view @click="changeSex(0)">查看全部</view>
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	import CommonList from '@/components/list/UserList.vue'
	import CommonModal from '@/components/publishModal/PublishModal.vue'
	import WelcomeModal from '@/components/welcome/Welcome.vue'

	export default {
		components: {
			CommonList,
			CommonModal,
			WelcomeModal
		},
		data() {
			return {
				list: [{
					name: '在线优先',
				}, {
					name: '距离优先',
					// count: 5
				}],
				current: 1,
				selectShow: false,
				selectList: [],
				userList: [],
				pageSize: 20,
				pageNum: 1,
				totalPageNum: 0,
				gender: undefined,
				status: 'nomore',
				welcomeShow: false,
				isVip: undefined,
				sexSelectShow: false,
				sex: 0,
				city: undefined
			}
		},
		onLoad() {
			let user = uni.getStorageSync('loginUser') ? uni.getStorageSync('loginUser') : undefined;
			this.isVip = uni.getStorageSync('isVip') ? Number(uni.getStorageSync('isVip')) : undefined;
			if (user !== undefined) {
				this.gender = user.gender;
				this.sex = user.gender;
			}
			this.init();

			let pages = getCurrentPages();
			let beforePage = pages[pages.length - 2];
			if (beforePage && beforePage.route.indexOf('UserInfo') > 1) {
				this.welcomeShow = true;
			}
		},
		onPullDownRefresh() {
			this.pageNum = 1;
			this.getHomeUserList();
		},
		onReachBottom() {
			this.loadmore();
		},
		onShow() {
			this.city = uni.getStorageSync('city') ? uni.getStorageSync('city') : undefined;
		},
		methods: {
			init() {
				this.getHomeUserList();
				this.getAreaList();
				this.getLocation();
			},
			getLocation() {
				let _self =this;
				uni.getLocation({
					type: 'wgs84',
					geocode: true,
					success: function(res) {
						let params = {
							lat: res.latitude,
							lng: res.longitude
						}
						_self.$api.getAddressLocation(params).then(res => {
							if(res.code == 1){
								console.log(res)
								let city = res.data[0].city;
								this.city = city;
								uni.setStorageSync('city', city);
							}
						})
					},
					fail: function() {
						uni.showToast({
							title: '获取地址失败',
							icon: 'none'
						});
					}
				});

			},
			//获取地区数组
			getAreaList() {
				this.$api.areaList().then(res => {
					if (res.code == 1) {
						this.selectList = res.data;
					}
				})
			},
			//获取首页用户列表
			getHomeUserList() {
				this.$api.homeUserList(this.current, this.pageSize, this.pageNum, this.sex).then(res => {
					if (res.code == 1) {
						if (this.pageNum == 1) {
							this.userList = res.data;
						} else {
							this.userList = this.userList.concat(res.data);
						}
						this.totalPageNum = res.pagination.totalPages;
					}
					uni.stopPullDownRefresh();
				})
			},
			//tab标签改变事件
			change(index) {
				this.current = index;
				this.pageNum = 1;
				this.getHomeUserList();
			},
			//select 多级联动
			showSelectList() {
				this.selectShow = true;
			},
			//多级联动 -- 确定事件
			selectConfirm(e) {
				let city = e[1].label;
				this.city = city;
				uni.setStorageSync('city', city);

				this.$api.userListFlash().then(res => {
					if (res.code == 1) {
						this.getHomeUserList();
					}
				})
			},
			//加载更多
			loadmore() {
				if (this.pageNum >= this.totalPageNum) return;
				this.status = 'loading';
				this.pageNum++;
				setTimeout(() => {
					this.getHomeUserList();
					if (this.pageNum >= this.totalPageNum) this.status = 'nomore'
					else this.status = 'loading'
				}, 2000)
			},
			//关闭欢迎弹窗
			welcomeClose() {
				this.welcomeShow = false;
			},
			//右上角选择
			showMenu() {
				this.sexSelectShow = true;
			},
			//选择查看列表性别
			changeSex(index) {
				this.sex = index;
				this.sexSelectShow = false;
				this.getHomeUserList();
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding-bottom: 30rpx;
	}

	.slot-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		// flex: 1;
		padding: 0 30rpx;
		font-size: 36rpx;
		color: #333333;
	}

	.f_img {
		width: 36rpx;
		height: 36rpx;
		margin-right: 8rpx;
	}

	.more {
		margin-right: 31rpx;
		border: 1px solid;
		color: #FFFFFF;
		font-size: 24rpx;
		background-color: #B46628;
		border-radius: 40rpx;
		padding: 12rpx 20rpx 10rpx 20rpx;
	}

	// .welcome_bg {
	// 	width: 626rpx;
	// 	height: 972rpx;
	// }

	// ::v-deep .u-model {
	// 	position: relative;
	// }

	// .btn {
	// 	width: 506rpx;
	// 	height: 88rpx;
	// 	background-color: #333333;
	// 	color: #F1CAAB;
	// 	position: absolute;
	// 	bottom: 4%;
	// 	left: 10%;
	// }

	// .close_btn {
	// 	width: 44rpx;
	// 	height: 44rpx;
	// 	position: absolute;
	// 	top: 22rpx;
	// 	right: 22rpx;
	// }

	::v-deep .u-select {
		.uni-picker-view-wrapper {
			background: url(../../static/images/login/bg.png) no-repeat left center;
			background-size: 100% 100%;
		}
	}

	.rect {
		position: absolute;
		top: 118rpx;
		right: 32rpx;
		width: 170rpx;
		background-color: #F1CAAB;
		border-radius: 8rpx;
		font-size: 26rpx;
		color: #333333;
		text-align: center;
		line-height: 52rpx;
		padding: 22rpx 0;
	}
</style>
