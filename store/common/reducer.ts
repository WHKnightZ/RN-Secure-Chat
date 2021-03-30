import { SAVE_NAVIGATION, SHOW_SCAN_QR, HIDE_SCAN_QR } from './actions';

const initialState = { navigation: { messenger: null, group: null, directory: null, menu: null }, scanQR: false };

export const commonReducer = (state = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case SAVE_NAVIGATION:
      return { ...state, navigation: { ...state.navigation, ...action.payload } };
    case SHOW_SCAN_QR:
      return { ...state, scanQR: true };
    case HIDE_SCAN_QR:
      return { ...state, scanQR: false };

    default:
      return state;
  }
};
