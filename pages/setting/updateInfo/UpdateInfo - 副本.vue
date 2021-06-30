<template>
	<view class="UserInfo">
		<u-navbar title="修改资料" :borderBottom="false">
			<view slot="right" class="right_icon" @click="saveUserInfo">保存</view>
		</u-navbar>
		<!-- <view class="progress d_flex">
			<view class="pro_tit">完成度</view>
			<u-line-progress :percent="70" :round="true" active-color="#B46628"></u-line-progress>
		</view> -->
		<view class="picture_box">
			<view class="picture">
				<image :src="headUrl"></image>
				<u-upload :action="action" ref="uUpload" max-count="1" :header="header" :file-list="fileList"
					width="120" height="120" border-radius="50%" upload-text="" :show-progress="false"
					:deletable="false" name="upload" :before-upload="beforeUpload" max-size="10*1024*1024"
					@on-success="onSuccess" @on-error="onErrors"></u-upload>
				<view class="pic_icon">
					<image src="@/static/images/mine/camera.png" mode=""></image>
				</view>
			</view>
		</view>
		<u-form :model="form" :border-bottom="borderBottom" :label-style="labelStyle">
			<view class="item">
				<view class="h2">基本资料</view>
				<view class="cut_line"></view>
				<u-form-item label="昵称" label-width="180" :border-bottom="borderBottom">
					<u-input v-model="form.nickName" placeholder="请输入昵称" :clearable="clearable"></u-input>
				</u-form-item>
				<u-form-item label="生日" label-width="180" :border-bottom="borderBottom">
					<u-input v-model="form.birthday" :type="type" placeholder="选择生日" @click="birthShow = true">
					</u-input>
					<u-picker v-model="birthShow" mode="time" @confirm="birthChange"></u-picker>
				</u-form-item>
				<u-form-item label="身高" label-width="180" :border-bottom="borderBottom">
					<u-input v-model="form.height" :type="type" placeholder="选择身高" @click="heightShow = true"></u-input>
					<u-select v-model="heightShow" title="选择身高" :list="heigtList" @confirm="heightChange"
						:safe-area-inset-bottom="true" confirm-color="#B46628"></u-select>
				</u-form-item>
				<u-form-item label="体重" label-width="180" :border-bottom="borderBottom">
					<u-input v-model="form.weight" :type="type" placeholder="选择体重" @click="weightShow = true"></u-input>
					<u-select v-model="weightShow" title="选择体重" :list="weightList" @confirm="weightChange"
						:safe-area-inset-bottom="true" confirm-color="#B46628"></u-select>
				</u-form-item>
				<u-form-item label="从事职业" label-width="180" :border-bottom="borderBottom">
					<u-input v-model="form.occupation" :type="type" placeholder="选择从事职业" @click="workShow = true">
					</u-input>
					<u-select v-model="workShow" title="选择职业" :list="workList" @confirm="workChange"
						:safe-area-inset-bottom="true" confirm-color="#B46628"></u-select>
				</u-form-item>
				<u-form-item label="个人简介" label-position="top" :border-bottom="borderBottom">
					<u-input v-model="form.introduce" type="textarea" :border="border" :height="height"
						:auto-height="autoHeight" placeholder="输入您的个人简介" :clearable="clearable"></u-input>
				</u-form-item>
			</view>
			<view class="item">
				<view class="h2">更多介绍</view>
				<view class="cut_line"></view>
				<u-form-item label="身材" label-width="180" :border-bottom="borderBottom">
					<u-input v-model="form.figure" :type="type" placeholder="选择身材" @click="statureShow = true">
					</u-input>
					<u-select v-model="statureShow" title="选择身材" :list="statureList" @confirm="statureChange"
						:safe-area-inset-bottom="true" confirm-color="#B46628"></u-select>
				</u-form-item>
				<u-form-item label="感情状况" label-width="180" :border-bottom="borderBottom">
					<u-input v-model="form.feeling" :type="type" placeholder="选择感情状态" @click="relationShow=true">
					</u-input>
					<u-select v-model="relationShow" title="选择感情状态" :list="relationList" @confirm="relationChange"
						:safe-area-inset-bottom="true" confirm-color="#B46628"></u-select>
				</u-form-item>
				<u-form-item label="孩子" label-width="180" :border-bottom="borderBottom">
					<u-input v-model="form.children" :type="type" placeholder="选择有无孩子" @click="childShow = true">
					</u-input>
					<u-select v-model="childShow" title="选择有无孩子" :list="childList" @confirm="childChange"
						:safe-area-inset-bottom="true" confirm-color="#B46628"></u-select>
				</u-form-item>
				<u-form-item label="学历" label-width="180" :border-bottom="borderBottom">
					<u-input v-model="form.education" :type="type" placeholder="选择学历" @click="educationShow = true">
					</u-input>
					<u-select v-model="educationShow" title="选择学历" :list="educationList" @confirm="educationChange"
						:safe-area-inset-bottom="true" confirm-color="#B46628"></u-select>
				</u-form-item>
				<u-form-item label="年收入" label-width="180" :border-bottom="borderBottom">
					<u-input v-model="form.income" :type="type" placeholder="选择年收入" @click="incomeShow = true">
					</u-input>
					<u-select v-model="incomeShow" title="选择年收入" :list="incomeList" @confirm="incomeChange"
						:safe-area-inset-bottom="true" confirm-color="#B46628"></u-select>
				</u-form-item>
				<u-form-item label="抽烟" label-width="180" :border-bottom="borderBottom">
					<u-input v-model="isSmokingText" :type="type" placeholder="选择是否抽烟" @click="isSmokeShow=true">
					</u-input>
					<u-select v-model="isSmokeShow" title="选择是否抽烟" :list="isSmokeList" @confirm="isSmokeChange"
						:safe-area-inset-bottom="true" confirm-color="#B46628"></u-select>
				</u-form-item>
				<u-form-item label="饮酒" label-width="180" :border-bottom="borderBottom">
					<u-input v-model="isDrinkText" :type="type" placeholder="选择是否喝酒" @click="isDrinkShow=true">
					</u-input>
					<u-select v-model="isDrinkShow" title="选择是否喝酒" :list="isDrinkList" @confirm="isDrinkChange"
						:safe-area-inset-bottom="true" confirm-color="#B46628"></u-select>
				</u-form-item>
			</view>
			<view class="item">
				<view class="h2">兴趣爱好</view>
				<view class="cut_line"></view>
				<view class="d_flex" style="flex-wrap: wrap;">
					<view class="interest" v-for="(inter, i) in interests" :key="i">
						{{ inter }}
					</view>
					<view v-show="interests.length < 6" class="interest" @click="toInterestList">
						＋添加兴趣
					</view>
				</view>

			</view>
			<view class="item">
				<view class="h2">相册</view>
				<view class="cut_line"></view>
				<u-form-item prop="albums">
					<u-upload ref="albUpload" :file-list="albumList" :max-size="5 * 1024 * 1024" name="upload"
						upload-text="" max-count="9" @on-remove="onRemove" :beforeUpload="beforeUploadAlbums">
					</u-upload>
				</u-form-item>
			</view>
		</u-form>
	</view>
