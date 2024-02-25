import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { addMapDataReducer, getMapDataReducer } from './reducers/reducers';

const reducer = combineReducers({
  addMapData: addMapDataReducer,
  getMapData: getMapDataReducer,
});

// const userInfoFromStorage = localStorage.getItem('@userData')
//   ? JSON.parse(localStorage.getItem('@userData'))
//   : null;

// const initialState = {
//   userLogin: { data: userInfoFromStorage },
// };

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
