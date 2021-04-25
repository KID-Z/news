'use strict';
const db = uniCloud.database();
const $ = db.command.aggregate;
exports.main = async (event, context) => {
	const {
		user_id,
		type
	} = event;
	let matchObj = {}
	if (type !== 'all') {
		matchObj = {
			current: true
		}
	}
	let userInfo = await db.collection('user').doc(user_id).get();
	userInfo = userInfo.data[0];

	const label = await db.collection('label').aggregate().addFields({
		current: $.in(['$_id', userInfo.label_ids])
	}).match(matchObj).end();

	return {
		code: 200,
		msg: '数据获取成功',
		data: label.data,
	};
};
