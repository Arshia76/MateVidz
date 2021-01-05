import React, { useEffect, Fragment } from 'react';
import PrivateRoute from './Utils/PrivateRoute';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import { ToastContainer } from 'react-toastify';
import { loadUser } from './Actions/Auth';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from './Pages/Dashboard';
import Detail from './Pages/Detail';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      dispatch(loadUser());
    }
  }, [dispatch, user]);
  return (
    <Fragment>
      <Router>
        <Header />
        <Switch>
          <PrivateRoute exact path='/' component={Home} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/detail/:id' component={Detail} />
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
