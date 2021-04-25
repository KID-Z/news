<template>
	<view class="datail">
		<view class="datail-title">
			<text>{{formData.title}}</text>
		</view>
		<view class="datail-header-content">
			<view class="author-avatar">
				<image :src="formData.author.avatar"></image>
			</view>
			<view class="datail-header-info">
				<view class="author-name">
					{{formData.author.author_name}}
				</view>
				<view class="datail-info">
					<text>{{formData.create_time}}</text>
					<text>{{formData.browse_count}}浏览</text>
					<text>{{formData.thumbs_up_count}}赞</text>
				</view>
			</view>
			<button class="follow" @click="follow(formData.author.id)">{{formData.is_author_like?'取消关注':'关注'}}</button>
		</view>
		<view class="article-content">
			<view class="article-content-html">
				<uParse :content="formData.content" :noData="noData" />
			</view>
			<view class="datail-comment" v-if="formData.content && commentsList.length > 0">
				<view class="comment-title">
					最新评论
				</view>
				<view v-if="is_comment">
					<view class="comment-content" v-for="(comment, index) in  commentsList" :key="comment.comment_id">
						<comments-box :comment="comment" :index="index" @reply="reply" />
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-toolbar">
			<view class="input-box" @click="openComment">
				<text>谈谈您的看法</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>
			<view class="icons">
				<view class="icons-box">
					<uni-icons type="chat" size="22" color="#f07373" @click="openDatailComment(formData._id)">
					</uni-icons>
				</view>
				<view class="icons-box">
					<uni-icons :type="formData.is_like ? 'heart-filled' : 'heart'" size="22" color="#f07373"
						@click="setUpdateArticleLike(formData._id)"></uni-icons>
				</view>
				<view class="icons-box">
					<uni-icons :type="formData.is_thumbs_up ?'hand-thumbsup-filled':'hand-thumbsup'" size="22"
						color="#f07373" @click="thumbsUp(formData._id)">
					</uni-icons>
				</view>
			</view>
		</view>
		<popup type="bottom" ref="popup">
			<view class="popup">
				<view class="popup-header">
					<view class="popup-header-item" @click="close">
						取消
					</view>
					<view class="popup-header-item" @click="submit">
						发布
					</view>
				</view>
				<view class="popup-content">
					<textarea class="textarea" fixed v-model="commentValue" maxlength="200" placeholder="请输入评论内容" />
					<view class="count-num">
						{{commentValue.length}}/200
					</view>
				</view>
			</view>
		</popup>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue';
	import popup from '@/components/uni-popup/uni-popup.vue';
	export default {
		data() {
			return {
				formData: {},
				noData: '<p style="text-align:center;color:#666">详情加载中...</p>',
				commentValue: '',
				commentsList: [],
				replyFormObj: {},
				is_comment: false,
			}
		},
		onLoad(e) {
			this.formData = JSON.parse(e.params);
			this.getDatail(this.formData._id);
			this.getComments();
		},
		methods: {
			openDatailComment(id) {
				uni.navigateTo({
					url: '/pages/datail-comments/datail-comments?id=' + id
				})
			},
			thumbsUp(id) {
				uni.showLoading();
				this.$api.thumbsup({
					article_id: id
				}).then(res => {
					uni.hideLoading()
					if (!this.formData.is_thumbs_up) {
						this.formData.is_thumbs_up = true;
						this.formData.thumbs_up_count++;
					}
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})

				})
			},
			setUpdateArticleLike(id) {
				uni.showLoading();
				this.$api.update_like({
					article_id: id,
				}).then(res => {
					uni.hideLoading()
					this.formData.is_like = !this.formData.is_like;
					uni.$emit('update_article-like', 'follow');
					uni.showToast({
						title: this.formData.is_like ? '收藏成功' : '取消收藏',
						icon: 'none'
					})
				}).catch(err => {
					uni.hideLoading()
				})
			},
			// 关注
			follow(author_id) {
				uni.showLoading()
				this.$api.update_author({
					author_id
				}).then(res => {
					uni.hideLoading();
					uni.showToast({
						title: this.formData.is_author_like ? '已取消关注' : '关注成功',
						icon: 'none'
					})
					uni.$emit('update_author');
					this.formData.is_author_like = !this.formData.is_author_like;
				}).catch(() => {
					uni.hideLoading();
				})
			},
			reply(e) {
				this.replyFormObj = {
					comment_id: e.comment.comment_id,
					is_reply: e.is_reply,
				}
				if (e.is_reply) {
					this.replyFormObj.reply_id = e.comment.reply_id;
				}
				this.openComment();
			},
			getDatail(id) {
				this.$api.get_datail({
					article_id: id
				}).then(res => {
					const {
						data
					} = res;
					this.formData = data;
				})
			},
			getComments() {
				this.is_comment = false;
				this.$api.get_comments({
					article_id: this.formData._id
				}).then(res => {
					this.commentsList = res.data;
					this.is_comment = true;
				})
			},
			setUpdateComment(content) {
				uni.showLoading();
				const formData = {
					article_id: this.formData._id,
					...content
				}
				this.$api.update_comment(formData).then(res => {
					uni.hideLoading();
					uni.showToast({
						title: '发布成功'
					})
					this.getComments();
					this.close();
					this.replyFormObj = {}
					this.commentValue = '';
				}).catch((err) => {
					uni.hideLoading();
					console.log(err)
				})
			},
			openComment() {
				this.$refs.popup.open();
			},
			close() {
				this.$refs.popup.close();
			},
			submit() {
				if (!this.commentValue) {
					uni.showToast({
						title: '没有评论内容哦',
						icon: 'none'
					})
					return;
				}
				this.setUpdateComment({
					content: this.commentValue,
					...this.replyFormObj
				});
			}
		},
		components: {
			uParse,
			popup
		}
	}
