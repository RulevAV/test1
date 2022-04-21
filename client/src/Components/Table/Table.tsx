import React from "react"
import { ChequesType } from "../../redux/check/types"
import Tr from "./Tr";

type PropsType = {
  cheques: ChequesType,
  deleteCheck: (uid: string) => void,
}

export const Table: React.FC<PropsType> = ({ cheques, deleteCheck }) => {
  return <table className="table table-2">
    <thead>
      <tr>
        <th >Дата</th>
        <th >Киоск</th>
        <th >Тип</th>
        <th >Статус оплаты</th>
        <th >Оплата</th>
        <th >Сумма</th>
        <th >Кол-во товара</th>
        <th >Товары</th>
        <th > Удалить</th>
      </tr>
    </thead>
    <tbody>
      {cheques.map((e, index) => {
        return <Tr key={e.uid} Check={e} deleteCheck={deleteCheck} />
      })}
    </tbody>
  </table>
}