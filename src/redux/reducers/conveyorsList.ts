import { IConveyor } from "../../types/IConveyor";

const initialState = {
  allConveyors: [],
  chosenConveyorID: null
};
interface conveyorsListState {
  allConveyors: IConveyor[],
  chosenConveyorID: string | null
}

type ConveyorsListAction =
  | { type: 'FETCH_CONVEYORS'; payload: IConveyor[] }
  | { type: 'SET_CHOSEN_CONVEYOR_ID'; payload: string };

export const conveyorsListReducer = (state: conveyorsListState = initialState, action: ConveyorsListAction) => {
  switch (action.type) {
    case 'FETCH_CONVEYORS':
      return {
        ...state,
        allConveyors: action.payload,
      };
    case 'SET_CHOSEN_CONVEYOR_ID':
      return {
        ...state,
        chosenConveyorID: action.payload,
    };
    default:
      return state;
  }
}
