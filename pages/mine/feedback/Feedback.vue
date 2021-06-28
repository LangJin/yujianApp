<template>
	<view class="content">
		<view style="height: 8rpx; background-color: #F4F4F4;"></view>
		<view class="main">
			<u-form :model="form" ref="uForm" :border-bottom="false" :errorType="errorType">
				<u-form-item prop="describe" label="问题描述" label-position="top" :borderBottom="false">
					<u-input v-model="form.describe" type="textarea" :border="true" :height="260" :auto-height="true"
						placeholder="请描述您的问题和意见" :clearable="false"></u-input>
				</u-form-item>
				<u-form-item label="图片(选填）" label-position="top" :borderBottom="false">
					<u-upload :action="action" :file-list="fileList" :max-size="5 * 1024 * 1024" upload-text="">
					</u-upload>
				</u-form-item>
			</u-form>
		</view>
		<view class="footer">
			<common-btn msg="提交反馈" @toNext="toNext"></common-btn>
			<view class="note" @click="toCallCenter">有问题？立即询问在线客服</view>
		</view>
		<u-toast ref="uToast" />
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
				form: {
					describe: ''
				},
				rules: {
					describe: [{
						required: true,
						message: '请描述您的问题和意见',
						trigger: ['blur']
					}]
				},
				errorType: ['toast'],
				action: '',
				fileList: []
			}
		},
		methods: {
			toNext() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.$refs.uToast.show({
							title: '提交成功, 感谢反馈',
							url: '/pages/mine/index',
							isTab: true,
							duration: 1000
						})
					}
				})
			},
			toCallCenter(){
				uni.navigateTo({
					url: '../callcenter/CallCenter'
				})
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.u-list-item {
		width: 210rpx !important;
		height: 210rpx !important;
		margin: 10rpx 9rpx;
	}

	.footer {
		width: 100%;
		position: fixed;
		bottom: 98rpx;
		left: auto;
	}

	.note {
		color: #B2B2B2;
		font-size: 24rpx;
		margin-top: 20rpx;
		text-align: center;
	}
</style>