</script>

<style lang="scss">
	.datail {
		padding: 15px 0px;
		padding-bottom: 54px;

		.datail-title {
			padding: 0px 15px;
			font-size: 18px;
			font-weight: bold;
			color: #333;
		}

		.datail-header-content {
			margin-top: 10px;
			padding: 0px 15px;
			display: flex;

			.author-avatar {
				flex-shrink: 0;
				width: 40px;
				height: 40px;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.datail-header-info {
				width: 100%;
				font-size: 12px;
				margin-left: 10px;

				.author-name {
					font-size: 14px;
					color: #333;
				}

				.datail-info {
					color: #999;

					text {
						margin-right: 10px;
					}
				}
			}

			.follow {
				flex-shrink: 0;
				padding: 0px 15px;
				height: 30px;
				line-height: 30px;
				border-radius: 5px;
				font-size: 12px;
				background-color: $mk-base-color;
				color: #fff;
			}
		}

		.article-content {
			min-height: 500px;
			margin-top: 20px;
			box-sizing: border-box;

			.article-content-html {
				padding: 0px 15px;
			}

			.datail-comment {
				margin-top: 30px;

				.comment-title {
					padding: 8px 15px;
					line-height: 30px;
					font-size: 14px;
					border-bottom: 1px solid #eee;
					color: #666;
				}

				.comment-content {
					padding: 0px 15px;
				}
			}
		}

		.bottom-toolbar {
			width: 100%;
			height: 44px;
			border-top: 1px solid #f5f5f5;
			background-color: #fff;
			position: fixed;
			left: 0;
			bottom: 0;
			display: flex;
			align-items: center;

			.input-box {
				width: 100%;
				height: 30px;
				margin-left: 10px;
				padding: 0px 10px;
				border: 1px solid #ddd;
				border-radius: 5px;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: space-between;

				text {
					font-size: 14px;
					color: #999;
				}
			}

			.icons {
				padding: 0px 10px;
				display: flex;
				flex-shrink: 0;

				.icons-box {
					width: 44px;
					position: relative;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}

	.popup {
		background-color: #fff;

		.popup-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 14px;
			color: #666;
			border-bottom: 1px solid #F5F5F5;

			.popup-header-item {
				height: 50px;
				padding: 0px 15px;
				line-height: 50px;
			}
		}

		.popup-content {
			width: 100%;
			padding: 15px;
			box-sizing: border-box;

			.textarea {
				width: 100%;
				height: 200px;
				box-sizing: border-box;
			}

			.count-num {
				width: 100%;
				background-color: #fff;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 12px;
				color: #999;
			}
		}
	}
</style>
