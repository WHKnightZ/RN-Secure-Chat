import { rest } from '../../config';
import { callApi } from '../../utils';

export const GET_FRIENDS = 'GET_FRIENDS';
export const ADD_FRIEND = 'ADD_FRIEND';

export type FriendType = {
  id: string;
  username: string;
  display_name: string;
  avatar_path: string;
};

export const getFriends = async (dispatch: any) => {
  const response: any = await callApi({
    api: rest.getFriends(),
    method: 'get',
  });
  const { status, data } = response;
  if (status) {
    dispatch({
      type: GET_FRIENDS,
      payload: data,
    });
  }
};

export const addFriend = async (dispatch: any, payload: FriendType) => {
  const response: any = await callApi({
    api: rest.addFriends(payload.id),
    method: 'post',
  });
  const { status } = response;
  if (status) {
    dispatch({
      type: ADD_FRIEND,
      payload,
    });
  }
};
