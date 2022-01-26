import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './style.css'
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password))
    if (data.errors) {
      let capitalErrors = [];
      data.errors.map(error => {
        const error_split = error.split(':');
        const cap_error = error.split(':')[0].toUpperCase();
        capitalErrors.push(`${cap_error}:${error_split[1]}`)
      })

      setErrors(capitalErrors);
    }
  };

  const demoLogin = async e => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'))
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };


  if (user?.id) {
    return <Redirect to='/' />;
  }

  return (
    <div id='footer-login-container'>
      <div id='signup-login-page-container'>
        <div id='left-image-div'></div>
        <div id='right-form-div'>
          <div id='login-container'>
            <h1 id='title'>WORDCIPHER</h1>
            <form id='login-form' onSubmit={onLogin}>
              <div className='error-div'>
                {errors.map((error, ind) => (
                  <div className='error-item' key={ind}>{error}</div>
                ))}
              </div>
              <div className='input-div'>
                <label htmlFor='email'>Email</label>
                <input
                  name='email'
                  type='text'
                  placeholder='Email'
                  value={email}
                  onChange={updateEmail}
                />
              </div>
              <div className='input-div'>
                <label htmlFor='password'>Password</label>
                <input
                  name='password'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={updatePassword}
                />
              </div>
              <div className='button-container'>
                <button className='submit-button' type='submit'>LOGIN</button>
                <button className='submit-button' onClick={demoLogin}>DEMO</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id='footer'>
        <div>
          <a href='https://github.com/christopher-hauser'>
            <AiFillGithub />
          </a>
        </div>
        <div>
          <a href='https://www.linkedin.com/in/christopher-hauser-083723bb/'>
            <AiFillLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
