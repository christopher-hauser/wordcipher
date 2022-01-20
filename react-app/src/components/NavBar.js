import React from 'react';
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        {!user && (
          <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
        )}
        {!user && (
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
        )}
        {user && (
        <>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to='/my-profile' exact={true} activeClassName='active'>
            My Profile
          </NavLink>
        </li>
        <li>
          <NavLink to='/my-friends' exact={true} activeClassName='active'>
            Friends List
          </NavLink>
        </li>
        <li>
          <NavLink to='/new-challenge' exact={true} activeClassName='active'>
            Send Challenge to a Friend
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
        </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
