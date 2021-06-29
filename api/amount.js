import http from '@/utils/http.js'

//用户账单记录
export const userAmountList = (pageSize, pageNum) => http.globalRequest(`/open/amount/listUserAmount/${pageSize}/${pageNum}`, 'POST');

//用户提现记录
export const userWithdrawalRecordList = (pageSize, pageNum) => http.globalRequest(`/open/amount/listUserWithdrawalRecord/${pageSize}/${pageNum}`, 'POST');

//保存用户提现记录
export const saveUserWithdrawalRecord = (params) => http.globalRequest(`/open/amount/saveUserWithdrawalRecord`, 'POST', params);

//创建订单(支付)
export const createOrder = (params) => http.globalRequest(`/open/order/createOrder`, 'POST', params);

//用户充值记录
export const rechargeRecordList = (pageSize, pageNum) => http.globalRequest(`/open/amount/listUserRechargeRecord/${pageSize}/${pageNum}`, 'POST');