import * as c from '../../constants/constants';

export const addMapDataReducer = (state = {}, action) => {
  switch (action.type) {
    case c.ADD_MAP_DATA_REQUEST:
      return {
        loading: true,
      };
    case c.ADD_MAP_DATA_SUCCESS:
      return {
        data: { ...action.payload },
      };
    case c.ADD_MAP_DATA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const getMapDataReducer = (state = {}, action) => {
  switch (action.type) {
    case c.GET_MAP_DATA_REQUEST:
      return {
        loading: true,
      };
    case c.GET_MAP_DATA_SUCCESS:
      return {
        data: { ...action.payload },
      };
    case c.GET_MAP_DATA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
