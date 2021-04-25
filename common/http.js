import store from "../store"

export default function http(optios) {
	const {url, data} = optios;
	const dataObj = {
		user_id: store.state.userInfo._id,
		...data
	}
	return new Promise((resolve, reject) => {
		uniCloud.callFunction({
			name: url,
			data: dataObj
		}).then((res)=>{
			if(res.result.code === 200){
				resolve(res.result);
			}else {
				reject(res.result);
			}
		}).catch((err)=>{
			reject(err);
		})
	})
}
