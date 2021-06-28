<template>
	<view class="content">
		<u-navbar :is-back="false" :background="background" :border-bottom="false">
			<u-tabs class="c_tabs" :list="list" :is-scroll="false" font-size="36" :current="current" @change="change"
				inactive-color="#888888" active-color="#B46628" bar-width="44"></u-tabs>
			<view slot="right" class="more" @click="showMenu">
				<u-icon name="arrow-down-fill" color="#FFFFFF" size="22" style="margin-right: 6rpx;"></u-icon>
				{{ sex === 0 ? '全部' : sex === 1 ? '只看男生' : '只看女生' }}
			</view>
		</u-navbar>
		<view class="main">
			<view class="intro_img">
				<image src="@/static/images/dynamic/bg.png" mode=""></image>
			</view>
			<!-- <scroll-view scroll-x="true" class="scroll-view-x" style="padding-top:10rpx" scroll-with-animation="true">
				<view class="navigator_second" v-for='(item, index) in labelList' :key="item.id" :data-c-id="item.id">
					<text class="navigator_text">{{item.name}}</text>
				</view>
			</scroll-view> -->
		</view>
		<common-dynamic :flag="true" :dynamicList="dynamicList" @likeClick="likeClick" @sayHello="sayHello">
		</common-dynamic>
		<view class="publish_btn" @click="toAddDynamic">
			<image src="@/static/images/dynamic/icon_dongtai.png" mode=""></image>
		</view>

		<!-- 发布动态弹窗 -->
		<publish-modal :show="show" :text="modalText" @close="closeModal"></publish-modal>
		<!-- 选择性别遮罩 -->
		<u-mask :show="selectShow" :mask-click-able="false" :duration="0">
			<view class="warp">
				<view class="rect" @tap.stop>
					<view @click="changeSex(2)">只看女生</view>
					<view @click="changeSex(1)">只看男生</view>
					<view @click="changeSex(0)">查看全部</view>
				</view>
			</view>
		</u-mask>
		<u-loadmore v-show="dynamicList && dynamicList.length > 10" :status="status" @loadmore="loadmore"></u-loadmore>
	</view>
</template>

<script>
	import CommonDynamic from '@/components/personal/Dynamic.vue'
	import PublishModal from '@/components/publishModal/PublishModal.vue'

	export default {
		components: {
			CommonDynamic,
			PublishModal
		},
		data() {
			return {
				background: {
					background: '#FFFFFF'
				},
				list: [{
					name: '全部',
				}, {
					name: '附近',
				}],
				current: 0,
				labelList: [{
						id: 1,
						name: '#这是一个标签'
					},
					{
						id: 2,
						name: '#这是标签'
					},
					{
						id: 3,
						name: '#标签123'
					},
					{
						id: 4,
						name: '#这是一个标签'
					},
				],
				dynamicList: [],
				show: false,
				modalText: '成为VIP即可发布动态<br />获得更多曝光~',
				selectShow: false,
				sex: 0,
				pageSize: 20,
				pageNum: 1,
				totalPageNum: 0,
				isVip: undefined,
				status: 'nomore'
			}
		},
		onLoad() {
			this.getDynamicList();
		},
		onShow() {
			this.isVip = uni.getStorageSync('isVip') ? uni.getStorageSync('isVip') : undefined;
		},
		onPullDownRefresh() {
			this.getDynamicList();
		},
		onReachBottom() {
			this.loadmore();
		},
		methods: {
			getDynamicList() {
				this.$api.dynamicList(this.current, this.sex, this.pageSize, this.pageNum).then(res => {
					if (res.code == 1) {
						if (this.pageNum == 1) {
							this.dynamicList = res.data;
						} else {
							this.dynamicList = this.dynamicList.concat(res.data);
						}
						this.totalPageNum = res.pagination.totalPages;
					}
					uni.stopPullDownRefresh();
				})
			},
			//tab标签改变事件
			change(index) {
				this.current = index;
				this.pageNum = 1;
				this.getDynamicList();
			},
			//发布动态
			toAddDynamic() {
				if (this.isVip === undefined || this.isVip === 2) {
					this.show = true;
				} else {
					uni.navigateTo({
						url: './addDynamic/AddDynamic'
					})
				}
			},
			//关闭发布弹窗
			closeModal() {
				this.show = false;
			},
			//右上角选择
			showMenu() {
				this.selectShow = true;
			},
			//选择查看列表性别
			changeSex(index) {
				this.sex = index;
				this.selectShow = false;
				this.getDynamicList();
			},
			//动态点赞
			likeClick(id) {
				this.$api.saveUserThumbsUp(id).then(res => {
					if (res.code == 1) {
						this.getDynamicList();
					}
				})
			},
			//打招呼
			sayHello(userId) {
				uni.navigateTo({
					url: `../message/dialog/DialogBox?id=${userId}`
				})
			},
			//加载更多
			loadmore() {
				if (this.pageNum >= this.totalPageNum) return;
				this.status = 'loading';
				this.pageNum++;
				setTimeout(() => {
					this.getDynamicList();
					if (this.pageNum >= this.totalPageNum) this.status = 'nomore'
					else this.status = 'loading'
				}, 2000)
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/assets/dynamic.scss';

	.content {
		padding-bottom: 30rpx;
	}
</style>
