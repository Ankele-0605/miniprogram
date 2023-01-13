//封装axios请求
import axios from "axios";
import axiosAdapterUniapp from 'axios-adapter-uniapp'

//instance就是一个axios的实例
const instance = axios.create({
	baseURL: "http://localhost:8888",
	timeout: 100000,
	headers: {
		"Content-Type": "application/x-www-form-urlencoded"
	},
	adapter: axiosAdapterUniapp
});

//单独配置post请求头   该配置无效
// instance.defaults.headers.post["Content-Type"] = "application/json";


// 添加请求拦截器 ：  在每次发送请求之前执行
instance.interceptors.request.use(
	function(config) {
		var token = uni.getStorageSync('token');
		if (config.method === "post") {
			config.headers['Content-Type'] = "application/json"
		}
		config.headers['authorization'] = token
		// 在发送请求之前做些什么
		return config;
	},
	function(error) {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 添加响应拦截器 ：在每次服务器响应数据之后执行
instance.interceptors.response.use(
	function(response) {
		// 2xx 范围内的状态码都会触发该函数。
		// 对响应数据做点什么
		return response.data;
	},
	function(error) {
		// 超出 2xx 范围的状态码都会触发该函数。
		// 对响应错误做点什么
		return Promise.reject(error);
	}
);

export function axiosGet(url, params) {
	return instance({
		method: "get",
		url: url,
		params: params,
	});
}

export function axiosPost(url, data) {
	return instance({
		method: "post",
		url: url,
		data: JSON.stringify(data)
	});
}
