'use strict';
const db = uniCloud.database();
const $ = db.command.aggregate;
exports.main = async (event, context) => {
	const {
		user_id,
		label,
		page = 1,
		pageSize = 10,
	} = event;
	let match = {};
	if (label !== '全部') {
		match = {
			classify: label
		}
	}
	const userInfo = await db.collection('user').doc(user_id).get();
	const article_likes_ids = userInfo.data[0].article_likes_ids;
	
	const list = await db.collection('article').aggregate().addFields({
		is_like: $.in(['$_id', article_likes_ids]),
	}).match(match).project({
		content: 0,
	}).skip(pageSize * (page - 1)).limit(pageSize).end();
	return {
		code: 200,
		msg: '数据获取成功',
		data: list.data,
	}
};
