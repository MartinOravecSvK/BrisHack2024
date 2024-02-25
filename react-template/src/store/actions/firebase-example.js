import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

// FETCH ORDERS
export const fetchOrders = () => {
  return async (dispatch, getState) => {
    // fetch orders behind the user id
    const userId = getState().auth.userId; // get the userId from the state
    try {
      // any async code you want
      const response = await fetch(
        `https://shop-app-19d81-default-rtdb.firebaseio.com/orders/${userId}.json`
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();

      const loadedOrders = [];
      // transfrom the data into an array of products
      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }

      dispatch({
        type: SET_ORDERS,
        orders: loadedOrders,
      });
    } catch (err) {
      // catch errors
      throw err;
    }
  };
};

// ADD ORDER AND STORE IT IN FIREBASE
export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token; // get the token from the state
    // user can add order backend by their ID
    const userId = getState().auth.userId; // get the userId from the state
    const auth = `?auth=${token}`; // query for URL
    const date = new Date();
    const response = await fetch(
      // connecting to firebase
      `https://shop-app-19d81-default-rtdb.firebaseio.com/orders/${userId}.json${auth}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // transform to JS object to JSON
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    });

    // SEND PUSH NOTIFICATIONS
    for(const cartItem of cartItems) {
      const pushToken = cartItem.productPushToken;

      const message = {
        to: pushToken,
        sound: 'default',
        title: 'ORDER WAS PLACED !!',
        body: cartItem.productTitle,
      };
    
      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

    }

  };
};