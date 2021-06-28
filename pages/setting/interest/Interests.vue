<template>
	<view class="content">
		<u-navbar title="修改资料" :borderBottom="false">
			<view slot="right" class="right_icon" @click="saveInterest">保存</view>
		</u-navbar>
		<view class="main">
			<view class="hint">只能选择6种兴趣哦~</view>
			<u-checkbox-group @change="checkboxGroupChange" class="interests" :max="6">
				<u-checkbox v-model="item.checked" v-for="(item, index) in interestList" :key="index" :name="item.name"
					label-size="24" :class="['interest', item.checked == true ?'active_interest': '']">
					{{item.name}}
				</u-checkbox>
			</u-checkbox-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: 1,
				interestList: [{
						id: 1,
						name: '健身',
						checked: false,
					},
					{
						id: 2,
						name: '滑雪',
						checked: false,
					},
					{
						id: 3,
						name: '跑步',
						checked: false,
					},
					{
						id: 4,
						name: '高尔夫',
						checked: false,
					},
					{
						id: 5,
						name: '网球',
						checked: false,
					},
					{
						id: 6,
						name: '音乐',
						checked: false,
					},
					{
						id: 7,
						name: '吃吃吃',
						checked: false,
					},
					{
						id: 8,
						name: '电影',
						checked: false,
					},
					{
						id: 9,
						name: '动漫',
						checked: false,
					},
				],
				selectList: [],
				info: {}
			}
		},
		onLoad() {
			this.info = uni.getStorageSync('info');
			this.init();
		},
		methods: {
			init() {
				let _self = this;
				let temp = this.info.interests;
				temp.map(function(value) {
					_self.interestList.map(function(inter) {
						if (value === inter.name) {
							inter.checked = true;
						}
					})
				})
			},
			// 选中任一checkbox时，由checkbox-group触发
			checkboxGroupChange(e) {
				this.selectList = e;
				console.log(e)
			},
			saveInterest() {
				// let pages = getCurrentPages();
				// let beforePage = pages[pages.length - 2];
				
				let data = {
					id: uni.getStorageSync('loginUser').id,
					interest: this.selectList,
				};
				this.$api.saveUserInfo(data).then(res => {
					if (res.code == 1) {
						this.$u.toast(res.msg);
						// beforePage.interests = this.selectList;
						// console.log(beforePage.interests)
						// uni.navigateBack({
						// 	delta: 1
						// })
						setTimeout(() => {
							uni.navigateTo({
								url: '../updateInfo/UpdateInfo'
							})
						}, 1000)
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.right_icon {
		color: #B46628;
		margin-right: 32rpx;
		font-size: 24rpx;
	}

	.main {
		padding: 32rpx;
	}

	.hint {
		color: #333333;
		font-size: 24rpx;
		margin-bottom: 50rpx;
	}

	.interests {
		flex-wrap: wrap;
	}

	.interest {
		padding: 4rpx 0rpx 4rpx 12rpx;
		border-radius: 30rpx;
		color: #666666;
		border: 1px solid;
		margin-right: 30rpx;
		margin-bottom: 30rpx;
		flex-shrink: 0;

		/deep/.u-icon {
			display: none !important;
		}
	}

	.active_interest {
		background-color: #B46628;
		border: 1px solid #FFFFFF;

		/deep/.u-checkbox__label {
			color: #FFFFFF !important;
		}
	}

	/deep/.u-checkbox__icon-wrap {
		width: 0rpx !important;
		height: 0rpx !important;
		border: none;
	}
</style>
