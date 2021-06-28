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
		</u-navbar>
		<view class="content">
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="change" inactive-color="#888888"
				active-color="#B46628" bar-width="44" font-size="32"></u-tabs>
			<common-list :userList="userList" :flag="true" :gender="gender"></common-list>
			<u-loadmore v-show="userList && userList.length > 20" :status="status" @loadmore="loadmore"></u-loadmore>
		</view>
		<welcome-modal :show="welcomeShow" @close="welcomeClose"></welcome-modal>
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
				current: 0,
				selectShow: false,
				selectList: [],
				userList: [],
				pageSize: 20,
				pageNum: 1,
				totalPageNum: 0,
				gender: undefined,
				status: 'nomore',
				welcomeShow: false
			}
		},
		onLoad() {
			let user = uni.getStorageSync('loginUser') ? uni.getStorageSync('loginUser') : undefined;
			if (user !== undefined) {
				this.gender = user.gender;
			}
			this.init();
			
			let pages = getCurrentPages();
			let beforePage = pages[pages.length - 2];
			if(beforePage && beforePage.route.indexOf('UserInfo') > 1){
				this.welcomeShow = true;
			}
		},
		onPullDownRefresh() {
			this.getHomeUserList();
		},
		onReachBottom() {
			this.loadmore();
		},
		methods: {
			init() {
				this.getHomeUserList();
				this.getAreaList();
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
				this.$api.homeUserList(this.current, this.pageSize, this.pageNum).then(res => {
					if (res.code == 1) {
						if(this.pageNum == 1){
							this.userList = res.data;
						}else{
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
				console.log(e);
			},
			//加载更多
			loadmore(){
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
			welcomeClose(){
				this.welcomeShow = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		padding-bottom: 30rpx;
	}
	.slot-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
		padding: 0 30rpx;
		font-size: 36rpx;
		color: #333333;
	}

	.f_img {
		width: 36rpx;
		height: 36rpx;
		margin-right: 8rpx;
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
</style>
