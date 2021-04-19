import { CREATE_MESSAGE } from '../conversations/actions';
import { CREATE_GROUP_MESSAGE } from '../groups/actions';
import {
  SAVE_NAVIGATION,
  SHOW_SCAN_QR,
  HIDE_SCAN_QR,
  FETCH_CONVERSATIONS_UNSEEN,
  SEEN_CONVERSATION,
  CHANGE_FOCUS,
} from './actions';

const initialState = {
  navigation: null,
  scanQR: false,
  loading: false,
  unseenPrivate: [],
  unseenGroup: [],
  focus: null,
};

export const commonReducer = (state = initialState, action: { type: string; payload: any }) => {
  const { payload } = action;

  switch (action.type) {
    case SAVE_NAVIGATION:
      return { ...state, navigation: action.payload };
    case SHOW_SCAN_QR:
      return { ...state, scanQR: true };
    case HIDE_SCAN_QR:
      return { ...state, scanQR: false };
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

    case CHANGE_FOCUS:
      return { ...state, focus: payload };

    default:
      return state;
  }
};
