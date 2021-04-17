import { includes } from '../../utils';
import { ConversationInfoType, RELOAD_MESSENGER } from '../conversations/actions';
import { GET_GROUPS } from './actions';

export const groupsInfoReducer = (state = [], action: { type: string; payload: any }) => {
  const { type, payload } = action;
  let conversations: ConversationInfoType[];

  switch (type) {
    case GET_GROUPS:
      return [...state, ...payload.filter((item: any) => !includes(state, item))];

    case RELOAD_MESSENGER:
      return [];

    default:
      return state;
  }
};
