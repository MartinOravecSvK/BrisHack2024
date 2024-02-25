import axios from 'axios';
import { BASE_URL } from '../../environment';
import * as c from '../../constants/constants';

// * --------------------------------------- USER ------------------------------------------------

export const register = (email, password, repeated_password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.USER_REGISTER_REQUEST });

      const config = {
        'Content-Type': 'application/json',
      };

      const { data } = await axios({
        method: 'POST',
        url: `${BASE_URL}/api/users/`,
        headers: config,
        data: {
          email,
          password,
          repeated_password,
        },
      });

      await localStorage.setItem(
        '@userData',
        JSON.stringify({
          ...data,
        })
      );

      dispatch({
        type: c.USER_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.USER_REGISTER_FAIL,
        payload: error,
      });
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.LOGIN_REQUEST });

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      const { data } = await axios({
        method: 'POST',
        url: `${BASE_URL}/api/users/login/`,
        headers: config,
        data: {
          email,
          password,
        },
      });

      await localStorage.setItem(
        '@userData',
        JSON.stringify({
          ...data,
        })
      );

      dispatch({
        type: c.LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.LOGIN_FAIL,
        payload: error,
      });
    }
  };
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('@userData');
  dispatch({ type: 'USER_LOGOUT' });
};

export const getUser = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.LOGIN_REQUEST });

      const userData = JSON.parse(await localStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${userData.token}`,
      };

      const { data } = await axios({
        method: 'get',
        url: `${BASE_URL}/api/users/${userData.id}/`,
        headers: config,
      });

      await localStorage.setItem(
        '@userData',
        JSON.stringify({
          ...data,
        })
      );

      dispatch({
        type: c.LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.LOGIN_FAIL,
        payload: error,
      });
    }
  };
};

// * --------------------------------------- PROFILE ------------------------------------------------

export const uploadImage = (backend_property, file) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.UPLOAD_IMAGE_REQUEST });

      const userData = JSON.parse(await localStorage.getItem('@userData'));

      const formData = new FormData();

      formData.append(backend_property, file);
      formData.append('image_id', userData.id);

      const config = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userData.token}`,
      };

      const { data } = await axios({
        method: 'POST',
        url: `${BASE_URL}/api/users/${userData.id}/actions/upload-image/`,
        headers: config,
        data: formData,
      });

      await localStorage.setItem(
        '@userData',
        JSON.stringify({
          ...data,
        })
      );

      dispatch({
        type: c.UPLOAD_IMAGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.UPLOAD_IMAGE_FAIL,
        payload: error,
      });
    }
  };
};
