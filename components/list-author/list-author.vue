<template>
	<view class="list-author">
		<view class="author-img">
			<image :src="author.avatar" mode=""></image>
		</view>
		<view class="author-info">
			<view class="author-name">
				{{author.author_name}}
			</view>
			<view class="author-des">
				<view class="author-label">
					{{author.professional}}
				</view>
				<view class="author-des-info">
					<text class="mr">{{author.article_ids.length}}发帖</text>
					<text>{{author.follow_count}}粉丝</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "list-author",
		props:{
			author:{
				type: Object,
				default(){
					return {}
				}
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.list-author {
		display: flex;
		padding: 10px 0px;
		margin: 0px 15px;
		border-radius: 5px;
		border-bottom: 1px solid #f5f5f5;
		box-sizing: border-box;

		.author-img {
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

		.author-info {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 10px;

			.author-name {
				position: relative;
				padding-right: 30px;
				font-size: 14px;
				color: #333;
				font-weight: 500;
				line-height: 1.2;
			}

			.author-des {
				display: flex;
				justify-content: space-between;
				font-size: 12px;

				.author-label {
					color: #666;
				}
				.author-des-info {
					color: #999;
					line-height: 1.5;
					.mr {
						margin-right: 10px;
					}
				}
			}
		}
	}
</style>
