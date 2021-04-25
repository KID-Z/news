const requireApi = require.context(
	'.',
	false,
	/.js$/
)

const modele = {};
requireApi.keys().forEach(key => {
	if (key === './index.js') return;
	Object.assign(modele, requireApi(key));
})
export default modele;
