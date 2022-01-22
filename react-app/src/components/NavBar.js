import React from 'react';
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  return (
    <nav id='nav-container'>
      <div id='nav-links'>
        <div id='nav-left'>
          {user?.id && (
            <>
              <NavLink to='/my-profile' exact={true} activeClassName='active'>
                <div id='user-profile-circle'>
                  <p id='user-profile-letter'>{user.username[0]}</p>
                </div>
              </NavLink>
              <NavLink to='/' exact={true} activeClassName='active'>
                <div id='play-button'>
                  Play!
                </div>
              </NavLink>
            </>
          )}
        </div>
        <div id='nav-right'>
          <div id='logged-out-nav-right'>
            {!user?.id && (
              <div>
                <NavLink to='/login' exact={true} activeClassName='active'>
                  Login
                </NavLink>
              </div>
            )}
            {!user?.id && (
              <div>
                <NavLink to='/sign-up' exact={true} activeClassName='active'>
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
          {user?.id && (
            <div id='logged-in-nav-right'>
              <>
                <div>
                  <NavLink to='/users' exact={true} activeClassName='active'>
                    Users
                  </NavLink>
                </div>
                <div>
                  <NavLink to='/my-friends' exact={true} activeClassName='active'>
                    Friends List
                  </NavLink>
                </div>
                <div>
                  <NavLink to='/challenges' exact={true} activeClassName='active'>
                    Challenges
                  </NavLink>
                </div>
                <div>
                  <NavLink to='/lists' exact={true} activeClassName='active'>
                    Lists
                  </NavLink>
                </div>
                <div>
                  <LogoutButton />
                </div>
              </>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
