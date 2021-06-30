import http from '@/utils/http.js'

// 通过用户id获取用户动态列表
export const dynamicListByUserId = ( userId, pageSize, pageNum) => http.globalRequest(`/open/homepage/getDynamicByUserId/${userId}/${pageSize}/${pageNum}`, 'POST');

//获取用户详细资料
export const getUserDetails = (userId) => http.globalRequest(`/open/homepage/getUserId/${userId}`, 'POST');

//首页获取用户列表
export const homeUserList = (type, pageSize, pageNum) => http.globalRequest(`/open/homepage/release/homePageUser/${type}/${pageSize}/${pageNum}`, 'POST');

//获取动态列表
export const dynamicList = (type, gender, pageSize, pageNum) => http.globalRequest(`/open/homepage/listDynamic/${type}/${gender}/${pageSize}/${pageNum}`, 'POST')

//发布动态
export const saveDynamic = (params) => http.globalRequest(`/open/homepage/saveDynamic`, 'POST', params)

//删除动态
export const deleteDynamic = (dynamicId) => http.globalRequest(`/open/homepage/deleteDynamic/${dynamicId}`, 'POST')

//刷新用户信息
export const userListFlash = () => http.globalRequest(`/open/homepage/flashUserMessage`, 'POST')
