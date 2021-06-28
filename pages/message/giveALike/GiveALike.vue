<template>
	<view class="content">
		<u-navbar :background="background" :border-bottom="false">
			<view class="slot-wrap">
				<u-tabs class="c_tabs" :list="list" :is-scroll="false" font-size="36" :current="current"
					@change="change" inactive-color="#888888" active-color="#B46628" bar-width="80"></u-tabs>
			</view>
		</u-navbar>
		<view v-if="userList&&userList.length > 0" class="main">
			<view class="items">
				<view class="item" v-for="(item, index) in userList" :key="index">
					<view class="d_flex flex_betewwen" style="align-items: flex-start;">
						<view class="left d_flex">
							<view class="avater">
								<image v-if="item.avatarUrl" :src="item.avatarUrl" mode=""></image>
								<image v-else src="@/static/images/vip/icon_logo.png" mode=""></image>
							</view>
							<view class="info">
								<view>{{ item.nickName }}</view>
								<view class="sub_text">{{item.gender === 0 ? '未知' : item.gender === 1 ? '男': '女'}} ·
									{{ item.age }}岁 | {{ item.occupation }}</view>
							</view>
						</view>
						<view class="right" style="margin-top: 10rpx;">
							{{ item.dynamicVO.createTime | timeFrom }}
						</view>
					</view>
					<view class="details">
						<view class="detail">
							<view class="de_content d_flex">
								<view class="de_img">
									<image v-if="item.dynamicVO.photos" :src="item.dynamicVO.photos[0]" mode=""></image>
									<image v-else src="@/static/images/mine/touxiang.png" mode=""></image>
								</view>
								<view class="de_text">{{ item.dynamicVO.content }}</view>
							</view>
							<view class="like d_flex">
								<view class="like_icon">
									<image src="@/static/images/home/like.png" mode=""
										@click="cancelLike(item.dynamicVO.id)"></image>
								</view>
								<view class="like_text">{{ likeText }}</view>
							</view>
						</view>
						<view class="line"></view>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<common-empty :msg="msg" :subMsg="subMsg"></common-empty>
		</view>
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
				background: {
					background: '#FFFFFF'
				},
				list: [{
					name: 'Ta赞了我',
				}, {
					name: '我赞了Ta',
				}],
				current: 0,
				userList: [],
				msg: '您还没有人赞你',
				subMsg: '快去发布动态，让人点赞吧~',
				likeText: '她赞了你的动态',
				type: 2, //1我赞的 2赞我的
				pageSize: 20,
				pageNum: 1,
				total: 0
			}
		},
		onLoad() {
			this.getUserThumbsUpList();
		},
		methods: {
			//获取点赞列表
			getUserThumbsUpList() {
				this.$api.userThumbsUpList(this.type, this.pageSize, this.pageNum).then(res => {
					if (res.code == 1) {
						this.userList = res.data;
					}
				})
			},
			//tab标签改变事件
			change(index) {
				this.current = index;
				if (index === 0) {
					this.type = 2;
					this.msg = '您还没有人赞你';
					this.subMsg = '快去发布动态，让人点赞吧~';
					this.likeText = '她赞了你的动态';
				} else {
					this.type = 1;
					this.msg = '您还没有赞的人';
					this.subMsg = '快去看看动态，给Ta点赞吧~';
					this.likeText = '你赞了她的动态';
				}
				this.getUserThumbsUpList();
			},
			//取消点赞
			cancelLike(dynamicId) {
				this.$api.saveUserThumbsUp(dynamicId).then(res => {
					if (res.code == 1) {
						this.getUserThumbsUpList();
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.slot-wrap {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.c_tabs {
		width: 520rpx;
	}

	.details {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;

		.detail {
			width: 569rpx;
			padding: 20rpx 30rpx 24rpx 30rpx;
			background-color: #F8F8F8;
			border-radius: 8rpx;
			margin-top: 20rpx;
		}

		.de_content {
			padding-bottom: 20rpx;
			border-bottom: 1px solid #E5E5E5;
			color: #333333;
			font-size: 28rpx;

			.de_img {
				width: 98rpx;
				height: 98rpx;
				margin-right: 20rpx;
				border-radius: 8rpx;
			}
		}

		.like {
			margin-top: 24rpx;
			color: #666666;
			font-size: 24rpx;

			.like_icon {
				width: 32rpx;
				height: 32rpx;
				margin-right: 20rpx;
			}
		}
	}

	.line {
		width: 569rpx;
		border-top: 1px solid #E5E5E5;
		margin-top: 30rpx;
	}

	.item {
		padding: 0;
	}

	.item:last-child .line {
		border: none;
	}

	.avater {
		image {
			border-radius: 50%;
		}
	}
</style>
