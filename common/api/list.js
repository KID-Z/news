import http from '../http.js';

export const get_label = function(data) {
	return http({
		url: 'get_label',
		data
	});
};

export const get_list = function(data) {
	return http({
		url: 'get_list',
		data
	});
};

export const update_like = function(data) {
	return http({
		url: 'update_like',
		data
	});
};

export const get_search_list = function(data) {
	return http({
		url: 'get_search_list',
		data
	});
};

export const update_label = function(data) {
	return http({
		url: 'update_label',
		data
	});
};

export const get_datail = function(data) {
	return http({
		url: 'get_datail',
		data
	});
};

export const update_comment = function(data) {
	return http({
		url: 'update_comment',
		data
	});
};

export const get_comments = function(data) {
	return http({
		url: 'get_comments',
		data
	});
};

export const update_author = function(data) {
	return http({
		url: 'update_author',
		data
	});
};

export const thumbsup = function(data) {
	return http({
		url: 'thumbsup',
		data
	});
};

export const get_follow = function(data) {
	return http({
		url: 'get_follow',
		data
	});
};


export const get_author = function(data) {
	return http({
		url: 'get_author',
		data
	});
};


export const get_user = function(data) {
	return http({
		url: 'get_user',
		data
	});
};

export const get_my_article = function(data) {
	return http({
		url: 'get_my_article',
		data
	});
};

export const update_feedback = function(data) {
	return http({
		url: 'update_feedback',
		data
	});
};