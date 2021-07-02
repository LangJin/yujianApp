<template>
	<view class="content">
		<u-navbar back-icon-color="#333333" :title="userName" title-size="36" title-color="#333"
			:background="background" :border-bottom="false" :is-fixed="true" z-index="9999">
			<view slot="right">
				<u-icon name="more-dot-fill" size="40" class="right_icon" @click="handleMore"></u-icon>
			</view>
			<u-action-sheet :list="moreList" v-model="moreShow" :safe-area-inset-bottom="true" @click="moreClick">
			</u-action-sheet>
		</u-navbar>
		<view class="main_box">
			<scroll-view id="scrollview" class="chat-window" scroll-y="true"
				:style="{height: style.contentViewHeight + 'px'}" :scroll-with-animation="true" :scroll-top="scrollTop">
				<view class="main">
					<view class="top_icon" v-if="isVip === 2" @click="toVipCenter">
						<image src="@/static/images/message/icon_bg.png" mode=""></image>
					</view>
					<view class="chat_note">
						<u-read-more :toggle="true" :font-size="18" text-indent="0" :shadowStyle="shadowStyle"
							:show-height="30" close-text="展开" color="#666666">
							<rich-text :nodes="content" class="note"></rich-text>
						</u-read-more>
					</view>
					<view class="item_box" v-for="(item, index) in messageList" :key="index">
						<view class="date">
							{{ item.createTime | timeFrom }}
						</view>
						<view class="mar_bott d_flex" v-if="item.userId !== userId">
							<view class="avater" @click="toPersonal(info.toUserVO.id)">
								<image v-if="info.toUserVO.avatarUrl" :src="info.toUserVO.avatarUrl" mode=""></image>
								<image v-else src="@/static/images/vip/icon_logo.png" mode=""></image>
							</view>
							<view class="adverse_box">
								<view class="de_text">
									{{ item.content }}
								</view>
							</view>
						</view>
						<view class="mar_bott self" v-else>
							<view class="avater" @click="toPersonal(info.userVO.id)">
								<image v-if="info.userVO.avatarUrl" :src="info.userVO.avatarUrl" mode=""></image>
								<image v-else src="@/static/images/vip/icon_logo.png" mode=""></image>
							</view>
							<view class="self_box">
								{{ item.content }}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="footer d_flex flex_betewwen">
			<view class="le_icon">
				<image src="@/static/images/message/talk.png" mode=""></image>
			</view>
			<view class="input">
				<u-input v-model="quesContent" type="text" :border="false" confirm-type="send"
					:customStyle="customStyle" placeholder="输入消息" :clearable="false" />
			</view>
			<view v-if="quesContent.length === 0" class="le_icon">
				<image src="@/static/images/message/image.png" mode=""></image>
			</view>
			<view v-else class="send_box">
				<u-button type="success" class="send_btn" @click="sendMsg">发送</u-button>
			</view>
		</view>
		<chat-modal :show="chatShow" :imageUrl="info.toUserVO.avatarUrl" @close="closeChat" @toVipCenter="toVipCenter">
		</chat-modal>
	</view>
</template>

