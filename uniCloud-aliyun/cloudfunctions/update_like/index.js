'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	const {
		user_id,
		article_id
	} = event;
	const userInfo = await db.collection('user').doc(user_id).get();

	if (userInfo.data[0].article_likes_ids.includes(article_id)) {
		await db.collection('user').doc(user_id).update({
			article_likes_ids: dbCmd.pull(article_id)
		})
	} else {
		await db.collection('user').doc(user_id).update({
			article_likes_ids: dbCmd.addToSet(article_id)
		})
	}

	return {
		code: 200,
		msg: '数据更新成功',
		data: userInfo.data[0],
	}
};
