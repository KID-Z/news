<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="title">
					我的标签
				</view>
				<view class="edit" @click="edit">
					{{ is_edit? '完成' : '编辑' }}
				</view>
			</view>
			<uni-load-more v-if="loading"  status="loading" iconType="snow">
			</uni-load-more>
			<view class="label-content" v-if="!loading && labelList.length > 0">
				<view class="item" v-for="(label, index) in labelList" :key="label._id">
					{{label.name}}
					<uni-icons @click="del(index)" v-if="is_edit" class="close-icon" type="clear" size="20" color="red">
					</uni-icons>
				</view>
			</view>
			<view class="no-data" v-if="!loading && labelList.length === 0">
				当前没有数据
			</view>
		</view>

		<view class="label-box">
			<view class="label-header">
				<view class="title mk-base-color">
					标签推荐
				</view>
			</view>
			<uni-load-more v-if="loading"  status="loading" iconType="snow">
			</uni-load-more>
			<view class="label-content" v-if="!loading && list.length > 0">
				<view class="item" @click="add(index)" v-for="(item, index) in list" :key="item._id">
					{{item.name}}
				</view>
			</view>
			<view class="no-data" v-if="!loading && list.length === 0">
				当前没有数据
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_edit: false,
				labelList: [],
				list: [],
				loading: false
			}
		},
		onLoad() {
			this.getLabel();
		},
		methods: {
			edit() {
				if (this.is_edit) {
					this.is_edit = false;
					this.updateLabel();
				} else {
					this.is_edit = true;
				}
			},
			updateLabel() {
				const labelId = [];
				this.labelList.forEach(item => {
					labelId.push(item._id);
				})
				uni.showLoading()
				this.$api.update_label({
					label: labelId
				}).then(res => {
					uni.hideLoading();
					uni.showToast({
						title: '数据更新成功',
						icon: 'none'
					})
					uni.$emit('changeLabel');
				}).catch(()=>{
					uni.hideLoading();
				})
			},
			getLabel() {
				this.loading = true;
				this.$api.get_label({
					type: 'all'
				}).then(res => {
					this.labelList = res.data.filter(item => item.current);
					this.list = res.data.filter(item => !item.current);
					this.loading = false;
				})
			},
			del(index) {
				this.list.push(this.labelList[index]);
				this.labelList.splice(index, 1);
			},
			add(index) {
				if (!this.is_edit) return;
				this.labelList.push(this.list[index]);
				this.list.splice(index, 1);
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	.label {
		.label-box {
			background-color: #fff;
			margin-bottom: 10px;

			.label-header {
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				padding: 10px 15px;
				border-bottom: 1px solid #f5f5f5;

				.mk-base-color {
					color: $mk-base-color;
				}

				.edit {
					color: #30b33a;
					font-weight: 500;
				}
			}

			.label-content {
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;

				.item {
					position: relative;
					padding: 2px 5px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					font-size: 14px;
					color: #666;
					border: 1px solid #666;

					.close-icon {
						width: 20px;
						height: 20px;
						position: absolute;
						top: -8px;
						right: -8px;
						background: #fff;
						border-radius: 50%;
					}
				}
			}
		}
	}
	.no-data {
		width: 100%;
		padding: 50px 0px;
		text-align: center;
		color: #999;
		font-size: 14px;
	}
</style>
