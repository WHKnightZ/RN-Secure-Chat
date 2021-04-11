export const SAVE_NAVIGATION = 'SAVE_NAVIGATION';
export const SHOW_SCAN_QR = 'SHOW_SCAN_QR';
export const HIDE_SCAN_QR = 'HIDE_SCAN_QR';
export const LOADING_REQUEST = 'LOADING_REQUEST';
export const LOADING_SUCCESS = 'LOADING_SUCCESS';

export const saveNavigation = (payload: any) => {
  return { type: SAVE_NAVIGATION, payload };
};

export const showScanQR = () => {
  return { type: SHOW_SCAN_QR };
};

export const hideScanQR = () => {
  return { type: HIDE_SCAN_QR };
};

export const loadingRequest = () => {
  return { type: LOADING_REQUEST };
};

export const loadingSuccess = () => {
  return { type: LOADING_SUCCESS };
};
