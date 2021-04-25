<template>
	<view class="icon-like" @click.stop="changeTap">
		<uni-icons :type="like ? 'heart-filled' : 'heart'" size="20" color="#f07373"></uni-icons>
	</view>
</template>

<script>
	export default {
		name: "like",
		props: {
			item: {
				type: Object,
				default () {
					return {}
				}
			},
			types: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				like: false,
			};
		},
		created() {
			this.like = this.item.is_like;
		},
		watch: {
			item() {
				this.like = this.item.is_like;
			},
		},
		methods: {
			changeTap() {
				this.like = !this.like;
				this.updateLike()
			},
			updateLike() {
				uni.showLoading();
				this.$api.update_like({
					article_id: this.item._id,
				}).then(res => {
					uni.hideLoading()
					uni.showToast({
						title: this.like ? '收藏成功' : '取消收藏',
						icon: 'none'
					})
					uni.$emit('update_article-like', this.types);
				}).catch(err => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="scss">
	.icon-like {
		width: 20px;
		height: 20px;
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
