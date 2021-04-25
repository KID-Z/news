<template>
	<view>
		<!-- 标准卡片 -->
		<view class="card" v-if="item.mode === 'base'" @click.stop="open(item)">
			<view class="card-img">
				<image :src="item.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="card-content">
				<view class="card-title">
					<text>{{item.title}}</text>
					<like :item="item" :types="types"></like>
				</view>
				<view class="card-des">
					<view class="card-des-label">
						<view class="card-des-label-item">
							{{item.classify}}
						</view>
					</view>
					<view class="card-des-browe">
						{{item.browse_count}}人浏览
					</view>
				</view>
			</view>
		</view>

		<!-- 大图卡片 -->
		<view class="card image" v-if="item.mode === 'image'" @click.stop="open(item)">
			<view class="card-img">
				<image :src="item.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="card-content">
				<view class="card-title">
					<text>
						{{item.title}}
					</text>
					<like :item="item" :types="types"></like>
				</view>
				<view class="card-des">
					<view class="card-des-label">
						<view class="card-des-label-item">
							{{item.classify}}
						</view>
					</view>
					<view class="card-des-browe">
						{{item.browse_count}}人浏览
					</view>
				</view>
			</view>
		</view>

		<!-- 多图卡片 -->
		<view class="card column" v-if="item.mode === 'column'" @click.stop="open(item)">
			<view class="card-content">
				<view class="card-title">
					<text>{{item.title}}</text>
					<like :item="item" :types="types"></like>
				</view>
				<view class="card-list-img">
					<view class="card-img" v-if="index < 3" v-for="(img, index) in item.cover" :key="index">
						<image :src="img" mode="aspectFill"></image>
					</view>
				</view>
				<view class="card-des">
					<view class="card-des-label">
						<view class="card-des-label-item">
							{{item.classify}}
						</view>
					</view>
					<view class="card-des-browe">
						{{item.browse_count}}人浏览
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "card",
		props: {
			mode: {
				type: String,
			},
			item: {
				type: Object,
				default () {
					return {}
				}
			},
			types:{
				type: String,
				default : ''
			}
		},
		data() {
			return {

			};
		},
		methods: {
			open(item) {
				this.$emit('addSearchhistory', item);
				const info = this.item;
				const params = {
					_id:info._id,
					title: info.title,
					create_time:info.create_time,
					browse_count:info.browse_count,
					author: info.author,
					thumbs_up_count:info.thumbs_up_count
				}
				uni.navigateTo({
					url: '/pages/home-datail/home-datail?params='+JSON.stringify(params)
				})
			}
		}
	}
</script>

<style lang="scss">
	.card {
		display: flex;
		padding: 10px;
		margin: 10px;
		border-radius: 5px;
		box-sizing: border-box;
		box-shadow: 0 0 5px 1px rgba($color: #000000, $alpha: 0.1);

		.card-img {
			flex-shrink: 0;
			width: 60px;
			height: 60px;
			border-radius: 5px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.card-content {
			width: 100%;
			margin-left: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.card-title {
				position: relative;
				font-size: 14px;
				color: #333333;
				padding-right: 30px;

				text {
					line-height: 1.2;
					font-weight: 400;
					overflow: hidden;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}
			}

			.card-des {
				display: flex;
				font-size: 12px;
				justify-content: space-between;
				align-items: center;

				.card-des-label {
					display: flex;

					.card-des-label-item {
						padding: 0 5px;
						margin-right: 5px;
						border-radius: 15px;
						color: $mk-base-color;
						border: 1px solid $mk-base-color;
					}
				}

				.card-des-browe {
					color: #999999;
					line-height: 1.5;
				}
			}
		}

		&.image {
			display: flex;
			flex-direction: column;

			.card-img {
				width: 100%;
				height: 100px;
				border-radius: 5px;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}

			}

			.card-content {
				margin-left: 0;

				.card-title {
					margin-top: 10px;
					margin-bottom: 10px;
				}
			}
		}

		&.column {
			.card-content {
				margin-left: 0;

				.card-list-img {
					display: flex;
					margin-top: 10px;
					margin-bottom: 10px;

					.card-img {
						flex: 1;
						height: 70px;
						margin-left: 10px;
						border-radius: 5px;
						overflow: hidden;

						&:first-of-type {
							margin-left: 0;
						}

						image {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
	}
</style>
