import http from '@/utils/http.js'

//获取所有地址信息
export const areaList = () => http.globalRequest('/sass/common/release/listArea', 'POST')

//获取所有省份信息
export const provinceList = () => http.globalRequest('/sass/common/release/listProvince', 'POST')

//获取会员价格
export const getVipPrice = (code) => http.globalRequest(`/open/systemDictionary/release/listSystemDictionaryByCode/${code}`, 'POST')
