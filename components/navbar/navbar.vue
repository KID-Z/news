<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<!-- 状态栏高度 -->
			<!-- #ifndef MP-ALIPAY -->
			<view :style="{height: statusBarHeight + 'px'}"></view>
			<!-- #endif -->
			<!-- 导航栏 -->
			<view class="navbar-content" :class="{isSearch: isSearch}"
				:style="{width: searchWidth + 'px',height: searchHeight + 'px'}" @click.stop="open">
				<view class="back-icon" v-if="isSearch" @click="back">
					<uni-icons type="back" size="22" color="#fff"></uni-icons>
				</view>
				<view class="navbar-search-box">
					<view class="search-icon">
						<uni-icons type="search" size="16" color="#999"></uni-icons>
					</view>
					<view class="search-text" v-if="!isSearch">
						<text>uni-app</text>
					</view>
					<view class="search-text" v-else>
						<input type="text" @input="changeVal" class="search-text" v-model="val"
							placeholder="请输入您要搜索的内容" />
					</view>
				</view>
			</view>
		</view>
		<view :style="{height:searchHeight + statusBarHeight +'px'}"></view>
	</view>
</template>

<script>
	export default {
		name: "navbar",
		props: {
			isSearch: {
				type: Boolean,
				default: false,
			},
			valSync: {
				type: [String, Number],
				default: ''
			}
		},
		data() {
			return {
				statusBarHeight: 20,
				searchHeight: 45,
				searchWidth: 375,
				timer: null,
				val: '',
			};
		},
		created() {
			const info = uni.getSystemInfoSync();
			this.searchWidth = info.screenWidth;
			this.statusBarHeight = info.statusBarHeight;

			// #ifndef H5|| APP-PLUS || MP-ALIPAY
			const capsule = uni.getMenuButtonBoundingClientRect();
			this.searchHeight = (capsule.bottom - info.statusBarHeight) + (capsule.top - info.statusBarHeight);
			this.searchWidth = capsule.left;
			// #endif

			// #ifdef MP-ALIPAY
			this.statusBarHeight = 0;
			// #endif
		},
		methods: {
			open() {
				if (this.isSearch) return;
				uni.navigateTo({
					url: '/pages/home-search/home-search'
				})
			},
			changeVal(e) {
				if (this.timer) {
					clearTimeout(this.timer);
				}
				this.timer = setTimeout(() => {
					clearTimeout(this.timer);
					this.$emit('searchArticle', this.val);
				}, 300)
			},
			back() {
				uni.switchTab({
					url: '../../pages/tabbar/index/index'
				})
			}
		},
		watch: {
			valSync() {
				this.val = this.valSync;
			}
		}
	}
</script>

<style lang="scss">
	.navbar {
		.navbar-fixed {
			position: fixed;
			z-index: 99;
			width: 100%;
			left: 0;
			top: 0;
			background-color: $mk-base-color;

			.navbar-content {
				padding: 0px 15px;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: center;

				.navbar-search-box {
					width: 100%;
					height: 30px;
					padding: 0px 10px;
					border-radius: 30px;
					background-color: #fff;
					display: flex;
					align-items: center;

					.search-icon {
						margin-right: 5px;
					}

					.search-text {
						width: 100%;
						font-size: 14px;
						line-height: 30px;
						color: #999;
					}
				}

				&.isSearch {
					padding-left: 0;

					.back-icon {
						display: flex;
						justify-content: center;
						align-items: center;
						margin-left: 5px;
						margin-right: 5px;
					}

					.navbar-search-box {
						border-radius: 5px;
					}
				}
			}
		}
	}
</style>
