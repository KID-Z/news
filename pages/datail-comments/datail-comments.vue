<template>
	<view>
		<view class="datail-comment" v-for="(comment, index) in  commentsList" :key="comment.comment_id">
			<comments-box :comment="comment" :index="index" @reply="reply" />
		</view>
		<uni-load-more v-if="commentsList.length===0 && !noData || commentsList.length > 5" :status="loading" iconType="snow">
		</uni-load-more>
		<view class="no-data" v-if="noData">
			还没有评论哦
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
	import popup from '@/components/uni-popup/uni-popup.vue';
	export default {
		data() {
			return {
				articleId: null,
				commentsList: [],
				commentValue: '',
				replyFormObj: {},
				page: 1,
				pageSize: 5,
				loading: 'loading',
				counter: 1,
				noData: false,
			}
		},
		onLoad(e) {
			this.articleId = e.id;
			this.getComments();
		},
		onReachBottom() {
			if (this.loading === 'noMore') return;
			this.page++;
			this.getComments();
		},
		methods: {
			getComments() {
				this.$api.get_comments({
					article_id: this.articleId,
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					if (this.counter === 1 && res.data.length === 0) {
						this.noData = true;
					}
					if(this.counter < 3){
						this.counter++;
					}
					if (res.data.length === 0) {
						this.loading = 'noMore';
						this.$forceUpdate();
						return;
					}
					const oldCommentsList = JSON.parse(JSON.stringify(this.commentsList));
					oldCommentsList.push(...res.data);
					this.commentsList = oldCommentsList;
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
			},
			setUpdateComment(content) {
				uni.showLoading();
				const formData = {
					article_id: this.articleId,
					...content
				}
				console.log(formData)
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
		},
		components: {
			popup,
		}
	}
</script>

<style lang="scss">
	.datail-comment {
		padding: 0px 20px;
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
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 12px;
				color: #999;
			}
		}

	}

	.no-data {
		padding: 50px;
		font-size: 14px;
		color: #999;
		text-align: center;
	}
</style>
