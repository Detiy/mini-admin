import axios from '@/api/request'
import type * as good from "@/api/goods/goods"

// 商品接口
const goods = {
  // 获取商品分类数据
  getCommodityList() {
    return axios.get('api/pc/commodity/commodityList')
  },
  // 商品分类新增
  postAddcommodityList(params: good.IAddStatusRequestData) {
    return axios.post('/api/pc/commodity/addCommodityList', params)
  },
  // 获取商品列表数据
  getCommodityLists(params: good.IGoodRequestData) {
    return axios.get('api/pc/commodity/commodityLists', { params })
  },
  // 商品新增
  postAddcommodityLists(params: good.IAddRequestData) {
    return axios.post('/api/pc/commodity/addCommodityLists', params)
  },
  // 商品删除
  deletecommodityList(params: any) {
    return axios.delete(`/api/pc/commodity/deleteCommodityList/${params}`)
  },
  // 商品详情
  getDetailsCommodityList(params: good.IDetailRequestData) {
    return axios.get('/api/pc/commodity/detailsCommodityList', { params })
  },
  // 商品编辑
  putUpdateCommodityList(params: good.IEditRequestData) {
    return axios.put('/api/pc/commodity/updateCommodityList', { params })
  },

  // 上传图片
  postUploadImage(params: any) {
    return axios.post('/api/pc/file/imges', params)
  },
   // 上传文件
   postUploadFIle() {
    return axios.post('/api/pc/file/upload')
  },
}
export default goods