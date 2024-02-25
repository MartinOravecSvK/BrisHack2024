import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as f from '../../store/actions/actions';

import LoginInput from '../../components/LoginInput';
import './Login.css';

const Login = () => {
  const disptach = useDispatch();
  const history = useHistory();
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [repeatedPassword, setRepeatedPassword] = useState(null);

  const user = useSelector((state) => state.userLogin);
  const { loading: loadingLogin, data: userLogin, error: loginError } = user;

  const registerReducer = useSelector((state) => state.userRegister);
  const {
    loading: loadingRegister,
    data: registerUser,
    error: registerError,
  } = registerReducer;

  useEffect(() => {
    const valueFromLocalStorage = localStorage.getItem('@userData');

    if (valueFromLocalStorage) {
      history.push('/startup');
    }
  }, []);

  useEffect(() => {
    if (registerUser || userLogin) {
      history.push('/startup');
    }
  }, [registerReducer, userLogin]);

  const handleLogin = () => {
    if (email && password) {
      disptach(f.login(email, password));
    }
  };

  const handleRegister = () => {
    if (email && password && repeatedPassword) {
      disptach(f.register(email, password, repeatedPassword));
    }
  };

  return (
    <div className='screen'>
      <div className='loginWrapper'>
        <div className='welcomeContainer'>
          <h3 className='welcomeText'>Startups x Corporations</h3>
        </div>

        {registerError && (
          <p className='error'>{registerError?.response?.data?.detail}</p>
        )}

        {loginError && (
          <p className='error'>{loginError?.response?.data?.detail}</p>
        )}

        <div className='inputContainer'>
          <LoginInput
            handleChange={(e) => setEmail(e.target.value)}
            label='email'
            value={email}
          />
          <LoginInput
            handleChange={(e) => setPassword(e.target.value)}
            value={password}
            label='password'
            type='password'
          />
          {register ? (
            <LoginInput
              handleChange={(e) => setRepeatedPassword(e.target.value)}
              label='Repeat password'
              value={repeatedPassword}
              type='password'
            />
          ) : null}
        </div>

        {loadingLogin || loadingRegister ? (
          <p className='text'>Loading...</p>
        ) : (
          <>
            <buttton
              className='loginButton'
              onClick={register ? handleRegister : handleLogin}
            >
              {register ? 'Register' : 'Login'}
            </buttton>
            <div>
              {register ? (
                <p className='text' onClick={() => setRegister(false)}>
                  Already have an account ?
                </p>
              ) : (
                <p className='text' onClick={() => setRegister(true)}>
                  Register
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
