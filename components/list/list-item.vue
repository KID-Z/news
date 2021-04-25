<template>
	<view class="list-scroll">
		<list-scroll class="scroll-height" @loadMore='loadMore'>
			<view>
				<list-card v-for="(item,index) in list" :key="item.id" :item="item"></list-card>
			</view>
			<uni-load-more v-if="list.length===0 || list.length > 7" :status="load.loading || 'loading'" iconType="snow">
			</uni-load-more>
		</list-scroll>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default () {
					return []
				},
			},
			load: {
				type: Object,
				default () {
					return {}
				}
			},
		},
		methods: {
			loadMore() {
				this.$emit('loadMore');
			}
		}
	}
</script>

<style lang="scss">
	.list-scroll {
		height: 100%;

		.scroll-height {
			height: 100%;
		}
	}
</style>
