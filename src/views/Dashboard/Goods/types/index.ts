// 商品类型
export interface Category {
  id: number;
  moduleName: string;
}
// options
export interface specOptionsType {
  type: string,
  label: string
}
// 商品选择下拉 (规格)
export interface specOptions {
  options: Array<specOptionsType>
  typeList: Array<any>
}
// 轮播图的接口类型
export interface lbtData {
  id: 0;
  url: "";
  is_delete: 0;
}
// 列表数据
export interface specListData {
  specName: string,
  specObj: specOptions
}
export interface columnType {
  prop: string,
  label: string,
  type?: number
}
// 子规格
export interface specSonType {
  name: ''
}
// 规格参数类型
export interface specParamsStyle {
  category: string,
  id: string,
  img_url: string,
  name: string,
  product_id: string | number,
  state: string
}
// 规格参数
export interface specParams {
  title: string,
  style: Array<specParamsStyle>
}
// goodstable
export interface GoodsTable {
  id: number;
  img_url: string;
  introduce: string;
  name: string;
  price: string;
  product_status: number | Boolean;
  state: string;
  top: string | Boolean;
}

// 规格列表数据
export interface specDataType {
  id: string,
  // value: undefined,
  price: undefined,
  // retail: undefined,
  // weight: undefined,
  // stock: undefined,
  [prop: string]: string | number | undefined
}
export interface objectListType {
  key: ''
}
// 接收子规格所有类型
export interface optionsType {
  [prop: string]: Array<specSonType>
}

export interface tableParmasType {
  style_id: string,
  color_id: string,
  size_id: string,
  price: number,
}
export interface listParmasType {
  list: Array<listParmasArrayType>
}
export interface listParmasArrayType {
  id: string,
  name: string,
  img_url: string,
  category: string,
}