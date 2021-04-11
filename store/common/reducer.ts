import { SAVE_NAVIGATION, SHOW_SCAN_QR, HIDE_SCAN_QR, LOADING_REQUEST, LOADING_SUCCESS } from './actions';

const initialState = { navigation: null, scanQR: false, loading: false };

export const commonReducer = (state = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case SAVE_NAVIGATION:
      return { ...state, navigation: action.payload };
    case SHOW_SCAN_QR:
      return { ...state, scanQR: true };
    case HIDE_SCAN_QR:
      return { ...state, scanQR: false };
    case LOADING_REQUEST:
      return { ...state, loading: true };
    case LOADING_SUCCESS:
      return { ...state, loading: false };

    default:
      return state;
  }
};
