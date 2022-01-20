import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import { getAllFriendRequests, getAllFriends, getAllMyFriendRequests } from './store/friends'
import UserProfile from './components/UserProfile';
import NewChallengeForm from './components/NewChallengeForm'
import FriendsPage from './components/FriendsPage';
import ChallengesPage from './components/ChallengesPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
        <ProtectedRoute path='/my-profile' exact={true}>
          <UserProfile />
        </ProtectedRoute>
        <ProtectedRoute path='/challenges' exact={true}>
          <ChallengesPage />
        </ProtectedRoute>
        <ProtectedRoute path='/my-friends' exact={true}>
          <FriendsPage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
