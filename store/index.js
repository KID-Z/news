import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		searchHistory: uni.getStorageSync('history') || [],
		userInfo: uni.getStorageSync('userInfo') || {}
	},
	mutations: {
		addSearchHistory(state, history) {
			state.searchHistory = history;
		},
		clearSearchHistory(state) {
			state.searchHistory = [];
		},
		setUser(state, data) {
			state.userInfo = data;
		}
	},
	actions: {
		setUser({
			commit
		}, data) {
			commit('setUser', data);
			uni.setStorageSync('userInfo', data);
		},
		setSearchHistory({
			commit,
			state
		}, history) {
			if (state.searchHistory.includes(history)) return;
			const searchHistoryList = state.searchHistory;
			searchHistoryList.unshift(history);
			commit('addSearchHistory', searchHistoryList);
			uni.setStorageSync('history', searchHistoryList);
		},
		clearSearchHistory({
			commit
		}) {
			commit('clearSearchHistory');
			uni.removeStorageSync('history');
		}
	}
})

export default store;
