import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { getImage } from '../../utils/gets';
import { logout, getUser } from '../../store/actions/actions';
import './Navbar.css';

const Navbar = ({ navigate }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector((state) => state.userLogin);
  const { data, loading, error } = currentUser;

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    const valueFromLocalStorage = localStorage.getItem('@userData');

    if (!valueFromLocalStorage || error) {
      dispatch(logout());
      history.push('/login');
    }
    if (!data && valueFromLocalStorage) {
      dispatch(getUser());
    }
  }, [error]);

  const handleLogout = () => {
    dispatch(logout());
    history.push('/login');
  };

  function getInitial(email) {
    if (email) {
      let initial = email.charAt(0).toUpperCase();
      return initial;
    }
    return 'N';
  }

  return (
    <div className='navbar'>
      <div className='titleContainer'>
        <p>Startups x Corporations</p>
      </div>
      <div className='navBarContainer'>
        <div className='navBarItemsContainer'>
          <div className='itemContainer' onClick={() => navigate('startup')}>
            <p>Startups</p>
          </div>
          <div
            className='itemContainer'
            onClick={() => navigate('corporation')}
          >
            <p>Corporations</p>
          </div>
        </div>

        <div className='avatarWrapper'>
          <div
            className='avatarContainer'
            onClick={() => history.push('/profile')}
          >
            {loading && (
              <Box sx={{ display: 'flex' }}>
                <CircularProgress color='inherit' />
              </Box>
            )}
            {data?.photo && !loading && (
              <img
                className='avatarStyle'
                src={getImage(data.photo)}
                alt='profile'
              />
            )}
            {data && !data.photo && <p>{getInitial(data?.email)}</p>}
          </div>
          <p className='logoutText' onClick={handleLogout}>
            LOGOUT
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
