import { InfoActionsTypes } from "../redux";
import { initialState } from "./initial-values";
import { CheckType, ChequesType, ProductType } from "./types";

type ActionsTypes = InfoActionsTypes<typeof CheckActions>;

export const checkReducer = (state = initialState, action: ActionsTypes) => {
  switch (action.type) {
    case "CHECK_SET_DATA": {
      return action.data;
    }
    case "CHECK_DELETE": {
      const newState = state.filter((e) => {
        return e.uid !== action.uid
      })
      return newState;
    }

    case "CHECK_ADD": {
      return [...state, action.heck]
    }
    default: return state;
  }
}

export const CheckActions = {
  setData: (data: ChequesType) => ({ type: "CHECK_SET_DATA", data } as const),
  addCheck: (heck: CheckType) => ({ type: "CHECK_ADD", heck } as const),
  deleteCheck: (uid: string) => ({ type: "CHECK_DELETE", uid } as const)
}


export default checkReducer;