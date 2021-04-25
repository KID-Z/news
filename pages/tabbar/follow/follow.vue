<template>
	<view class="follow">
		<view class="follow-tab">
			<view class="follow-tab-box">
				<view class="follow-tab-item" :class="{active: activeIndex===0}" @click="tab(0)">文章</view>
				<view class="follow-tab-item" :class="{active: activeIndex===1}" @click="tab(1)">作者</view>
			</view>
		</view>
		<view class="follow-list">
			<swiper class="follow-swiper" :current="activeIndex" @change="changeIndex">
				<swiper-item class="follow-swiper-item">
					<list-scroll>
						<uni-load-more v-if="list.length===0 && !noData" iconType="snow" status="loading">
						</uni-load-more>
						<view class="no-data" v-if="noData">
							没有收藏文章哦
						</view>
						<list-card types="follow" v-for="(item,index) in list" :key="item.id" :item="item"></list-card>
					</list-scroll>
				</swiper-item>
				<swiper-item class="follow-swiper-item">
					<list-scroll>
						<view class="no-data" v-if="noAuthor">
							还没有关注作者哦
						</view>
						<list-author v-for="author in authorList" :key="author.id" :author="author"></list-author>
					</list-scroll>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: 0,
				list: [],
				authorList: [],
				noData: false,
				noAuthor: false
			}
		},
		onLoad() {
			uni.$on('update_article-like', () => {
				this.getFollowList()
			})
			uni.$on('update_author', () => {
				this.getAuthor();
			})
			this.getFollowList();
			this.getAuthor();
		},
		methods: {
			tab(index) {
				this.activeIndex = index;
			},
			getFollowList() {
				this.$api.get_follow().then(res => {
					this.list = res.data;
					this.noData = this.list.length === 0 ? true : false;
				})
			},
			getAuthor() {
				this.$api.get_author().then(res => {
					this.authorList = res.data;
					this.noAuthor = this.authorList.length === 0 ? true : false;
				})
			},
			changeIndex(e) {
				const {
					current
				} = e.detail;
				this.activeIndex = current;
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}

	.follow {
		flex: 1;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;

		.follow-tab {
			height: 30px;
			padding: 10px 20px;
			border: 1px solid #f5f5f5;

			.follow-tab-box {
				width: 100%;
				height: 100%;
				border-radius: 5px;
				border: 1px solid $mk-base-color;
				display: flex;

				.follow-tab-item {
					width: 100%;
					display: flex;
					justify-content: center;
					font-size: 14px;
					align-items: center;
					color: #666;

					&:first-child {
						border-right: 1px solid $mk-base-color;
					}

					&.active {
						color: $mk-base-color;
					}
				}
			}
		}

		.follow-list {
			height: 100%;
			flex: 1;

			.follow-swiper {
				height: 100%;

				.follow-swiper-item {
					height: 100%;
				}
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
