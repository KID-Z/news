'use strict';
const db = uniCloud.database();
const $ = db.command.aggregate;
exports.main = async (event, context) => {
	const {
		user_id,
	} = event;
	const userInfo = await db.collection('user').doc(user_id).get();
	const author_likes_ids = userInfo.data[0].author_likes_ids;

	const authorList = await db.collection('user').aggregate().addFields({
		is_like: $.in(['$id', author_likes_ids])
	}).match({
		is_like: true
	}).end();

	return {
		code: 200,
		msg: '数据更新成功',
		data: authorList.data
	}
};