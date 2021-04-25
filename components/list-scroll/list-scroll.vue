<template>
	<view class="scroll-list">
		<scroll-view scroll-y class="list-item" @scrolltolower="loadMore">
			<view>
				<slot></slot>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "list-card",
		data() {
			return {

			};
		},
		methods:{
			loadMore(){
				this.$emit('loadMore');
			}
		}
	}
</script>

<style lang="scss">
	.scroll-list {
		height: 100%;
		flex: 1;
		overflow: hidden;
		box-sizing: border-box;
		.list-item {
			height: 100%;
		}
	}
</style>
