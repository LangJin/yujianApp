<template>
	<view class="content">
		<view style="height: 8rpx; background-color: #F4F4F4;"></view>
		<u-cell-group>
			<u-cell-item title="注销账号" :titleStyle="titleStyle" @click="logout">
			</u-cell-item>
		</u-cell-group>
		<u-modal v-model="show" :content="content" :title-style="modalTitleStyle" :show-cancel-button="true"
			confirm-text="是" cancel-text="再想想" cancel-color="#B46628" confirm-color="#B46628"
			:content-style="contentStyle" @confirm="confirm"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleStyle: {
					'color': '#333333'
				},
				modalTitleStyle: {
					color: '#333333',
					fontSize: '36rpx',
					fontWeight: '500'
				},
				contentStyle: {
					color: '#666666',
					fontSize: '28rpx'
				},
				show: false,
				content: '注销账号后所有信息将会抹除，确认注销？'
			}
		},
		methods: {
			logout() {
				this.show = true;
			},
			confirm(){
				uni.reLaunch({
					url: '../../account/login/Login'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
