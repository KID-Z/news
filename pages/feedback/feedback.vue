<template>
	<view>
		<view class="feedback-title">
			意见反馈
		</view>
		<view class="feedback-content">
			<textarea class="feedback-textarea" v-model="content" placeholder="请输入您要反馈的问题" />
		</view>
		<view class="feedback-title">
			反馈图片:
		</view>
		<view class="feedback-image-box">
			<view class="feedback-image-item" v-for="(image, index) in imageList" :key="index">
				<view class="close-icon" @click="closeImage(index)">
					<uni-icons type="closeempty" size="18" color="#fff"></uni-icons>
				</view>
				<view class="image-box">
					<image :src="image.url" mode="aspectFill"></image>
				</view>
			</view>


			<view class="feedback-image-item" @click="chooseImage" v-if="imageList.length < 5">
				<view class="image-box">
					<uni-icons type="plusempty" size="50" color="#eee"></uni-icons>
				</view>
			</view>
		</view>
		<button class="feedback-button" type="primar" @click="submit">提交反馈意见</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageList: [],
				content: ''
			}
		},
		methods: {
			async submit() {
				if(!this.content){
					uni.showToast({
						title: '请输入内容',
						icon: 'none'
					})
					return;
				}
				uni.showLoading()
				const imagesPath = [];
				for (let i = 0; i < this.imageList.length; i++) {
					const image = this.imageList[i].url;
					const filePath = await this.uploadFiles(image);
					imagesPath.push(filePath);
				}
				this.setUpdateFeedback({
					content: this.content,
					feedbackImages: imagesPath
				})
			},
			async uploadFiles(filePath) {
				const result = await uniCloud.uploadFile({
					filePath: filePath,
					cloudPath: `${this.getID(5)}.png`
				})
				return result.fileID;
			},
			getID(length) {
				return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
			},
			setUpdateFeedback({
				content,
				feedbackImages
			}) {
				this.$api.update_feedback({
					content,
					feedbackImages
				}).then(res => {
					uni.hideLoading()
					uni.showToast({
						title: '反馈提交成功',
						icon: 'none'
					})
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/tabbar/my/my'
						})
						this.content = '';
					}, 2000)
				}).catch(err => {
					uni.hideLoading()
					uni.showToast({
						title: '反馈提交失败',
						icon: 'none'
					})
				})
			},
			chooseImage() {
				const count = 5 - this.imageList.length
				uni.chooseImage({
					count,
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						tempFilePaths.forEach((item, index) => {
							// 处理h5多选 情况
							if (index < count) {
								this.imageList.push({
									url: item
								});
							}
						})
					}
				})
			},
			closeImage(index) {
				this.imageList.splice(index, 1);
			}
		}
	}
</script>

<style lang="scss">
	.feedback-title {
		margin: 15px;
		margin-bottom: 0;
		font-size: 14px;
		color: #666;
	}

	.feedback-content {
		margin: 15px;
		padding: 10px;
		box-sizing: border-box;
		border: 1px solid #eee;

		.feedback-textarea {
			width: 100%;
			height: 100px;
			font-size: 12px;
		}
	}

	.feedback-image-box {
		display: flex;
		flex-wrap: wrap;
		padding: 10px;

		.feedback-image-item {
			position: relative;
			width: 33.33%;
			height: 0;
			padding-top: 33.33%;
			box-sizing: border-box;

			.close-icon {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				right: 0;
				top: 0;
				width: 22px;
				height: 22px;
				border-radius: 50%;
				background-color: #ff5a5f;
				z-index: 2;
			}

			.image-box {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				top: 5px;
				bottom: 5px;
				left: 5px;
				right: 5px;
				border: 1px solid #eee;
				border-radius: 5px;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.feedback-button {
		margin: 0px 15px;
		color: #fff;
		background-color: $mk-base-color;
	}
</style>
