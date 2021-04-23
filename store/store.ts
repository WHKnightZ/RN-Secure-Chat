import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { authReducer } from './auth/reducer';
import { socketioReducer } from './sio/reducer';
import { conversationsInfoReducer, conversationsContentReducer } from './conversations/reducer';
import { groupsInfoReducer, groupsContentReducer } from './groups/reducer';
import { commonReducer } from './common/reducer';
import { usersReducer } from './users/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  sio: socketioReducer,
  convInfo: conversationsInfoReducer,
  convContent: conversationsContentReducer,
  groupsInfo: groupsInfoReducer,
  groupsContent: groupsContentReducer,
  common: commonReducer,
  users: usersReducer,
});

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
