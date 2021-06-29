<template>
	<view class="Personal">
		<view class="person_bg">
			<image class="person_image_blur" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" mode=""></image>
			<image class="person_image_blur" v-else src="@/static/images/home/logo.png" mode=""></image>
			<view class="img_zhezhao"></view>
			<u-navbar back-icon-color="#FFFFFF" :background="background" :border-bottom="false">
				<view slot="right">
					<u-icon name="more-dot-fill" size="34" color="#FFFFFF" class="more" @click="handleMore"></u-icon>
				</view>
				<u-action-sheet :list="moreList" v-model="moreShow" :safe-area-inset-bottom="true" @click="moreClick">
				</u-action-sheet>
			</u-navbar>
			<view class="content">
				<view class="user_info">
					<view class="user_img">
						<image v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" mode=""></image>
						<image v-else src="@/static/images/vip/icon_logo.png" mode=""></image>
					</view>
					<view class="nick_name d_flex">
						{{ userInfo.nickName }}
						<u-icon v-if="userInfo.isVip === 1" name="../../../static/images/home/icon_vip.png" size="32"
							:customStyle="{marginLeft: '14rpx'}"></u-icon>
					</view>
					<view class="rz_icon">
						<!-- 真实头像 -->
						<image src="@/static/images/home/yz_icon.png" mode=""></image>
					</view>
					<view class="r_bottom d_flex">
						<view class="b_label">
							{{userInfo.gender === 0 ? '未知' : userInfo.gender === 1 ? '男': '女'}} · {{ userInfo.age }}岁
						</view>
						<view class="b_label">
							成都市
						</view>
						<view class="b_label" v-if="userInfo.occupation">
							{{ userInfo.occupation }}
						</view>
					</view>
					<view class="intro">
						{{ userInfo.introduce ? userInfo.introduce : '他很神秘，什么都没有写。' }}
					</view>
				</view>
				<u-tabs class="c_tabs" :list="list" :is-scroll="false" :current="current" @change="change"
					inactive-color="#888888" active-color="#B46628" bar-width="44" fontSize="28"></u-tabs>
				<!-- 资料 -->
				<view v-if="current === 0" class="resource">
					<view class="res_item">
						<view class="title">查看微信</view>
						<view class="chat_img" @click="toVipCenter">
							<image src="@/static/images/home/icon_bg.png" mode=""></image>
						</view>
					</view>
					<view class="res_item">
						<view class="title">相册</view>
						<scroll-view scroll-x="true" class="scroll-view-x" style="padding-top:10rpx"
							scroll-with-animation="true">
							<view class="albums d_flex">
								<view class="photo" v-for="(photo, index) in userInfo.photos" :key="index">
									<image :src="photo" :class="gender === userInfo.gender && isVip === 2 ? 'image_blur': ''" mode=""
										@tap="_previewImage(userInfo.photos, index)">
									</image>
									<view class="hot_icon">
										<image src="@/static/images/home/icon_huo.png" mode=""></image>
									</view>
									<view class="benren_icon">
										<image src="@/static/images/home/icon_benren.png" mode=""></image>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="res_item">
						<view class="title">了解Ta</view>
						<view class="info_items d_flex flex_betewwen">
							<view class="info_item">
								<view>身高/体重</view>
								<view class="info_value">{{ userInfo.height }}/{{ userInfo.weight }}</view>
							</view>
							<view class="info_item">
								<view>从事职业</view>
								<view class="info_value">{{ userInfo.occupation }}</view>
							</view>
							<view class="info_item">
								<view>身材</view>
								<view class="info_value">{{ userInfo.figure }}</view>
							</view>
							<view class="info_item">
								<view>感情情况</view>
								<view class="info_value">{{ userInfo.feeling }}</view>
							</view>
							<view class="info_item">
								<view>孩子</view>
								<view class="info_value">{{ userInfo.children }}</view>
							</view>
							<view class="info_item">
								<view>学历</view>
								<view class="info_value">{{ userInfo.education }}</view>
							</view>
							<view class="info_item">
								<view>年收入</view>
								<view class="info_value">{{ userInfo.income }}</view>
							</view>
							<view class="info_item">
								<view>抽烟</view>
								<view class="info_value">
									{{ userInfo.isSmoking===1?'抽烟': userInfo.isSmoking === 2 ? '不抽烟':'' }}
								</view>
							</view>
							<view class="info_item">
								<view>饮酒</view>
								<view class="info_value">{{ userInfo.isDrink===1?'喝酒':userInfo.isDrink===2?'不喝酒':'' }}
								</view>
							</view>
						</view>
					</view>
					<view class="res_item">
						<view class="title">兴趣爱好</view>
						<view class="hobbies d_flex">
							<view v-for="(inter, i) in userInfo.interests" :key="i">
								<view class="hobby">{{ inter }}</view>
							</view>
						</view>
					</view>
					<view class="res_item">
						<view v-if="false">
							<view class="title">
								评价 6+
								<text>综合评分 3.5</text>
							</view>
							<view class="score_items d_flex flex_betewwen">
								<view class="score d_flex">
									<text>身材</text>
									<u-rate :count="count" v-model="value" gutter="6"></u-rate>
								</view>
								<view class="score d_flex">
									<text>耐心</text>
									<u-rate :count="count" v-model="value" gutter="6"></u-rate>
								</view>
								<view class="score d_flex">
									<text>爽快</text>
									<u-rate :count="count" v-model="value" gutter="6"></u-rate>
								</view>
								<view class="score d_flex">
									<text>有趣</text>
									<u-rate :count="count" v-model="value" gutter="6"></u-rate>
								</view>
							</view>
						</view>
						<view v-else>
							<view class="title">
								暂无评价
							</view>
						</view>
					</view>
				</view>
				<!-- 动态 -->
				<view v-else>
					<common-dynamic v-if="dynamicList&&dynamicList.length" :flag="true" :dynamicList="dynamicList"
						@likeClick="likeClick" @sayHello="sayHello"></common-dynamic>
					<view v-else class="no_data">
						<view class="no_data_img">
							<image src="../../../static/images/home/bg1.png" mode=""></image>
						</view>
						<text>Ta还没有发布动态</text>
					</view>
				</view>
			</view>
		</view>
		<common-btns :flag="userInfo.isLike === 0 ? true: false" @privateChat="privateChat" @like="handleLike">
		</common-btns>
	</view>
