import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { authReducer } from './auth/reducer';
import { socketioReducer } from './sio/reducer';
import { conversationsInfoReducer, conversationsContentReducer } from './conversations/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  sio: socketioReducer,
  convInfo: conversationsInfoReducer,
  convContent: conversationsContentReducer,
});

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
