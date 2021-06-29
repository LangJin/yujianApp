<template>
	<view class="content">
		<view class="top_btns d_flex">
			<view class="item" v-for="(item, index) in itemList" :key="index" @click="itemClick(index)">
				<view class="item_icon">
					<image :src="item.image" mode=""></image>
				</view>
				<view class="item_text">{{ item.text }}</view>
			</view>
		</view>
		<view class="main">
			<view class="items">
				<u-swipe-action btn-width="140" :show="item.show" :options="options" :index="index"
					v-for="(item, index) in list" :key="item.userVO.id" @click="deleteClick(item.userVO.id)"
					@open="deleteOpen">
					<view class="item d_flex flex_betewwen" @click="toChatPage(item.userVO.id)">
						<view class="left d_flex">
							<view class="avater">
								<image v-if="item.userVO.avatarUrl" :src="item.userVO.avatarUrl" mode="">
									<image v-else src="@/static/images/vip/icon_logo.png" mode=""></image>
									<u-badge type="error" :count="item.notReadNum ? item.notReadNum : 0"
										:is-center="true">
									</u-badge>
							</view>
							<view class="info title-wrap">
								<view>{{ item.userVO.nickName }}</view>
								<view class="sub_text">{{item.content}}</view>
							</view>
						</view>
						<view class="right" style="margin-top: 10rpx;">
							{{ item.createTime | timeFrom}}
						</view>
					</view>
					<!-- <view class="item d_flex flex_betewwen" @click="toChatPage(item.id)">
						<view class="left d_flex">
							<view class="avater">
								<image :class="[item.id===1 ? 'image_blur':'']" src="@/static/images/message/avater.png"
									mode=""></image>
								<u-badge type="error" count="7" :is-center="true"></u-badge>
							</view>
							<view class="info">
								<view>看过我的人</view>
								<view class="sub_text">距离你1546m,快去看看是谁...</view>
							</view>
						</view>
						<view class="right">
							3天前
						</view>
					</view> -->
				</u-swipe-action>
			</view>
		</view>
		<u-loadmore v-show="list && list.length > 20" :status="status" @loadmore="loadmore"></u-loadmore>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemList: [{
						id: 1,
						image: require('@/static/images/message/icon_1.png'),
						text: '喜欢'
					},
					{
						id: 2,
						image: require('@/static/images/message/icon_2.png'),
						text: '点赞'
					},
					{
						id: 3,
						image: require('@/static/images/message/icon_3.png'),
						text: '系统'
					},
				],
				list: [],
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				pageNum: 1,
				pageSize: 20,
				totalPageNum: 0,
				status: 'nomore'
			}
		},
		onLoad() {
			this.getChatUserList();
		},
		onShow() {
			let isVip = uni.getStorageSync('isVip') ? uni.getStorageSync('isVip') : undefined;
			if (isVip !== undefined) {
				this.vipShow = isVip === 1 ? false : true;
			}
		},
		onPullDownRefresh() {
			this.pageNum = 1;
			this.getChatUserList();
		},
		onReachBottom() {
			this.loadmore();
		},
		methods: {
			//获取聊天用户列表
			getChatUserList() {
				this.$api.getMessageByUserId(this.pageSize, this.pageNum).then(res => {
					if (res.code == 1) {
						let result = res.data;
						this.totalPageNum = res.pagination.totalPages;
						result.map(function(value) {
							value.show = false;
						})
						if (this.pageNum == 1) {
							this.list = result;
						} else {
							this.list = this.list.concat(result);
						}
					}
					uni.stopPullDownRefresh();
				})
			},
			//删除
			deleteClick(id) {
				this.$api.delUserMessage(id).then(res => {
					if (res.code == 1) {
						this.$u.toast(res.msg);
						this.getChatUserList();
					}
				})

			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			deleteOpen(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if (index != idx) this.list[idx].show = false;
				})
			},
			itemClick(index) {
				//喜欢
				if (index === 0) {
					uni.navigateTo({
						url: './favorite/Favorite'
					})
				} else if (index === 1) { //点赞
					uni.navigateTo({
						url: './giveALike/GiveALike'
					})
				} else { //系统
					uni.navigateTo({
						url: './system/SystemNotice'
					})
				}
			},
			//to聊天页面
			toChatPage(id) {
				// if (id == 1) {
				// 	uni.navigateTo({
				// 		url: './peopleOfSeeMe/PeopleOfSeeMe'
				// 	})
				// } else {
				uni.navigateTo({
					url: `./dialog/DialogBox?id=${id}`
				})
				// }
			},
			//加载更多
			loadmore() {
				if (this.pageNum >= this.totalPageNum) return;
				this.status = 'loading';
				this.pageNum++;
				setTimeout(() => {
					this.getChatUserList();
					if (this.pageNum >= this.totalPageNum) this.status = 'nomore'
					else this.status = 'loading'
				}, 2000)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding-bottom: 30rpx;
	}

	.main {
		padding-bottom: 30rpx;
	}

	.top_btns {
		justify-content: space-around;
		padding: 10rpx 0;

		.item {
			text-align: center;
			font-size: 22rpx;
			color: #666666;
		}

		.item_icon {
			width: 64rpx;
			height: 64rpx;
		}
	}

	.avater {
		image {
			border-radius: 50%;
		}
	}

	.items {
		.item {
			width: 686rpx;
		}
	}
</style>
