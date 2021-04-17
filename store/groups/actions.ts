import { rest } from '../../config';
import { callApi, rsa } from '../../utils';
import { fetchConversationsUnseen } from '../common/actions';

export const GET_GROUPS = 'GET_GROUPS';

export const getGroups = async (dispatch: any, payload: any) => {
  const { page } = payload;
  const response: any = await callApi({
    api: rest.getGroups(page),
    method: 'get',
  });
  const { status, data } = response;
  if (status) {
    let unseen: any[] = [];
    dispatch({
      type: GET_GROUPS,
      payload: data.map((item: any) => {
        if (item.unseen) unseen.push(item.id);
        return {
          id: item.id,
          name: item.name,
          avatar: item.avatar_path,
          online: item.online,
          latest_message: item.latest_message
            ? { ...item.latest_message, message: rsa.decrypt(item.latest_message.message) }
            : null,
        };
      }),
    });
    dispatch(fetchConversationsUnseen({ unseenGroup: unseen }));
    return data.length;
  }
  return -1;
};
