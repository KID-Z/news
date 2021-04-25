<template>
	<swiper class="swiper-card-list" :current="activeIndex" @change="changeLabel">
		<swiper-item class="swiper-card-list-item" v-for="(item, index) in label" :key="item._id">
			<listItem :list="list[index]" :load="load[index]" @loadMore='loadMore' />
		</swiper-item>
	</swiper>
</template>

<script>
	import listItem from './list-item.vue';
	export default {
		name: "list",
		props: {
			label: {
				type: Array,
				default () {
					return []
				}
			},
			activeIndex: {
				type: Number,
			},
		},
		data() {
			return {
				list: {},
				load: {},
				size: 10,

			};
		},
		methods: {
			changeLabel(e) {
				const {
					current
				} = e.detail;
				this.$emit('changeLabel', current);
				if (!this.list[current] || this.list[current].length === 0) {
					this.getList(current);
				}
			},
			getList(current) {
				if (!this.load[current]) {
					this.$set(this.load, current, {
						page: 1,
						loading: 'loading'
					})
				}
				this.$api.get_list({
					label: this.label[current].name,
					page: this.load[current].page,
					pageSize: this.size
				}).then((res) => {
					if (res.data.length === 0) {
						this.$set(this.load[current], 'loading', 'noMore');
						this.$forceUpdate()
						return;
					}
					const oldData = this.list[current] || [];
					oldData.push(...res.data);
					this.$set(this.list, current, oldData);
				})
			},
			loadMore() {
				if (this.load[this.activeIndex].loading === 'noMore') return;
				this.load[this.activeIndex].page++;
				this.getList(this.activeIndex);
			}
		},
		created() {
			uni.$on('update_article-like', (e) => {
				if(e === 'follow'){
					this.list = {};
					this.load = {};
					this.getList(this.activeIndex);
				}
			})
		},
		watch: {
			label(val) {
				if (this.label.length === 0) return
				this.list = {};
				this.load = {};
				this.getList(0);
			}
		},
		components: {
			listItem,
		}
	}
</script>

<style lang="scss">
	.swiper-card-list {
		height: 100%;

		.swiper-card-list-item {
			height: 100%;
			overflow: hidden;
		}
	}
</style>
