import React, { useEffect, Fragment } from 'react';
import PrivateRoute from './Utils/PrivateRoute';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import { ToastContainer } from 'react-toastify';
import { loadUser } from './Actions/Auth';
import { useDispatch } from 'react-redux';
import Dashboard from './Pages/Dashboard';

function App({ history }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      dispatch(loadUser());
    }
  }, [dispatch, history]);
  return (
    <Fragment>
      <Router>
        <Header />
        <Switch>
          <PrivateRoute exact path='/' component={Home} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </Router>
      <ToastContainer
        rtl
        position='bottom-left'
        style={{ textAlign: 'right' }}
      />
    </Fragment>
  );
}

export default App;
