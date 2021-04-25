'use strict';
const db = uniCloud.database();
const $ = db.command.aggregate;
exports.main = async (event, context) => {
	const {
		user_id,
	} = event;
	if(!user_id){
		return {
			code: 201,
			msg: '没有user_id'
		}
		return;
	}
	let userInfo = await db.collection('user').doc(user_id).get();
	userInfo = userInfo.data[0];

	return {
		code: 200,
		msg: '数据获取成功',
		data: userInfo
	}
};
