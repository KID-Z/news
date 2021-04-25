<template>
	<view class="tag">
		<scroll-view scroll-x="true" class="tag-scroll-box">
			<view class="tag-scroll">
				<view class="tag-item" v-for="(item, index) in list" :key="index" @click="changeTag(item,index)"
					:class="{active: current === index}">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<view class="icon">
			<uni-icons type="gear" size="26" color="#666" @click="setLabel"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		name: "tag",
		props: {
			list: {
				type: Array,
				default () {
					return []
				},
			},
			activeIndex: {
				type: Number,
				default: 0,
			},
		},
		data() {
			return {
				current: 0,
			}
		},
		watch:{
			activeIndex(val){
				this.current = val;
			}
		},
		methods: {
			changeTag(tag, index) {
				this.$emit('tag', {
					tag,
					index
				});
			},
			setLabel() {
				uni.navigateTo({
					url:'/pages/home-label/home-label'
				})
			}
		}
	}
</script>

<style lang="scss">
	.tag {
		border-bottom: 1px solid #f5f5f5;
		background-color: #fff;
		display: flex;

		.tag-scroll-box {
			flex: 1;
			overflow: hidden;

			.tag-scroll {
				height: 45px;
				display: flex;
				align-items: center;
				flex-wrap: nowrap;
				box-sizing: border-box;

				.tag-item {
					flex-shrink: 0;
					padding: 0px 10px;
					font-size: 14px;
					color: #333;

					&.active {
						color: #008c8c;
					}
				}
			}
		}

		.icon {
			position: relative;
			width: 45px;
			display: flex;
			justify-content: center;
			align-items: center;

			&:before {
				content: '';
				position: absolute;
				top: 12px;
				bottom: 12px;
				left: 0;
				width: 1px;
				background-color: #ddd;
			}
		}
	}

	.tag-scroll-box::-webkit-scrollbar {
		display: none;
	}
</style>
