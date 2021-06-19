import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { authReducer } from './auth/reducer';
import { socketioReducer } from './sio/reducer';
import { conversationsInfoReducer, conversationsContentReducer } from './conversations/reducer';
import { groupsInfoReducer, groupsContentReducer } from './groups/reducer';
import { commonReducer } from './common/reducer';
import { usersReducer } from './users/reducer';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { onlineUsersReducer } from './onlineUsers/reducer';
import { typingConversationsReducer } from './typingConversations/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  sio: socketioReducer,
  convsInfo: conversationsInfoReducer,
  convsContent: conversationsContentReducer,
  groupsInfo: groupsInfoReducer,
  groupsContent: groupsContentReducer,
  common: commonReducer,
  users: usersReducer,
  onlineUsers: onlineUsersReducer,
  typingConversations: typingConversationsReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['sio', 'common', 'users', 'onlineUsers', 'typingConversations'],
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store: any = createStore(pReducer, applyMiddleware(ReduxThunk));

const persistor = persistStore(store);

export { persistor, store };
