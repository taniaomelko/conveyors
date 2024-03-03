const initialState = {
  isOpen: false,
};

type PopupAction =
  | { type: 'OPEN_POPUP'; }
  | { type: 'CLOSE_POPUP'; };

export const popupReducer = (state = initialState, action: PopupAction) => {
  switch (action.type) {
    case 'OPEN_POPUP':
      return {
        ...state,
        isOpen: true,
      };
    case 'CLOSE_POPUP':
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};
