import { useDispatch, useSelector } from "react-redux"
import { CheckActions } from "../../redux/check/check-Reducer";
import { AppStateType } from "../../redux/redux"
import { Table } from "./Table"

export const TableContainer = () => {
  const dispatch = useDispatch();
  const cheques = useSelector((store: AppStateType) => {
    return store.checkReducer;
  })

  const deleteCheck = (uid: string) => {
    dispatch(CheckActions.deleteCheck(uid));
  }

  return <Table cheques={cheques} deleteCheck={deleteCheck} />
}