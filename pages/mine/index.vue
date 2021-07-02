<template>
	<view class="mine"
		:style="{backgroundImage:`url(${indexBackgroundImage})`,backgroundRepeat:'no-repeat',backgroundSize:'100% 100%'}">
		<u-navbar :is-back="false" title="我的" :title-size="36" title-color="#333333" :background="background"
			:borderBottom="false">
			<view slot="right">
				<view class="f_img" @click="toUpdateInfo">
					<image src="@/static/images/mine/icon_ziliao.png" mode=""></image>
				</view>
			</view>
		</u-navbar>
		<view class="content">
			<view class="userinfo d_flex">
				<view class="user_img">
					<image v-if="info.avatarUrl" :src="info.avatarUrl" mode=""
						@tap="_previewSingleImage(info.avatarUrl)"></image>
					<image v-else :src="headUrl" mode="" @tap="_previewSingleImage(headUrl)"></image>
				</view>
				<view class="info">
					<view class="name">{{ info.nickName }}</view>
					<view class="intro">{{ info.gender === 1 ? '男' : '女' }} · {{ info.age }}岁<text>{{ info.city }}</text></view>
				</view>
			</view>
			<!-- <u-read-more class="note" :toggle="true" :show-height="60" :shadow-style="shadowStyle">
				<rich-text
					nodes="他很神秘，什么都没有写。他很神秘，什么都没有写。他很神秘，什么都没有写。他很神秘，什么都没有写。他很神秘，什么都没有写。他很神秘，什么都没有写。他很神秘，什么都没有写。他很神秘，什么都没有写。他很神秘，什么都没有写。他很神秘，什么都没有写。他很神秘，什么都没有写。他很神秘，什么都没有写。他很神秘，什么都没有写。他很神秘，什么都没有写。他很神秘，什么都没有写。他很神秘，什么都没有写。">
				</rich-text>
			</u-read-more> -->
			<view class="note">{{ info.introduce ? info.introduce : '他很神秘，什么都没有写。' }}</view>
			<view class="items d_flex">
				<view class="item" @click="toFavorite">
					<view class="num">{{ info.meLike ? info.meLike:0 }}</view>
					<view class="title">我喜欢</view>
				</view>
				<view class="item" @click="toFavorite">
					<view class="num">{{ info.likeMe }}</view>
					<view class="title">喜欢我</view>
				</view>
				<view class="item" @click="toWallet">
					<view class="num">{{ info.canUseMoney }}</view>
					<view class="title">钱包</view>
				</view>
			</view>
		</view>
		<view class="vip">
			<view class="vip_img">
				<image v-if="info.isVip === 2" src="@/static/images/mine/icon_bg.png" mode="" @click="toVipCenter">
				</image>
				<view v-else class="vip_img">
					<image src="@/static/images/mine/bg.png" mode=""></image>
					<view class="vip_info">
						季度VIP·有效期至{{ info.vipEndTime | date }}
						<text class="buy_text" @click="toVipCenter">立即续费</text>
					</view>
				</view>
			</view>
			<view class="photos d_flex flex_betewwen">
				<view>我的相册</view>
				<!-- <view class="">
					上传图片
				</view> -->
				<u-upload :custom-btn="true" ref="uUpload" :show-upload-list="showUploadList" :action="action"
					name="upload" :header="header" @on-success="onSuccess">
					<view slot="addBtn" class="d_flex" hover-class="slot-btn__hover" hover-stay-time="150">
						<u-icon size="28" name="../../static/images/mine/icon_shangchuan.png"></u-icon>
						<text style="margin-left: 10rpx;">上传相册/视频</text>
					</view>
				</u-upload>
			</view>
		</view>
		<view class="content action_box">
			<view class="ph_box">
				<scroll-view scroll-x="true" class="scroll-view-x" style="padding-top:10rpx"
					scroll-with-animation="true" v-if="info.photos&&info.photos.length > 0">
					<view class="d_flex">
						<view class="photo" v-for="(item, index) in info.photos" :key="index">
							<image :src="item" mode="" @tap="_previewImage(index)"></image>
						</view>
					</view>
				</scroll-view>
				<view v-else class="no_data">
					暂无照片<br />
					快去传最闪耀的照片、视频，展示你的魅力吧！
				</view>
			</view>
			<view class="invite d_flex flex_betewwen">
				<view class="in_left d_flex">
					<view class="l_icon">
						<image src="@/static/images/mine/icon_fuli.png" mode=""></image>
					</view>
					<view class="in_con">
						<view class="t_1">
							<text>邀请福利</text>邀请用户领红包
						</view>
						<view class="t_2">
							已有<text>5.6万</text>邀请成功
						</view>
					</view>
				</view>
				<view class="in_right" @click="toInviteCenter">
					查看福利 <u-icon size="20" name="../../static/images/mine/gengduo.png"></u-icon>
				</view>
			</view>
			<u-cell-group :border="false">
				<!-- <u-cell-item :titleStyle="titleStyle" >
					<u-icon slot="icon" size="34" name="../../static/images/mine/icon_1.png"></u-icon>
					<view slot="title">
						认证中心<text class="sub_title">认证后 女生更放心与你见面</text>
					</view>
				</u-cell-item> -->
				<u-cell-item title="我的动态" :titleStyle="titleStyle" @click="toMyDynamic" :border-bottom="false">
					<u-icon slot="icon" size="34" name="../../static/images/mine/icon_2.png"></u-icon>
				</u-cell-item>
				<u-cell-item title="客服助手" :titleStyle="titleStyle" value="遇到问题点击这里" :valueStyle="valueStyle"
					:border-bottom="false" @click="toCallCenter">
					<u-icon slot="icon" size="34" name="../../static/images/mine/icon_3.png"></u-icon>
				</u-cell-item>
				<!-- <u-cell-item title="我的评价" :titleStyle="titleStyle" >
					<u-icon slot="icon" size="34" name="../../static/images/mine/icon_4.png"></u-icon>
				</u-cell-item> -->
				<u-cell-item title="问题反馈" :titleStyle="titleStyle" @click="toFeedback" :border-bottom="false">
					<u-icon slot="icon" size="34" name="../../static/images/mine/icon_5.png"></u-icon>
				</u-cell-item>
				<!-- <u-cell-item :titleStyle="titleStyle" :border-bottom="false">
					<u-icon slot="icon" size="34" name="../../static/images/mine/icon_6.png"></u-icon>
					<view slot="title">
						绑定公众号<text class="sub_title">获取最新下载地址和同步消息到微信</text>
					</view>
				</u-cell-item> -->
				<u-cell-item :titleStyle="titleStyle" :border-bottom="false" @click="toSetting">
					<u-icon slot="icon" size="34" name="../../static/images/mine/icon_7.png"></u-icon>
					<view slot="title">
						设置
						<!-- <text class="sub_title">隐私和黑名单等更多</text> -->
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import indexBackgroundImage from '@/static/images/mine/bg11.png'
	import CommonModal from '@/components/publishModal/PublishModal.vue'
	import upload from '@/config/uploadFile.js'

	export default {
		components: {
			CommonModal
		},
		data() {
			return {
				headUrl: require('../../static/images/vip/icon_logo.png'),
				indexBackgroundImage: indexBackgroundImage,
				background: {
					background: 'rgba(255, 255, 255, 0)'
				},
				titleStyle: {
					'marginLeft': '10rpx',
					'color': '#333333',
					'fontSize': '32rpx',
					'fontWeight': '500'
				},
				valueStyle: {
					'color': '#888888',
					'fontSize': '22rpx',
				},
				info: {},
				showUploadList: false,
				action: upload.url,
				header: {
					token: ''
				},
				imgs: [],
				shadowStyle: {
					backgroundImage: "none",
					paddingTop: "0",
					marginTop: "20rpx"
				},
				city: ''
			}
		},
		onLoad() {
			let user = uni.getStorageSync('loginUser') ? uni.getStorageSync('loginUser') : null;
			if (user !== null) {
				this.header.token = user.token;
			}
		},
		onPageScroll(object) {
			if (object.scrollTop > 50) {
				this.background = {
					background: 'rgba(255, 255, 255, 1)'
				}
			} else {
				this.background = {
					background: 'rgba(255, 255, 255, 0)'
				}
			}
		},
		onShow() {
			this.city = uni.getStorageSync('city');
			this.getUserInfo();
		},
		onPullDownRefresh() {
			this.getUserInfo();
		},
		methods: {
			getUserInfo() {
				this.$api.getUserInfo().then(res => {
					if (res.code == 1) {
						let data = res.data[0];
						this.info = data;
						this.imgs = this.info.photos;
						uni.setStorageSync('info', data);
						uni.setStorageSync('isVip', data.isVip);
					}
					uni.stopPullDownRefresh();
				})
			},
			//设置
			toSetting() {
				uni.navigateTo({
					url: '../setting/index'
				})
			},
			//修改资料
			toUpdateInfo() {
				uni.navigateTo({
					url: '../setting/updateInfo/UpdateInfo'
				})
			},
			//意见反馈
			toFeedback() {
				uni.navigateTo({
					url: './feedback/Feedback'
				})
			},
			//客服中心
			toCallCenter() {
				uni.navigateTo({
					url: './callcenter/CallCenter'
				})
			},
			//我的动态
			toMyDynamic() {
				uni.navigateTo({
					url: './myDynamic/MyDynamic'
				})
			},
			//钱包
			toWallet() {
				uni.navigateTo({
					url: './wallet/Wallet'
				})
			},
			//我喜欢
			toFavorite() {
				uni.navigateTo({
					url: '../message/favorite/Favorite'
				})
			},
			//邀请中心
			toInviteCenter() {
				uni.navigateTo({
					url: '../invite/InviteCenter'
				})
			},
			//vip中心
			toVipCenter() {
				uni.navigateTo({
					url: '../vip/VipCenter'
				})
			},
			//上传图片
			onSuccess(data) {
				if (data.code == 1) {
					this.imgs.push(data.data[0]);
					let params = {
						id: this.info.id,
						photos: this.imgs,
					}
					this.$api.saveUserInfo(params).then(res => {
						if (res.code == 1) {
							this.$u.toast('保存成功');
							this.getUserInfo();
						}
					})
				}
			},
			//多图预览
			_previewImage(index) {
				let idx = index;
				let imgs = this.info.photos.map((item, index) => {
					return item;
				});
				if (imgs && imgs.length > 0) {
					uni.previewImage({
						current: imgs[idx],
						urls: imgs
					});
				}
			},
			//单图预览
			_previewSingleImage(image) {
				let imgArr = [];
				imgArr.push(image);
				//预览图片
				uni.previewImage({
					urls: imgArr,
					current: imgArr[0]
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/assets/mine.scss';
</style>
