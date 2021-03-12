import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { authReducer } from './auth/reducer';
import { socketioReducer } from './sio/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  sio: socketioReducer,
});

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
