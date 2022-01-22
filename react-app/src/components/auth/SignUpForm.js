import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const validate = () => {
    const errors = [];
    if (!username) errors.push("Please provide a username.")
    if (!email || !email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) errors.push('Please provide a valid email address.');
    if (!password) errors.push('Please provide a password');
    if (!repeatPassword) errors.push('Please confirm your password.');
    if (!(password === repeatPassword)) errors.push('Passwords did not match.')

    return errors;
  }


  const onSignUp = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (errors.length > 0) return setErrors(errors)

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div id='footer-login-container'>
      <div id='signup-login-page-container'>
        <div id='left-image-div'></div>
        <div id='right-form-div'>
          <div id='login-container'>
            <h1 id='signup-title'>WORDCIPHER</h1>
            <form id='signup-form' onSubmit={onSignUp}>
              <div className='error-div'>
                {errors.map((error, ind) => (
                  <div className='error-item' key={ind}>{error}</div>
                ))}
              </div>
              <div className='signup-input-div'>
                <label>User Name</label>
                <input
                  type='text'
                  name='username'
                  onChange={updateUsername}
                  value={username}
                ></input>
              </div>
              <div className='signup-input-div'>
                <label>Email</label>
                <input
                  type='text'
                  name='email'
                  onChange={updateEmail}
                  value={email}
                ></input>
              </div>
              <div className='signup-input-div'>
                <label>Password</label>
                <input
                  type='password'
                  name='password'
                  onChange={updatePassword}
                  value={password}
                ></input>
              </div>
              <div className='signup-input-div'>
                <label>Repeat Password</label>
                <input
                  type='password'
                  name='repeat_password'
                  onChange={updateRepeatPassword}
                  value={repeatPassword}
                  required={true}
                ></input>
              </div>
              <div className='button-container'>
                <button className='submit-button' type='submit'>Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id='footer'>
        FOOTER
      </div>
    </div>
  );
};

export default SignUpForm;
