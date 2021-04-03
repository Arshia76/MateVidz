import React, { useEffect, Fragment } from 'react';
import PrivateRoute from './Utils/PrivateRoute';
import { Route, Switch, Router } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import { ToastContainer } from 'react-toastify';
import { loadUser } from './Actions/Auth';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from './Pages/Dashboard';
import Detail from './Pages/Detail';
import Chat from './Pages/Chat';
import Join from './Pages/Join';
import NotFound from './Pages/NotFound';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

history.listen((location, action) => {
  window.scrollTo(0, 0);
});

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  useEffect(() => {
    if (localStorage.getItem('notify-auth-token')) {
      dispatch(loadUser());
    }
  }, [dispatch, user]);
  return (
    <Fragment>
      <Router history={history}>
        <Header />
        <Switch>
          <PrivateRoute exact path='/' component={Home} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/detail/:id' component={Detail} />
          <PrivateRoute exact path='/chat' component={Chat} />
          <PrivateRoute exact path='/join' component={Join} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route component={NotFound} />
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
