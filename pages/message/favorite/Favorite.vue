<template>
	<view class="content">
		<u-navbar :background="background" :border-bottom="false">
			<view class="slot-wrap">
				<u-tabs class="c_tabs" :list="list" :is-scroll="false" font-size="36" :current="current"
					@change="change" inactive-color="#888888" active-color="#B46628" bar-width="80"></u-tabs>
			</view>
		</u-navbar>
		<view v-if="userList && userList.length > 0">
			<common-list :userList="userList"></common-list>
		</view>
		<view v-else>
			<common-empty :msg="msg" :subMsg="subMsg"></common-empty>
		</view>
	</view>
</template>

<script>
	import CommonList from '@/components/list/UserList.vue'
	import CommonEmpty from '@/components/empty/Empty.vue'

	export default {
		components: {
			CommonList,
			CommonEmpty
		},
		data() {
			return {
				background: {
					background: '#FFFFFF'
				},
				list: [{
					name: '我喜欢',
				}, {
					name: '喜欢我',
				}],
				current: 0,
				userList: [],
				msg: '您还没有喜欢的人',
				subMsg: '快去喜欢Ta吧~',
				pageSize: 20,
				pageNum: 1,
				total: 0,
				type: 1 //1我喜欢 2喜欢我
			}
		},
		onLoad() {
			this.getUserLikeList();
		},
		methods: {
			getUserLikeList() {
				this.$api.userLikeList(this.type, this.pageSize, this.pageNum).then(res => {
					if(res.code == 1){
						this.userList = res.data;
					}
				})
			},
			//tab标签改变事件
			change(index) {
				this.current = index;
				this.type = index + 1;
				if (index === 0) {
					this.msg = '您还没有喜欢的人';
					this.subMsg = '快去喜欢Ta吧~';
				} else {
					this.msg = '您还没有人喜欢你';
					this.subMsg = '去开通VIP吸引Ta的注意吧~';
				}
				this.getUserLikeList();
			},
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
		width: 420rpx;
	}
</style>
