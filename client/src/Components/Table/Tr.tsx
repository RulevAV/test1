import moment from "moment-ru";
import React from "react"
import { CheckType, PayType } from "../../redux/check/types";

type PropsType = {
  Check: CheckType,
  deleteCheck: (uid: string) => void;
}

const getSum = (pays: Array<PayType>) => {
  return pays.reduce((sum, e) => {
    return sum + e.sum;
  }, 0);
}

const getStatus = (check: CheckType, sum: number) => {
  if (check.pays.length === 0)
    return "Нет оплаты";

  return check.sum === sum ? "Оплачено" : "Недоплата";
}

const Tr: React.FC<PropsType> = ({ Check, deleteCheck }) => {
  const paysSum = getSum(Check.pays);
  const dateReg = moment(Check.dateReg).format("YYYY MM DD, h:mm");
  const kioskName = Check.kioskName;
  const chequeType = Check.chequeType ? "Продажа" : "Возврат";
  const status = getStatus(Check, paysSum);
  const checkSum = Check.sum;
  const count = Check.positions.length;
  const products = Check.positions.map(e => e.name).join(", ");

  return <tr >
    <td >{dateReg}</td>
    <td >{kioskName}</td>
    <td >{chequeType}</td>
    <td >{status}</td>
    <td >{paysSum}</td>
    <td >{checkSum}</td>
    <td >{count}</td>
    <td title={products}>{products}</td>
    <td > <button className='btn btn-danger' onClick={() => { deleteCheck(Check.uid) }}>Удалить </button></td>
  </tr>
}

export default Tr;