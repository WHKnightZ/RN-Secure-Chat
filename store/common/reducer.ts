import { CREATE_MESSAGE } from '../conversations/actions';
import { CREATE_GROUP_MESSAGE } from '../groups/actions';
import {
  SAVE_NAVIGATION,
  SHOW_SCAN_QR,
  HIDE_SCAN_QR,
  FETCH_CONVERSATIONS_UNSEEN,
  SEEN_CONVERSATION,
  FOCUS_SCREEN,
  UNFOCUS_SCREEN,
} from './actions';

const initialState = {
  navigation: null,
  scanQR: { show: false, callback: null },
  loading: false,
  unseenPrivate: [],
  unseenGroup: [],
  focusedScreen: null,
};

export const commonReducer = (state = initialState, action: { type: string; payload: any }) => {
  const { payload } = action;

  switch (action.type) {
    case SAVE_NAVIGATION:
      return { ...state, navigation: action.payload };
    case SHOW_SCAN_QR:
      return { ...state, scanQR: { show: true, callback: payload } };
    case HIDE_SCAN_QR:
      return { ...state, scanQR: { ...state.scanQR, show: false } };
    case FETCH_CONVERSATIONS_UNSEEN:
      return { ...state, ...payload };
    case SEEN_CONVERSATION:
      if (payload.seenPrivate) {
        return { ...state, unseenPrivate: state.unseenPrivate.filter((item) => item !== payload.seenPrivate) };
      } else {
        return { ...state, unseenGroup: state.unseenGroup.filter((item) => item !== payload.seenGroup) };
      }
    case CREATE_MESSAGE: {
      const { conversationId, seen } = payload;
      if (!seen) {
        let newUnseen: string[] = [...state.unseenPrivate];
        if (newUnseen.findIndex((item) => item === conversationId) === -1) newUnseen.push(conversationId);
        return { ...state, unseenPrivate: newUnseen };
      }
      return state;
    }
    case CREATE_GROUP_MESSAGE: {
      const { conversationId, seen } = payload;
      if (!seen) {
        let newUnseen: string[] = [...state.unseenGroup];
        if (newUnseen.findIndex((item) => item === conversationId) === -1) newUnseen.push(conversationId);
        return { ...state, unseenGroup: newUnseen };
      }
      return state;
    }

    case FOCUS_SCREEN:
      return { ...state, focusedScreen: payload };
    case UNFOCUS_SCREEN:
      console.log(state.focusedScreen, payload);
      if (state.focusedScreen === payload) return { ...state, focusedScreen: null };
      return state;

    default:
      return state;
  }
};
