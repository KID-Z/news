<template>
	<view class="home">
		<navbar></navbar>
		<tag :list="labelList" :activeIndex="labelIndex" @tag="changeTag"></tag>
		<view class="listcard">
			<list :label="labelList" :activeIndex="labelIndex" @changeLabel="changeLabel"></list>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				labelList: [],
				labelIndex: 0,
			}
		},
		computed:{
			...mapState(['userInfo']),
		},
		onLoad() {
			uni.$on('changeLabel', () => {
				this.labelList = [];
				this.labelIndex = 0;
				this.getLabel();
			})
		},
		methods: {
			getLabel() {
				this.$api.get_label().then(res => {
					this.labelList = res.data;
					this.labelList.unshift({
						name: "全部",
						user: [],
						_id: "795663120897121"
					})
				})
			},
			changeLabel(index) {
				this.labelIndex = index;
			},
			changeTag({
				tag,
				index
			}) {
				this.labelIndex = index;
			}
		},
		watch:{
			userInfo(){
				this.getLabel();
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
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;

		.listcard {
			flex: 1;
			box-sizing: border-box;
		}
	}
</style>