<script>
	import ChatModal from '@/components/chatModal/ChatModal.vue'
	export default {
		components: {
			ChatModal
		},
		data() {
			return {
				userName: '',
				background: {
					background: '#FFFFFF'
				},
				moreList: [{
					text: '拉黑'
				}, {
					text: '举报'
				}],
				moreShow: false,
				content: '本软件严禁利用本软件进行淫秽色情、诈骗、赌博、传销等违法违规以及违反注册协议、隐私政策的行为，否则将依法处理。如有利用本软件以约谈、送礼等理由进行色诱、私下不当交易等行为，请谨慎判断，以防人身或财产损失甚至违法违规。本软件声明，本软件仅为用户提供内容储存空间，不对用户发布的任何信息或者利用本软件账号从事的任何行为承担法律责任。用户的一切行为应当自行承担法律后果。本软件无法且不会对因用户行为而导致的任何损失或损害承担责任。',
				shadowStyle: {
					backgroundImage: "none",
					marginTop: "20rpx",
					paddingBottom: "20rpx"
				},

				info: {
					toUserVO: {},
					userVO: {}
				},
				messageList: [],
				quesContent: '',
				customStyle: {
					paddingLeft: '30rpx'
				},
				toUserId: undefined,
				userId: undefined,
				pageSize: 20,
				pageNum: 1,
				total: 0,
				isVip: undefined,
				chatShow: false,
				style: {
					pageHeight: 0,
					contentViewHeight: 0,
					footViewHeight: 90,
					mitemHeight: 0
				},
				scrollTop: ''
			}
		},
		onLoad(option) {
			this.toUserId = option.id;
			this.userId = uni.getStorageSync('loginUser') ? uni.getStorageSync('loginUser').id : undefined;
			this.init();
		},
		created() {
			//获取手机高度信息
			const res = uni.getSystemInfoSync(); //获取手机可使用窗口高度
			this.style.pageHeight = res.windowHeight;
			this.style.contentViewHeight = res.windowHeight - uni.getSystemInfoSync().screenWidth / 750 * (100) -
				70; //像素   因为给出的是像素高度 然后我们用的是upx  所以换算一下 
		},
		onShow() {
			this.isVip = uni.getStorageSync('isVip') ? uni.getStorageSync('isVip') : undefined;
		},
		onReady() {
			this.scrollToBottom(); //调用回到底部方法
		},
		methods: {
			init() {
				if (true) {
					this.$set(this.moreList, 0, {
						text: '取消拉黑'
					});
				}
				this.getMessageList();
			},
			//获取聊天记录
			getMessageList() {
				this.$api.messageList(this.toUserId, this.pageSize, this.pageNum).then(res => {
					if (res.code == 1) {
						let result = res.data[0];
						this.info = result;
						this.userName = result.toUserVO.nickName;
						this.messageList = result.messageVO;
					}
				})
			},
			//发送消息
			sendMsg() {
				if (this.isVip === undefined || this.isVip === 2) {
					this.chatShow = true;
				} else {
					let data = {
						content: this.quesContent,
						toUserId: this.toUserId
					}
					this.$api.saveUserChatMessage(data).then(res => {
						if (res.code == 1) {
							this.getMessageList();
							this.quesContent = '';
							this.scrollToBottom();
						}
					})
				}
			},
			//关闭弹窗
			closeChat() {
				this.chatShow = false;
			},
			//vip中心
			toVipCenter() {
				uni.navigateTo({
					url: '../../vip/VipCenter'
				})
				this.chatShow = false;
			},
			//导航栏右侧更多
			handleMore() {
				this.moreShow = true;
			},
			//导航栏右侧更多
			moreClick(index) {
				if (index === 0) {
					if (true) {
						this.$set(this.moreList, 0, {
							text: '拉黑'
						});
					}
				} else if (index === 1) {
					uni.navigateTo({
						url: '../../index/inform/Inform'
					})
				} else {
					this.moreList.pop();
				}
			},
			//去个人主页
			toPersonal(id) {
				uni.navigateTo({
					url: `../../index/personal/Personal?id=${id}`
				})
			},
			//定位到聊天最底部
			scrollToBottom() {
				let that = this;
				let query = uni.createSelectorQuery();
				query.selectAll('.main').boundingClientRect();
				query.select('#scrollview').boundingClientRect();
				query.exec((res) => {
					that.style.mitemHeight = 0;
					res[0].forEach((rect) => that.style.mitemHeight = that.style.mitemHeight + rect.height +
						40); //获取所有内部子元素的高度
						// console.log("mitemHeight", that.style.mitemHeight)
					// 因为vue的虚拟DOM 每次生成的新消息都是之前的，所以采用异步setTimeout
					setTimeout(() => {
						// console.log(11, that.style.mitemHeight > that.style.contentViewHeight)
						//判断子元素高度是否大于显示高度
						if (that.style.mitemHeight > (that.style.contentViewHeight - 100)) {
							//用子元素的高度减去显示的高度就获益获得序言滚动的高度
							that.scrollTop = that.style.mitemHeight - that.style.contentViewHeight
							// console.log("scrollTop1:", that.scrollTop)
						}
					}, 100)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.main_box {
		height: 83vh;
		overflow-y: scroll;
	}

	.adverse_box,
	.self_box {
		max-width: 552rpx;
		padding: 20rpx;
		background: #F8F8F8;
		border-radius: 8rpx;
		font-size: 28rpx;
		color: #333333;
	}

	.date {
		text-align: center;
		color: #888888;
		font-size: 24rpx;
		margin-top: 56rpx;
		margin-bottom: 40rpx;
	}

	.mar_bott {
		margin-bottom: 20rpx;
		align-items: inherit;

		.avater {
			width: 80rpx;
			height: 80rpx;
			margin-right: 20rpx;

			image {
				border-radius: 50%;
			}
		}

	}

	.self {
		display: flex;
		justify-content: flex-start;
		flex-direction: row-reverse;

		.avater {
			margin-left: 20rpx;
		}
	}

	.self_box {
		background-color: #F1CAAB;
	}

	.footer {
		width: 90%;
		// position: fixed;
		// bottom: 10rpx;
		// bottom: 0;
		// left: 32rpx;
		margin: 0 auto;
		margin-top: 20rpx;
		background-color: #FFFFFF;

		.le_icon {
			width: 68rpx;
			height: 68rpx;
			flex-shrink: 0;
		}
	}

	.right_icon {
		margin-right: 32rpx;
	}

	.top_icon {
		width: 686rpx;
		height: 98rpx;
		margin-top: 26rpx;
		margin-bottom: 20rpx;
	}

	.chat_note {
		width: 646rpx;
		margin: 0 auto;
		margin-bottom: 60rpx;
		background-color: #F8F8F8;
		padding: 20rpx;
	}

	.note {
		color: #666666;
		font-size: 18rpx;
		line-height: 32rpx;
	}

	.input {
		width: 490rpx;
		background-color: #F3F4F6;
		border-radius: 60rpx;
	}

	.send_box {
		width: 98rpx;

		.send_btn {
			height: 68rpx;
		}
	}
</style>
