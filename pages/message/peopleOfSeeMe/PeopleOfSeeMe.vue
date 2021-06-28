<template>
	<view class="main">
		<view class="items d_flex flex_betewwen">
			<view class="item" v-for="index in 8" :key="index">
				<view class="bg_img">
					<image @click="toPersonal" :class="[true ? 'image_blur': '']" src="@/static/images/home/tu1.png"
						mode=""></image>
					<view class="intro">女 · 22· 1545m</view>
					<view class="chat_img" @tap="toChatBox">
						<image src="@/static/images/message/chat.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<publish-modal :show="show" :text="modalText" @close="close"></publish-modal>
	</view>
</template>

<script>
	import PublishModal from '@/components/publishModal/PublishModal.vue'
	export default {
		components: {
			PublishModal
		},
		data() {
			return {
				show: false,
				modalText: 'VIP才能查看看过我的人<br/>还有更多专属特权等你使用~'
			}
		},
		methods: {
			toPersonal() {
				if(false){
					uni.navigateTo({
						url: '../../index/personal/Personal'
					})
				}else{
					this.show = true;
				}
			},
			toChatBox() {
				
			},
			close(){
				this.show = false;
			}
		},
	}
</script>

<style lang="scss" scoped>
	.main {
		padding-bottom: 60rpx;
	}

	.items {
		flex-wrap: wrap;
	}

	.item {
		padding-right: 0;
	}

	.bg_img {
		width: 328rpx;
		height: 440rpx;
		position: relative;
		border-radius: 8rpx;
	}

	.intro {
		position: absolute;
		left: 0;
		bottom: 0;
		background-color: #FFFFFF;
		opacity: 0.7;
		border-radius: 0rpx 8rpx 0rpx 8rpx;
		color: #333333;
		font-size: 20rpx;
		padding: 6rpx 8rpx;
	}

	.chat_img {
		width: 90rpx;
		height: 90rpx;
		position: absolute;
		right: 10rpx;
		bottom: 10rpx;
	}
	::v-deep .modal_text{
		width: 464rpx;
	}
</style>
