import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  // const loading = useSelector((state) => state.auth.loading);
  return (
    <Route
      {...rest}
      render={(props) =>
        !auth ? <Redirect to='/register' /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
