<template>
	<view class="content">
		<view style="height: 40rpx;"></view>
		<view class="main">
			<view class="mar_bott adverse_box">
				<view class="title">猜您想问</view>
				<view class="details">
					<view class="de_text">1.我想要注销账号?怎么进行注销呢?</view>
					<view class="de_text">2.在哪里能下载软件呢?</view>
					<view class="de_text">3.怎么关闭提示音呢?(新消息提示音
						官方消息提醒，新人消息提醒显示，
						聊天提示音)</view>
					<view class="de_text">4.我刚刚充值了会员怎么现在不是呢?
						我之前充值的会员，现在怎么不是了呢</view>
					<view class="de_text">5.怎么邀请好友呢?我的邀请码在哪里
						查看呢?</view>
					<view class="de_text">6.如何删除评价</view>
				</view>
				<view class="a_change d_flex">
					<view class="chage_icon">
						<image src="@/static/images/mine/center_1.png" mode=""></image>
					</view>
					<text>换一组</text>
				</view>
			</view>
			<view class="mar_bott self" v-for="(item, index) in selfContentList" :key="index">
				<view class="self_box">
					{{ item }}
				</view>
			</view>
		</view>
		<view class="footer d_flex flex_betewwen">
			<view class="le_icon">
				<image src="@/static/images/mine/center_2.png" mode=""></image>
			</view>
			<view class="input" style="width: 490rpx;">
				<!-- <u-search shape="round" v-model="quesContent" :show-action="false" :clearabled="false" search-icon="" placeholder="请简短描述您的问题" @search="sendMsg"></u-search> -->
				<u-input v-model="quesContent" type="text" :border="false" confirm-type="send"
					:customStyle="customStyle" placeholder="请简短描述您的问题" :clearable="false" />
			</view>
			<view v-if="quesContent.length === 0" class="le_icon">
				<image src="@/static/images/mine/center_3.png" mode=""></image>
			</view>
			<view v-else class="send_box">
				<u-button type="success" class="send_btn" @click="sendMsg">发送</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				quesContent: '',
				selfContentList: [],
				customStyle: {
					paddingLeft: '30rpx'
				},
			}
		},
		methods: {
			sendMsg() {
				this.selfContentList.push(this.quesContent)
				this.quesContent = '';
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		height: 88vh;
		overflow-y: scroll;
		padding-bottom: 20rpx;
	}

	.adverse_box,
	.self_box {
		max-width: 552rpx;
		padding: 30rpx;
		background: #F3F4F6;
		border-radius: 30rpx 30rpx 30rpx 8rpx;
		font-size: 28rpx;
		color: #B46628;
	}

	.mar_bott {
		margin-bottom: 40rpx;
	}

	.title {
		color: #666666;
		margin-bottom: 56rpx;
	}

	.de_text {
		margin-bottom: 38rpx;
		font-weight: 400;
		line-height: 38rpx;
	}

	.a_change {
		color: #B46628;
		font-size: 24rpx;
		justify-content: center;
		align-items: center;
	}

	.chage_icon {
		width: 32rpx;
		height: 32rpx;
		margin-right: 22rpx;
	}

	.self {
		display: flex;
		justify-content: flex-end;
	}

	.self_box {
		background-color: #F1CAAB;
		border-radius: 30rpx 30rpx 8rpx 30rpx;
	}

	.footer {
		width: 689rpx;
		position: fixed;
		bottom: 15rpx;
		left: 32rpx;
		background-color: #FFFFFF;
		padding-top: 20rpx;

		.le_icon {
			width: 68rpx;
			height: 68rpx;
			flex-shrink: 0;
		}
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
