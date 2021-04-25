'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	const {
		user_id,
		author_id
	} = event;
	const userInfo = await db.collection('user').doc(user_id).get();
	const author_likes_ids = userInfo.data[0].author_likes_ids;

	let authorId = null;
	if (author_likes_ids.includes(author_id)) {
		authorId = dbCmd.pull(author_id);
	} else {
		authorId = dbCmd.addToSet(author_id);
	}

	await db.collection('user').doc(user_id).update({
		author_likes_ids: authorId
	})

	return {
		code: 200,
		msg: '数据更新成功'
	}
};
