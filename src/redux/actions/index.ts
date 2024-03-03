import { IConveyor } from "../../types/IConveyor";
import { IConveyorFormData } from "../../types/IConveyorFormData";

// conveyor
export const fetchConveyorsAction = (conveyors: IConveyor[]) => ({
  type: 'FETCH_CONVEYORS',
  payload: conveyors,
});

export const setChosenConveyor = (id: string) => ({
  type: 'SET_CHOSEN_CONVEYOR_ID',
  payload: id,
});

// conveyor form
export const setConveyorFormData = (conveyorFormData: IConveyorFormData) => ({
  type: 'SET_CONVEYOR_FORM_DATA',
  payload: conveyorFormData,
});

export const calculatePrice = () => ({
  type: 'CALCULATE_PRICE',
});

export const resetConveyorFormData = () => ({
  type: 'RESET_CONVEYOR_FORM_DATA',
});

// popup
export const openPopup = () => ({
  type: 'OPEN_POPUP',
});

export const closePopup = () => ({
  type: 'CLOSE_POPUP',
});
