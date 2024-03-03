import { combineReducers } from "redux";
import { conveyorsListReducer } from "./conveyorsList";
import { conveyorFormDataReducer } from "./conveyorFormData";
import { popupReducer } from "./popup";

export const RootReducer = combineReducers({
  conveyors: conveyorsListReducer,
  conveyorFormData: conveyorFormDataReducer,
  popup: popupReducer,
});

export type RootState = ReturnType<typeof RootReducer>;
