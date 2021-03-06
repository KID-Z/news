'use strict';
const db = uniCloud.database();
const $ = db.command.aggregate;
exports.main = async (event, context) => {
	const {
		user_id,
		article_id,
		page = 1,
		pageSize = 5,
	} = event;
	const comments = await db.collection('article').aggregate().match({
		_id: article_id
	}).unwind('$comments').project({
		_id: 0,
		comments: 1
	}).replaceRoot({
		newRoot: '$comments'
	}).skip(pageSize * (page - 1)).limit(pageSize).end();
	return {
		code: 200,
		msg: '数据更新成功',
		data: comments.data,
		test: {
			page,
			pageSize,
		}
	}
};
