import { CheckType, PayType, PositionType, ProductType } from "../../redux/check/types"

type TypeParser = {
  data: Array<ProductType>,
  kioskName: string
}

export const parser = (data: TypeParser) => {
  const pays = data.data.map((e) => {
    const temp3: PayType = {
      kioskUid: "string",
      uid: "string",
      chequeHeadUid: "string",
      sum: 0,
      payType: 1,
      info: "string",
      datePay: "string",
    }
    return temp3;
  })
  const positions = data.data.map((e) => {
    const temp: PositionType = {
      qRcode: "string",
      name: e.product,
      quantity: 0,
      price: 0,
      sum: e.price,
      nds: 0,
      nsp: 0,
      discount: 0,
      discountType: 0,
      img: "string",
      parentUid: "string",
      prototypeUid: "string",
      prototypeType: 0,
      order: 0,
      chequeUid: "string",
      photos: 0,
      goodUid: "string"
    }
    return temp;
  })

  const sum = data.data.reduce((sum, e) => {
    return sum + e.price;
  }, 0)

  const temp: CheckType = {
    uid: Math.random().toString(16).slice(2),
    pays,
    positions,
    sum,
    payType: 999,
    info: "string",
    chequeState: 9999,
    selectedQRCODE: "string",
    clientUID: "string",
    clietnInfo: "string",
    chequeType: 99999,
    dateReg: new Date().toString(),
    dateClose: "string",
    kioskUid: "string",
    kioskName: data.kioskName,
    photos: 3,
    num: "string",
    videoState: 5
  }

  return temp;
}
