export type PayType = {
  kioskUid: string,
  uid: string,
  chequeHeadUid: string,
  sum: number,
  payType: number,
  info: string,
  datePay: string
}

export type ProductType = {
  id: string,
  product: string,
  price: number,
}


export type PositionType = {
  qRcode: string,
  name: string
  quantity: number,
  price: number,
  sum: number,
  nds: number,
  nsp: number,
  discount: number,
  discountType: number,
  img: string,
  parentUid: string,
  prototypeUid: string,
  prototypeType: number,
  order: number,
  chequeUid: string,
  photos: number,
  goodUid: string
}

export type CheckType = {
  pays: Array<PayType>
  positions: Array<PositionType>
  uid: string,
  sum: number,
  payType: number,
  info: string,
  chequeState: number,
  selectedQRCODE: string,
  clientUID: string,
  clietnInfo: string,
  chequeType: number,
  dateReg: string,
  dateClose: string,
  kioskUid: string,
  kioskName: string,
  photos: number,
  num: string,
  videoState: number
}

export type ChequesType = Array<CheckType>