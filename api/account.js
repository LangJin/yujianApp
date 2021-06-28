import http from '@/utils/http.js'

//发送短信
export const sendSms = (phone) => http.globalRequest(`/open/account/release/sendSms/${phone}`, 'POST');

//登录
export const login = (params) => http.globalRequest('/open/account/release/userLogin', 'POST', params);

//通过用户id获取用户信息
export const getUserInfo = () => http.globalRequest(`/open/account/getUserMessage`, 'POST')

//保存用户信息
export const saveUserInfo = (params) => http.globalRequest(`/open/account/saveUserMessage`, 'POST', params)
