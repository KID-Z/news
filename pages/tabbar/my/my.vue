<template>
	<view class="my">
		<view class="my-header">
			<view class="bg">
				<image :src="userInfo.avatar" mode="aspectFill"></image>
			</view>
			<view class="my-header-box">
				<view class="my-header-logo">
					<image :src="userInfo.avatar" mode="aspectFill"></image>
				</view>
				<text class="author-name">{{userInfo.author_name}}</text>
			</view>
			<view class="author-info">
				<view class="author-info-box">
					<text class="text-strong">关注</text>
					<text>{{userInfo.follow_count}}</text>
				</view>
				<view class="author-info-box">
					<text class="text-strong">粉丝</text>
					<text>{{userInfo.fans_count}}</text>
				</view>
				<view class="author-info-box">
					<text class="text-strong">积分</text>
					<text>{{userInfo.integral_count || 0}}</text>
				</view>
			</view>
		</view>
		<view class="func-class-list">
			<view class="func-item" @click="openMyArticle">
				<view class="func">
					<uni-icons type="contact" size="16" color="#666" class="icon"></uni-icons>
					<text>我的文章</text>
				</view>
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
			</view>
			<view class="func-item" @click="openFeedback">
				<view class="func">
					<uni-icons type="help" size="16" color="#666" class="icon"></uni-icons>
					<text>意见反馈</text>
				</view>
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		methods: {
			openMyArticle(){
				uni.navigateTo({
					url: '/pages/my-article/my-article'
				})
			},
			openFeedback(){
				uni.navigateTo({
					url: '/pages/feedback/feedback'
				})
			}
		}
	}
</script>

<style lang="scss">
page {
	background-color: #f5f5f5;
}
.my {
	.my-header {
		position: relative;
		padding-bottom: 15px;
		.bg{
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			filter: blur(8px);
			opacity: 0.3;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.my-header-box {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 30px;
			.my-header-logo {
				width: 60px;
				height: 60px;
				border-radius: 50%;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.author-name {
				margin-top: 15px;
				font-size: 16px;
				font-weight: bold;
			}
		}
		.author-info {
			margin-top: 15px;
			display: flex;
			.author-info-box {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 12px;
				color: #999;
				.text-strong {
					font-size: 14px;
					color: #333;
				}
			}
		}
	}
	.func-class-list{
		.func-item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 15px;
			margin-top: 10px;
			background-color: #fff;
			font-size: 14px;
			color: #333;
			.func {
				display: flex;
				align-items: center;
				.icon{
					margin-right: 5px;
				}
			}
		}
	}
}
</style>
