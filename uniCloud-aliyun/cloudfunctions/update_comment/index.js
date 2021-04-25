'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
const $ = db.command.aggregate;
exports.main = async (event, context) => {
	const {
		user_id,
		article_id,
		content,
		comment_id = '',
		is_reply,
		reply_id = ''
	} = event;
	let userInfo = await db.collection('user').doc(user_id).get();
	userInfo = userInfo.data[0];

	// 得到回复列表
	let commentList = await db.collection('article').doc(article_id).get();
	commentList = commentList.data[0].comments;


	let commentObj = {
		comment_id: getID(5),
		comment_content: content,
		create_time: new Date().getTime(),
		is_reply: is_reply,
		author: {
			author_id: userInfo._id,
			author_name: userInfo.author_name,
			avatar: userInfo.avatar,
			professional: userInfo.professional,
		},
		replys: []
	}

	if (comment_id === '') {
		// 评论
		commentObj.replys = [];
		commentObj = dbCmd.unshift(commentObj)
	} else {
		// 回复评论
		// 回复到下标 给哪条评论回复
		const commentIndex = commentList.findIndex(item => item.comment_id === comment_id);
		let commentAuthor = '';
		if (is_reply) {
			// 子回复
			commentAuthor = commentList[commentIndex].replys.find(item => item.comment_id === reply_id);

		} else {
			// 回复评论
			commentAuthor = commentList.find(item => item.comment_id === comment_id);
		}
		commentAuthor = commentAuthor.author.author_name;
		commentObj.to = commentAuthor;
		commentObj = {
			[commentIndex]: {
				replys: dbCmd.unshift(commentObj)
			}
		}

	}

	await db.collection('article').doc(article_id).update({
		comments: commentObj,
	})

	return {
		code: 200,
		msg: '数据更新成功'
	}
};

function getID(length) {
	return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}
