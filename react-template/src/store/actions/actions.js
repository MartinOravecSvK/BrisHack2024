import * as c from '../../constants/constants';
import { DATABASE_URL } from '../../environment'

 
const geopoint = {
  latitude: 40.712776, // Example latitude
  longitude: -74.005974 // Example longitude
};

export const addMapData = (geopoint, emotion) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        DATABASE_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            geopoint: geopoint,
            emotion: emotion,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: c.ADD_MAP_DATA_SUCCESS, payload: data });
      } else {
        dispatch({ type: c.ADD_MAP_DATA_FAIL, payload: 'Failed to save data' });
      }
    } catch (error) {
      dispatch({ type: c.ADD_MAP_DATA_FAIL, payload: error });
    }
  };
};

export const getMapData = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.GET_MAP_DATA_REQUEST });

      // Call firebase and fetch the data
      const response = await fetch(
        DATABASE_URL
      );
      console.log('response:', response);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      
      dispatch({
        type: c.GET_MAP_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log('error:', error);
      dispatch({
        type: c.GET_MAP_DATA_FAIL,
        payload: error.message,
      });
    }
  };
};
