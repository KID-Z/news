<template>
	<view>
		<list-scroll>
			<uni-load-more v-if="list.length===0 && !noData" iconType="snow" status="loading">
			</uni-load-more>
			<view class="no-data" v-if="noData">
				没有数据了
			</view>
			<list-card types="follow" v-for="(item,index) in list" :key="item.id" :item="item"></list-card>
		</list-scroll>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				noData: false
			}
		},
		onLoad(){
			this.getMyArticle()
		},
		methods: {
			getMyArticle(){
				this.$api.get_my_article().then(res=>{
					this.list = res.data;
					this.noData = this.list.length === 0 ? true : false;
				})
			}
		}
	}
</script>

<style lang="scss">
	.no-data {
		padding: 50px;
		font-size: 14px;
		color: #999;
		text-align: center;
	}
</style>
