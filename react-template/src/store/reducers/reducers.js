import * as c from '../../constants/constants';

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case c.USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case c.USER_REGISTER_SUCCESS:
      return {
        data: { ...action.payload },
      };
    case c.USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case 'USER_LOGOUT':
      return {};
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case c.LOGIN_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case c.LOGIN_SUCCESS:
      return {
        data: { ...action.payload },
        success: true,
      };
    case c.LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case c.USER_REGISTER_SUCCESS:
      return {
        data: { ...action.payload },
      };
    case c.UPLOAD_IMAGE_SUCCESS:
      return {
        data: { ...action.payload },
      };
    case 'USER_LOGOUT':
      return {};
    default:
      return state;
  }
};

export const uploadImageReducer = (state = {}, action) => {
  switch (action.type) {
    case c.UPLOAD_IMAGE_REQUEST:
      return {
        loading: true,
      };
    case c.UPLOAD_IMAGE_SUCCESS:
      return {
        data: { ...action.payload },
      };
    case c.UPLOAD_IMAGE_FAIL:
      return {
        error: action.payload,
      };
    case c.UPLOAD_IMAGE_RESET:
      return {};
    default:
      return state;
  }
};
