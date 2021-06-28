<template>
	<view class="Inform">
		<u-navbar title="举报" :background="background" :border-bottom="false">
			<view slot="right">
				<view class="right_btn" @click="submit">
					提交
				</view>
			</view>
		</u-navbar>
		<view style="height: 8rpx;background-color: #F4F4F4;"></view>
		<u-form ref="uForm" :model="form" :border-bottom="false" :errorType="errorType">
			<u-cell-group :border="false">
				<u-cell-item title="举报类型" :value="typeValue" @click="toChooseType"></u-cell-item>
			</u-cell-group>
			<u-form-item prop="content">
				<u-input v-model="form.content" :type="type" :border="border" :height="height" :auto-height="autoHeight"
					placeholder="请描述要举报的详情" :clearable="false" />
			</u-form-item>
			<u-form-item style="margin-left: 32rpx;" :border-bottom="false">
				<u-upload :action="action" name="upload" :file-list="fileList"></u-upload>
			</u-form-item>
		</u-form>
	</view>
</template>

<script>
	import upload from '@/config/uploadFile.js'
	import common from '@/utils/util.js'

	export default {
		data() {
			return {
				background: {
					background: '#FFFFFF'
				},
				form: {
					content: ''
				},
				rules: {
					content: [{
						required: true,
						message: '请描述要举报的详情',
						trigger: ['blur']
					}]
				},
				errorType: ['toast'],
				typeValue: '请选择',
				type: 'textarea',
				border: false,
				height: 300,
				autoHeight: true,
				action: upload.url,
				fileList: []
			}
		},
		onLoad() {},
		methods: {
			submit() {
				if (this.typeValue === '请选择') {
					this.$u.toast('请选择举报类型');
					return false;
				}
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.$u.toast('举报成功！');
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					}
				})
			},
			toChooseType() {
				uni.navigateTo({
					url: './InformType'
				})
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss" scoped>
	.right_btn {
		width: 100rpx;
		height: 44rpx;
		line-height: 44rpx;
		text-align: center;
		background-color: #B46628;
		color: #FFFFFF;
		font-size: 24rpx;
		border-radius: 30rpx;
		margin-right: 32rpx;
	}

	/deep/.u-input__input {
		margin-left: 32rpx !important;
	}
</style>
