'use strict';
const db = uniCloud.database();
const $ = db.command.aggregate;
exports.main = async (event, context) => {
	const {
		user_id,
	} = event;
	const userInfo = await db.collection('user').doc(user_id).get();
	const article_likes_ids = userInfo.data[0].article_likes_ids;

	const folowList = await db.collection('article').aggregate().addFields({
		is_like: $.in(['$_id', article_likes_ids])
	}).project({
		content: 0
	}).match({
		is_like: true
	}).end();

	return {
		code: 200,
		msg: '数据更新成功',
		data: folowList.data
	}
};
