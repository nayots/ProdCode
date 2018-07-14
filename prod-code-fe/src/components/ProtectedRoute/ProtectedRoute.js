import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthConsumer } from "../Auth/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ isAuth, user, token }) => (
      <Route
        render={props =>
          (isAuth && user.roles.includes("Admin")) ? <Component isAuth={isAuth} user={user} token={token} {...props} /> : <Redirect to="/" />
        }
        {...rest}
      />
    )}
  </AuthConsumer>
);

export default ProtectedRoute;
