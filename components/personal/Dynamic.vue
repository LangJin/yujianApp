<template>
	<view class="dy_items">
		<view class="item" v-for="(item, index) in dynamicList" :key="index">
			<view class="dy_info d_flex flex_betewwen">
				<view class="left d_flex">
					<view class="avater" @click="toPersonalPage(item.userId)">
						<image v-if="item.userVO.avatarUrl" :src="item.userVO.avatarUrl" mode=""></image>
						<image v-else src="@/static/images/vip/icon_logo.png" mode=""></image>
					</view>
					<view class="info">
						<view>{{ item.userVO.nickName }}</view>
						<view class="intro">{{ item.userVO.gender===1?'男':'女' }} · {{ item.userVO.age }}岁 |
							{{item.userVO.occupation}}
						</view>
					</view>
				</view>
				<view class="right" style="margin-top: 10rpx;">
					{{ item.createTime | timeFrom }}
				</view>
			</view>
			<view class="dy_content">
				<view class="dy_tit">
					{{ item.content }}
				</view>
				<view class="dy_imgs_box d_flex flex_betewwen">
					<view class="dy_imgs" v-for="(photo, p) in item.photos" :key="p">
						<image :src="photo" mode="" @tap="_previewImage(item.photos, p)"></image>
					</view>
				</view>
				<view class="dy_distance">
					<u-icon name="map" size="20"></u-icon> {{ item.city }}· {{ item.distance }}km
				</view>
			</view>
			<view class="dy_action d_flex">
				<view class="action d_flex">
					<view class="ac_icon">
						<image v-if="item.isThumbs === 0" src="@/static/images/home/like_1.png" mode=""
							@click="likeClick(item.id)"></image>
						<image v-else src="@/static/images/home/like.png" mode="" @click="likeClick(item.id)"></image>
					</view>
					<text>{{ item.like }}</text>
				</view>
				<view class="action d_flex" v-show="flag" @click="sayHello(item.userId)">
					<view class="ac_icon">
						<image src="@/static/images/home/icon_liaotian.png" mode=""></image>
					</view>
					<text>打招呼</text>
				</view>
				<view class="action d_flex">
					<view class="ac_icon">
						<u-icon v-if="flag" name="more-dot-fill" size="26" @click="actionMore"></u-icon>
						<image v-else src="@/static/images/home/icon_shanchu.png" mode="" @click="del(item.id)"></image>
					</view>
				</view>
			</view>
		</view>
		<u-action-sheet :list="actionMoreList" v-model="actionMoreShow" :safe-area-inset-bottom="true"
			@click="actionMoreClick"></u-action-sheet>
	</view>
</template>

<script>
	export default {
		props: {
			flag: Boolean,
			dynamicList: {
				type: Array,
				default: () => {}
			}
		},
		data() {
			return {
				actionMoreList: [{
					text: '举报'
				}],
				actionMoreShow: false,
			}
		},
		methods: {
			//动态--更多
			actionMore() {
				this.actionMoreShow = true;
			},
			//
			actionMoreClick() {
				uni.navigateTo({
					url: '/pages/index/inform/Inform'
				})
			},
			//删除
			del(id) {
				this.$emit('del', id);
			},
			//喜欢
			likeClick(id) {
				this.$emit('likeClick', id);
			},
			//打招呼
			sayHello(userId) {
				this.$emit('sayHello', userId);
			},
			//去个人主页
			toPersonalPage(userId) {
				uni.navigateTo({
					url: `/pages/index/personal/Personal?id=${userId}`,
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
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/assets/personal.scss';

	.avater {
		image {
			border-radius: 50%;
		}
	}
</style>
