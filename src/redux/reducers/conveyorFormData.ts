import { IConveyorFormData } from "../../types/IConveyorFormData";

export const initialState = {
  width: null,
  length: 1,
  options: [],
  price: 0,
  quantity: 1,
  SKU: ''
};

type ConveyorFormDataAction =
  | { type: 'SET_CONVEYOR_FORM_DATA'; payload: IConveyorFormData }
  | { type: 'CALCULATE_PRICE' }
  | { type: 'RESET_CONVEYOR_FORM_DATA' };

export const conveyorFormDataReducer = (state: IConveyorFormData = initialState, action: ConveyorFormDataAction) => {
  switch (action.type) {
    case 'SET_CONVEYOR_FORM_DATA':
      return {
        ...state,
        ...action.payload,
      };
    case 'CALCULATE_PRICE':
      const { width, length, options } = state;
      const calculateConveyorPrice = (width: number | null, length: number, options: string[]) => {
        // Define costs or weights for each parameter
        const costPerInchWidth = 320; // Example cost per inch of Conveyor Belt Width
        const costPerInchLength = 450; // Example cost per inch of Bed Section Length
        const costOption = 1000; // Example cost for Additional Option
        const baseCost = 10000; // Example base cost per conveyor

        // Calculate the price of a single conveyor
        const price = (width ? width * costPerInchWidth : 0) 
          + (length * costPerInchLength) 
          + (options.length * costOption) 
          + baseCost;

        return price;
      }
      const totalPrice = calculateConveyorPrice(width, length, options);

      return {
        ...state,
        price: totalPrice
      };
    case 'RESET_CONVEYOR_FORM_DATA': 
      return initialState;
    default:
      return state;
  }
}