</template>

<script>
	import indexBackgroundImage from '@/static/images/home/touxiang.png'
	import CommonBtns from '@/components/button/btns.vue'
	import CommonDynamic from '@/components/personal/Dynamic.vue'

	export default {
		components: {
			CommonBtns,
			CommonDynamic
		},
		data() {
			return {
				indexBackgroundImage: indexBackgroundImage,
				background: {
					background: 'rgba(0, 0, 0, 0)'
				},
				list: [{
					name: '资料',
				}, {
					name: '动态',
				}],
				current: 0,
				count: 5,
				value: 2,
				moreList: [{
					text: '拉黑'
				}, {
					text: '举报'
				}],
				moreShow: false,
				dynamicList: [],
				userId: undefined,
				userInfo: {},
				pageSize: 20,
				pageNum: 1,
				total: 0,
				isVip: undefined,
				// albums: [],
				gender: undefined
			}
		},
		onLoad(option) {
			if (option.id) {
				this.userId = option.id;
			}
			this.init();
		},
		onPageScroll(object) {
			if (object.scrollTop > 50) {
				this.background = {
					background: 'rgba(0, 0, 0, 0.5)'
				}
			} else {
				this.background = {
					background: 'rgba(255, 255, 255, 0)'
				}
			}
		},
		onShow() {
			this.isVip = uni.getStorageSync('isVip') ? Number(uni.getStorageSync('isVip')) : undefined;
		},
		methods: {
			init() {
				let user = uni.getStorageSync('loginUser') ? uni.getStorageSync('loginUser') : undefined;
				if (user !== undefined) {
					this.gender = user.gender;
				}
				this.getUserdetails();
			},
			//获取用户资料
			getUserdetails() {
				this.$api.getUserDetails(this.userId).then(res => {
					if (res.code == 1) {
						this.userInfo = res.data[0];
						// this.albums = this.userInfo.photos.slice(0, 3);
						if (this.userInfo.isLike === 1) {
							this.moreList.push({
								text: '取消喜欢'
							});
						}
					}
				})
			},
			//通过用户id获取用户动态列表
			getDynamicListByUserId() {
				this.$api.dynamicListByUserId(this.userId, this.pageSize, this.pageNum).then(res => {
					if (res.code == 1) {
						this.dynamicList = res.data;
					}
				})
			},
			//导航栏右侧更多
			handleMore() {
				this.moreShow = true;
			},
			//导航栏右侧更多
			moreClick(index) {
				console.log(index)
				if (index === 0) {
					if (true) {
						this.$set(this.moreList, 0, {
							text: '拉黑'
						});
					}
				} else if (index === 1) {
					uni.navigateTo({
						url: '../inform/Inform'
					})
				} else {
					this.saveLike();
					this.moreList.pop();
				}
			},
			//tab标签改变事件
			change(index) {
				this.current = index;
				if (index == 0) {
					this.getUserdetails();
				} else {
					this.getDynamicListByUserId();
				}
			},
			//私聊
			privateChat() {
				uni.navigateTo({
					url: `../../message/dialog/DialogBox?id=${this.userId}`
				})
			},
			//喜欢
			handleLike() {
				this.saveLike();
			},
			//保存喜欢或不喜欢
			saveLike() {
				this.$api.saveUserLike(this.userId).then(res => {
					if (res.code == 1) {
						this.getUserdetails();
					}
				})
			},
			//动态点赞
			likeClick(id) {
				this.$api.saveUserThumbsUp(id).then(res => {
					if (res.code == 1) {
						this.getDynamicListByUserId();
					}
				})
			},
			//打招呼
			sayHello(userId) {
				uni.navigateTo({
					url: `../../message/dialog/DialogBox?id=${userId}`
				})
			},
			//to vip中心
			toVipCenter() {
				uni.navigateTo({
					url: '../../vip/VipCenter'
				})
			},
			//多图预览
			_previewImage(photos, index) {
				let idx = index;
				let imgs = photos.map((item, index) => {
					return item;
				});
				if (imgs && imgs.length > 0) {
					uni.previewImage({
						current: imgs[idx],
						urls: imgs
					});
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/assets/personal.scss';
</style>
