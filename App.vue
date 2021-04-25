<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.$api.get_user({
				user_id: '607d79d4b1b6d000015ac0de'
			}).then(res => {
				this.$store.dispatch('setUser', res.data)
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import '/components/gaoyia-parse/parse.css';

	paddingBottom {

		padding-bottom: constant(safe-area-inset-bottom);

		padding-bottom: env(safe-area-inset-bottom);

		box-sizing: content-box;

	}

	fixedBottom {

		bottom: constant(safe-area-inset-bottom);

		bottom: env(safe-area-inset-bottom);

	}
</style>
