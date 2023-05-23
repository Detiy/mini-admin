import type { UploadRawFile } from "element-plus";


export type IGoodsRequestData = IapiResponseData<{ token: string}>

export interface Addcommodity {
  create_time: string,
  id: number,
  img_url: string,
  introduce: string,
  name: string,
  price: number,
  product_status: string,
  state: string,
  top: string
}
export interface Addlist {
  style:  Array<addListStyle>,
  title: string
}
export interface addListStyle {
  category: string,
  id: string,
  img_url: string,
  name: string,
  product_id: number,
  state: string
}
export interface Addtable {
  color_id: string,
  id: number,
  price: number,
  product_id: number,
  size_id: string,
  style_id: string
}
// 商品新增
export interface IAddRequestData {
  commodity: Addcommodity,
  list: Array<Addlist>,
  table: Array<Addtable>
}
// 商品分类新增
export interface IAddStatusRequestData {
  moduleName: string
}

// 商品列表
export interface IGoodRequestData {
  // PageNum
  PageNum: number,
  // PageSize
  PageSize: number,
  // 商品名称
  name?: number,
  // 商品分类
  state?: number,
}

// 删除商品
// export interface IDeleteRequestData {
//   id: number | string
// }

// 商品详情
export interface IDetailRequestData {
  id: number | string
}

// 商品编辑
export interface IEditRequestData {
  // id
  id: string | number,
  // 图片
  img_url: string,
  // 介绍
  introduce: string,
  // 名称
  name: string,
  // 价格
  price: string,
  // 状态
  state: string,
  // 置顶
  top: string,
}

// export interface IImgRequestData {
//   file: any
// }
