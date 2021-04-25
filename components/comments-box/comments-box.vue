<template>
	<view class="comment" :class="{'comment-border-top': !is_reply && index !== 0}">
		<view class="comment-header">
			<view class="comment-header-logo">
				<image :src="comment.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="comment-header-info">
				<view class="comment-author-name" v-if="!is_reply">
					{{comment.author.author_name}}
				</view>
				<view class="comment-author-name" v-else>
					{{comment.author.author_name}}<text
						class="reply">回复</text>{{comment.author.author_name === comment.to?'自己':comment.to}}
				</view>
				<view class="comment-create-time">
					{{comment.create_time | setDateFormat}}
				</view>
			</view>
		</view>
		<view class="comment-content">
			<view> {{comment.comment_content}}</view>
			<view class="comment-info">
				<view class="reply-btn" @click="commentReply({comment, is_reply})">
					回复
				</view>
			</view>
			<view class="reply-content" v-for="item in comment.replys">
				<comments-box :is_reply="true" :comment="item" @reply="commentReply" />
			</view>
		</view>
	</view>
</template>

<script>
	import commentsBox from '@/components/comments-box/comments-box.vue'
	export default {
		name: "comments-box",
		props: {
			comment: {
				type: Object,
				default () {
					return {}
				}
			},
			index:{
				type: [Number,String],
				default: null,
			},
			is_reply: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {

			};
		},
		filters: {
			setDateFormat(time) {
				const date = new Date(+time);
				const y = date.getFullYear();
				const m = date.getMonth() + 1;
				const d = date.getDate();
				const h = date.getHours();
				const f = date.getMinutes();
				const s = date.getSeconds();
				return `${y}.${m}.${d} ${h.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
			}
		},
		methods: {
			commentReply(comment) {
				if (comment.is_reply) {
					comment.comment.reply_id = comment.comment.comment_id;
					comment.comment.comment_id = this.comment.comment_id;
				}
				this.$emit('reply', comment);
			}
		},
		components: {
			commentsBox,
		}
	}
</script>

<style lang="scss">
	.comment {
		padding: 20px 0px;
		&.comment-border-top {
			border-top: 1px solid #eee;
		}
		.comment-header {
			display: flex;
			.comment-header-logo {
				width: 30px;
				height: 30px;
				border-radius: 5px;
				overflow: hidden;
				flex-shrink: 0;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.comment-header-info {
				display: flex;
				flex-direction: column;
				margin-left: 15px;
				font-size: 12px;
				color: #999;
				line-height: 1;

				.comment-author-name {
					margin-bottom: 10px;
					font-size: 14px;
					color: #333;

					.reply {
						margin: 0px 10px;
						font-weight: 600;
					}
				}
			}
		}

		.comment-content {
			margin-top: 10px;
			font-size: 14px;
			color: #000;

			.comment-info {
				margin-top: 15px;
				display: flex;

				.reply-btn {
					padding: 2px 10px;
					font-size: 12px;
					color: #999;
					border-radius: 20px;
					border: 1px solid #ccc;
				}
			}

			.reply-content {
				margin: 15px 0;
				padding: 0px 10px;
				border: 1px solid #eee;
			}
		}
	}
</style>
