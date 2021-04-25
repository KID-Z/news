'use strict';
const db = uniCloud.database();
const $ = db.command.aggregate;
exports.main = async (event, context) => {
	const {
		user_id,
		article_id
	} = event;
	let userInfo = await db.collection('user').doc(user_id).get();
	userInfo = userInfo.data[0];

	const list = await db.collection('article').aggregate().addFields({
		is_author_like: $.in(['$author.id', userInfo.author_likes_ids]),
		is_like: $.in(['$_id', userInfo.article_likes_ids]),
		is_thumbs_up: $.in(['$_id', userInfo.
			thumbs_up_article_ids
		]),
	}).match({
		_id: article_id
	}).project({
		coments: 0,
	}).end();

	return {
		code: 200,
		msg: '数据获取成功',
		data: list.data[0],
	}
};
