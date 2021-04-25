<template>
	<view class="home">
		<navbar :isSearch="true" :valSync="valSync" @searchArticle="searchArticle"></navbar>
		<view class="search-history-box" v-if="!showSearchRes">
			<view class="search-history-header">
				<text class="title">搜索历史</text>
				<text class="clear" @click="clearSearchHistory">清空</text>
			</view>
			<view class="search-history--label" v-if="searchHistory.length > 0 && !showSearchRes">
				<view class="item" v-for="item in searchHistory" @click="clickSearch(item)">
					{{item}}
				</view>
			</view>
			<view class="no-history" v-else>
				没有搜索历史
			</view>
		</view>
		<uni-load-more v-if="loading" status="loading" iconType="snow">
		</uni-load-more>
		<list-scroll v-if="searcResList.length > 0 && !loading">
			<list-card @addSearchhistory="addSearchhistory" v-for="(item,index) in searcResList" :key="item.id"
				:item="item"></list-card>
		</list-scroll>
		<view class="no-history" v-if="searcResList.length === 0 && !loading && showSearchRes">
			没有搜索到相关文章
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				showSearchRes: false,
				searcResList: [],
				loading: false,
				value: '',
				valSync: '',
			}
		},
		computed: {
			...mapState(['searchHistory'])
		},
		methods: {
			searchArticle(val) {
				if (!val) {
					this.searcResList = [];
					this.showSearchRes = false;
					return;
				}
				this.value = val;
				this.getSearchRes(val);
			},
			getSearchRes(val) {
				this.loading = true;
				this.showSearchRes = true;
				this.$api.get_search_list({
					value: val,
				}).then((res) => {
					this.loading = false;
					this.searcResList = res.data;
				}).catch(() => {
					this.loading = false;
				})
			},
			addSearchhistory(item) {
				this.$store.dispatch('setSearchHistory', this.value);
			},
			clickSearch(item) {
				this.valSync = item;
				this.getSearchRes(item);
			},
			clearSearchHistory() {
				this.$store.dispatch('clearSearchHistory');
				uni.showToast({
					title: '已清除所有历史记录',
					icon: 'none'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}

	.home {
		flex: 1;
		display: flex;
		flex-direction: column;

		.search-history-box {
			background-color: #fff;

			.search-history-header {
				padding: 10px 15px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 14px;
				color: #666;
				border-bottom: 1px solid #f5f5f5;

				.title {
					color: $mk-base-color;
				}

				.clear {
					color: #30b33a;
					font-weight: 500;
				}
			}

			.search-history--label {
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;
				font-size: 14px;

				.item {
					padding: 2px 10px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px solid #666;
					color: #666;
				}
			}
		}
	}

	.no-history {
		width: 100%;
		height: 200px;
		line-height: 200px;
		text-align: center;
		font-size: 14px;
		color: #666;
	}
</style>
