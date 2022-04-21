import { combineReducers, createStore } from "redux";
import checkReducer from "./check/check-Reducer";
export let reducer = combineReducers({
  checkReducer,
});
type RootReduserType = typeof reducer;
export type AppStateType = ReturnType<RootReduserType>

export type InfoActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;

let store = createStore(reducer);
export default store;