</template>

<script>
	import {
		putObject,
		renameFile
	} from "@/utils/upload.js";
	export default {
		data() {
			return {
				header: {
					token: '',
				},
				fileList: [],
				albumList: [],
				headUrl: require('@/static/images/vip/icon_logo.png'),
				clearable: false,
				borderBottom: false,
				form: {
					avatarUrl: '',
					birthday: '',
					nickName: '',
					height: '',
					weight: '',
					occupation: '',
					introduce: '',
					figure: '',
					feeling: '',
					children: '',
					education: '',
					income: '',
					isSmoking: '',
					isDrink: ''
				},
				isSmokingText: '',
				isDrinkText: '',
				border: true,
				type: 'select',
				height: 180,
				autoHeight: true,
				labelStyle: {
					color: '#666666',
				},
				birthShow: false,
				heightShow: false,
				heigtList: [],
				weightShow: false,
				weightList: [],
				workShow: false,
				workList: [],
				statureShow: false,
				statureList: [],
				relationShow: false,
				relationList: [{
					value: '单身',
					label: '单身'
				}, {
					value: '离异',
					label: '离异'
				}],
				childShow: false,
				childList: [{
					value: 1,
					label: '有'
				}, {
					value: 2,
					label: '无'
				}],
				educationShow: false,
				educationList: [],
				incomeShow: false,
				incomeList: [],
				isSmokeShow: false,
				isSmokeList: [{
					value: 1,
					label: '抽烟者'
				}, {
					value: 2,
					label: '非抽烟者'
				}],
				isDrinkShow: false,
				isDrinkList: [{
					value: 1,
					label: '饮酒'
				}, {
					value: 2,
					label: '不饮酒'
				}],
				interests: [],
				user: null
			}
		},
		onLoad() {
			this.user = uni.getStorageSync('loginUser') ? uni.getStorageSync('loginUser') : null;
			if (this.user !== null) {
				this.header.token = this.user.token;
			}
			this.init();
		},
		methods: {
			init() {
				this.getHeightList();
				this.getWeightList();
				this.getWorkList();
				this.getStatureList();
				this.getEducationList();
				this.getIncomeList();
				this.getUserInfo();
			},
			getUserInfo() {
				this.$api.getUserInfo().then(res => {
					if (res.code == 1) {
						let data = res.data[0];
						uni.setStorageSync('info', data);
						if (data.avatarUrl !== undefined) {
							this.headUrl = data.avatarUrl;
							this.form.avatarUrl = data.avatarUrl;
						}
						this.form.nickName = data.nickName;
						this.form.birthday = this.$u.date(data.birthday);
						this.form.height = data.height;
						this.form.weight = data.weight;
						this.form.occupation = data.occupation;
						this.form.introduce = data.introduce;
						this.form.figure = data.figure;
						this.form.feeling = data.feeling;
						this.form.children = data.children;
						this.form.education = data.education;
						this.form.income = data.income;
						this.form.isSmoking = data.isSmoking;
						this.form.isDrink = data.isDrink;
						this.form.photos = data.photos;
						this.interests = data.interests;
						if (data.isSmoking) {
							this.isSmokingText = data.isSmoking === 1 ? '抽烟者' : '非抽烟者';
						}
						if (data.isDrink) {
							this.isDrinkText = data.isDrink === 1 ? '喝酒' : '不喝酒';
						}
						this.albumList = data.photos.map(function(value) {
							return {
								'url': value
							};
						})
					}
				})
			},
			//保存
			saveUserInfo() {
				let imgs = this.getAlbumUploadList();
				this.form.photos = imgs.concat(this.form.photos);
				this.form.id = this.user.id;

				this.$api.saveUserInfo(this.form).then(res => {
					if (res.code == 1) {
						this.$u.toast(res.msg);
						let pages = getCurrentPages();
						let beforePage = pages[pages.length - 2];
						if (beforePage && beforePage.route == 'pages/mine/index') {
							// #ifdef H5
							beforePage.getUserInfo();
							// #endif
							// #ifndef H5
							beforePage.$vm.getUserInfo();
							// #endif
						}
					}
				})
			},
			// onSuccess(data) {
			// 	//图片路径
			// 	let imgUrl = data.data[0];
			// 	this.$refs.uUpload.clear();
			// 	this.form.avatarUrl = imgUrl;
			// },
			onRemove(index, lists) {
				this.form.photos.splice(index, 1);
			},
			onErrors(res) {
				console.log("err", res);
			},
			beforeUpload(index, list) {
				this.fileList = [];
				const newFile = renameFile(list[index].file);
				putObject(newFile).then((res) => {
					if (res.statusCode == 200) {
						// 上传成功
						this.$refs.uUpload.clear();
						this.headUrl = "http://" + res.Location;
						this.form.avatarUrl = "http://" + res.Location;
						// this.headUrl = list[0].file.path;
					}
				});
				this.headUrl = list[0].file.path;
			},
			//上传前钩子 --相册
			beforeUploadAlbums(index, list) {
				const newFile = renameFile(list[index].file);
				putObject(newFile).then((res) => {
					if (res.statusCode == 200) {
						// 上传成功
						list[index].response = "http://" + res.Location;
						list[index].progress = 100;
						list[index].error = false;
						return false;
					}
				});
			},
			//生日
			birthChange(e) {
				this.form.birthday = e.year + "-" + e.month + "-" + e.day;
			},
			//身高
			heightChange(e) {
				this.form.height = e[0].value;
			},
			//体重
			weightChange(e) {
				this.form.weight = e[0].value;
			},
			//职业
			workChange(e) {
				this.form.occupation = e[0].value;
			},
			//身材
			statureChange(e) {
				this.form.figure = e[0].value;
			},
			//感情状况
			relationChange(e) {
				this.form.feeling = e[0].value;
			},
			//有无孩子
			childChange(e) {
				this.form.children = e[0].value === 1 ? '有' : '无';
			},
			//学历
			educationChange(e) {
				this.form.education = e[0].value;
			},
			//年收入
			incomeChange(e) {
				this.form.income = e[0].value;
			},
			//是否抽烟
			isSmokeChange(e) {
				this.form.isSmoking = e[0].value;
				this.isSmokingText = e[0].label;
			},
			//是否饮酒
			isDrinkChange(e) {
				this.form.isDrink = e[0].value;
				this.isDrinkText = e[0].label;
			},
			//兴趣爱好
			toInterestList() {
				this.saveUserInfo();
				uni.navigateTo({
					url: '../interest/Interests'
				})
			},
			//获取相册上传列表
			getAlbumUploadList() {
				let fileList = [];
				let nameFiles = [];
				fileList = this.$refs.albUpload.lists.filter(val => {
					return val.progress == 100;
				})
				if (fileList.length > 0) {
					for (let i = 0; i < fileList.length; i++) {
						if (fileList[i].response) {
							// nameFiles.push(fileList[i].response.data[0]);
							nameFiles.push(fileList[i].response);
						}
					}
				}
				return nameFiles;
			},
			//获取身高列表
			getHeightList() {
				for (let i = 150; i <= 190; i++) {
					let array = [];
					array.label = i + 'cm';
					array.value = i + 'cm';
					this.heigtList.push(array);
				}
			},
			//获取体重列表
			getWeightList() {
				for (let i = 40; i <= 80; i++) {
					let array = [];
					array.label = i + 'kg';
					array.value = i + 'kg';
					this.weightList.push(array);
				}
			},
			//获取职业列表
			getWorkList() {
				let temp = ['互联网', '金融', '娱乐', '学生', '自由职业'];
				this.commonArray(temp, this.workList);
			},
			//获取身材列表
			getStatureList() {
				let temp = ['精壮', '匀称', '偏瘦', '偏胖'];
				this.commonArray(temp, this.statureList);
			},
			//获取学历列表
			getEducationList() {
				let temp = ['专科', '本科', '硕士', '博士'];
				this.commonArray(temp, this.educationList);
			},
			//获取年收入列表
			getIncomeList() {
				let temp = ['小于20W', '大于20W'];
				this.commonArray(temp, this.incomeList);
			},
			commonArray(temp, list) {
				for (let i = 0; i < temp.length; i++) {
					let array = [];
					array.label = temp[i];
					array.value = temp[i];
					list.push(array);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.UserInfo {
		padding: 32rpx;
	}

	.right_icon {
		background-color: #B46628;
		color: #FFFFFF;
		margin-right: 32rpx;
		font-size: 24rpx;
		padding: 8rpx 28rpx;
		border-radius: 40rpx;
	}

	.picture_box {
		text-align: center;
		margin: 50rpx 0;

		.picture {
			width: 200rpx;
			height: 200rpx;
			margin: 0 auto;
			position: relative;

			image {
				border-radius: 50%;
			}

			/deep/.u-list-item {
				width: 200rpx !important;
				height: 200rpx !important;
				margin: 0 auto;
				border-radius: 50%;
				border: none;
				position: absolute;
				top: 0;
				left: 0;
				filter: alpha(opacity=0);
				/*支持 IE 浏览器*/
				-moz-opacity: 0;
				/*支持 FireFox 浏览器*/
				-khtml-opacity: 0;
				/*webkit内核浏览器*/
				opacity: 0;
				/*支持 Chrome, Opera, Safari 等浏览器*/
			}

			.pic_icon {
				position: absolute;
				bottom: 0;
				right: 16rpx;
				width: 40rpx;
				height: 40rpx;
			}
		}
	}

	.item {
		color: #333333;
		margin-bottom: 40rpx;

		.h2 {
			font-size: 36rpx;
			font-weight: 500;
		}

		.interest {
			height: 60rpx;
			padding: 0 30rpx;
			line-height: 60rpx;
			text-align: center;
			color: #B46628;
			font-size: 24rpx;
			background-color: #E5E5E5;
			border-radius: 30rpx;
			margin-top: 40rpx;
			margin-right: 30rpx;
		}

		/deep/.u-list-item {
			width: 158rpx !important;
			height: 254rpx !important;
			margin: 10rpx 7rpx;
		}

		/deep/.uicon-plus {
			color: #B46628;
		}
	}

	.u-form-item {
		padding: 0;
	}

	/deep/.u-input {
		.u-input__right-icon--select {
			display: none;
		}
	}


	.progress {
		.pro_tit {
			flex-shrink: 0;
			color: #333333;
			font-size: 24rpx;
			margin-right: 14rpx;
		}
	}
</style>
