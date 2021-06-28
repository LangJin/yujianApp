<template>
	<view class="content">
		<view v-if="dynamicList && dynamicList.length > 0">
			<common-dynamic :dynamicList="dynamicList" @del="remove" @likeClick="likeClick"></common-dynamic>
		</view>
		<view v-else class="no_data">
			<view class="no_icon">
				<image src="@/static/images/mine/no_data.png" mode=""></image>
			</view>
			<view class="text">
				快来发布第一条动态吧！
			</view>
			<view class="sub_text">
				发布动态获得更多曝光
			</view>
			<common-btn msg="发布动态" @toNext="toNext" class="publish"></common-btn>
		</view>
		<publish-modal :show="show" :text="modalText" @close="close"></publish-modal>
		<u-modal v-model="delModal" :content="content" :async-close="true" @confirm="deleteDynamic"></u-modal>
	</view>
</template>

<script>
	import CommonDynamic from '@/components/personal/Dynamic.vue'
	import CommonBtn from '@/components/button/btn.vue'
	import PublishModal from '@/components/publishModal/PublishModal.vue'

	export default {
		components: {
			CommonDynamic,
			CommonBtn,
			PublishModal
		},
		data() {
			return {
				dynamicList: [],
				show: false,
				modalText: '成为VIP即可发布动态<br/>获得更多曝光~',
				userId: undefined,
				pageNum: 1,
				pageSize: 20,
				delModal: false,
				content: '确定删除此条动态吗？',
				dynamicId: undefined
			}
		},
		onLoad() {
			let user = uni.getStorageSync('loginUser') ? uni.getStorageSync('loginUser') : undefined;
			if (user !== undefined) {
				this.userId = user.id;
			}
			this.getDynamicList();
		},
		methods: {
			//获取动态列表
			getDynamicList() {
				this.$api.dynamicListByUserId(this.userId, this.pageSize, this.pageNum).then(res => {
					if (res.code == 1) {
						this.dynamicList = res.data;
					}
				})
			},
			//删除动态
			remove(id) {
				this.dynamicId = id;
				this.delModal = true;
			},
			//确定删除动态
			deleteDynamic() {
				this.$api.deleteDynamic(this.dynamicId).then(res => {
					if (res.code == 1) {
						this.$u.toast('删除成功！');
						this.getDynamicList();
						this.delModal = false;
					}
				})
			},
			//发布动态
			toNext() {
				let isVip = uni.getStorageSync('isVip') ? uni.getStorageSync('isVip') : undefined;
				if (isVip === 2 || isVip === undefined) {
					this.show = true;
				} else {
					uni.navigateTo({
						url: '../../dynamic/addDynamic/AddDynamic'
					})
				}
			},
			//关闭充值vip弹窗
			close() {
				this.show = false;
			},
			//动态点赞
			likeClick(id) {
				this.$api.saveUserThumbsUp(id).then(res => {
					if (res.code == 1) {
						this.getDynamicList();
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.no_data {
		text-align: center;
		padding-top: 358rpx;
	}

	.no_icon {
		width: 284rpx;
		height: 284rpx;
		margin: 0 auto;
	}

	.text {
		margin: 40rpx 0 20rpx 0;
		color: #333333;
		font-size: 32rpx;
	}

	.sub_text {
		margin-bottom: 278rpx;
		color: #888888;
		font-size: 24rpx;
	}

	.publish {
		/deep/.btn {
			width: 264rpx;
			font-size: 28rpx;
		}
	}
</style>
