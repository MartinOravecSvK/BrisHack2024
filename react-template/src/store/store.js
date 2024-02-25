import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import {
  userRegisterReducer,
  userLoginReducer,
  listProfilesReducer,
  updateProfileReducer,
  uploadImageReducer,
  listInvitationsReducer,
  sendInvitationReducer,
} from './reducers/reducers';

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  listProfiles: listProfilesReducer,
  updateProfile: updateProfileReducer,
  listInvitations: listInvitationsReducer,
  sendInvitation: sendInvitationReducer,
  uploadImage: uploadImageReducer
});

const userInfoFromStorage = localStorage.getItem('@userData')
  ? JSON.parse(localStorage.getItem('@userData'))
  : null;

const initialState = {
  userLogin: { data: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
