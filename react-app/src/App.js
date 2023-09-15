import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import { authenticate } from './store/session';
import UserProfile from './components/UserProfile';
import FriendsPage from './components/FriendsPage';
import ChallengesPage from './components/ChallengesPage';
import ListsPage from './components/ListsPage';
import GamePage from './components/GamePage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [loaded, dispatch]);

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
        <ProtectedRoute path='/' exact={true}>
          <GamePage />
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
        <ProtectedRoute path='/lists' exact={true}>
          <ListsPage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
