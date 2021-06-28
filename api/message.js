import http from '@/utils/http.js'

//获取聊天框信息
export const messageList = ( toUserId, pageSize, pageNum) => http.globalRequest(`/open/message/getMessage/${toUserId}/${pageSize}/${pageNum}`, 'POST');

//我喜欢或者喜欢我
export const userLikeList = (type, pageSize, pageNum) => http.globalRequest(`/open/message/getUserLike/${type}/${pageSize}/${pageNum}`, 'POST');

//我点赞或者点赞我
export const userThumbsUpList = (type, pageSize, pageNum) => http.globalRequest(`/open/message/getUserThumbsUp/${type}/${pageSize}/${pageNum}`, 'POST');

//通过用户id获取用户消息记录
export const getMessageByUserId = (pageSize, pageNum) => http.globalRequest(`/open/message/listMessageByUserId/${pageSize}/${pageNum}`, 'POST');

//用户喜欢或取消喜欢
export const saveUserLike = (toUserId) => http.globalRequest(`/open/message/saveUserLike/${toUserId}`, 'POST');

//用户点赞跟取消点赞
export const saveUserThumbsUp = (dynamicId) => http.globalRequest(`/open/message/saveUserThumbsUp/${dynamicId}`, 'POST');

//删除聊天记录
export const delUserMessage = (toUserId) => http.globalRequest(`/open/message/deleteUserMessage/${toUserId}`, 'POST')

//保存发送的消息
export const saveUserChatMessage = (params) => http.globalRequest('/open/message/saveUserMessage', 'POST', params)