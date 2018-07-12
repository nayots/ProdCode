import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { AuthProvider } from "./components/Auth/AuthContext";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Landing from "./components/Landing/Landing";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import CreateProduct from "./components/Product/CreateProductComponent";
import { AuthConsumer } from "./components/Auth/AuthContext";
import { Container } from "reactstrap";


ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
      <Container>
      <AuthConsumer>
        {({ isAuth, login, token }) => (
          <Switch>
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <Route path="/auth/login" render={() => <LoginForm isAuth={isAuth} login={login}/>} />
            <Route path="/auth/register" render={() => <RegisterForm isAuth={isAuth} login={login}/>} />
            <Route path="/product/create" render={() => <CreateProduct isAuth={isAuth} token={token}/>} />
            <Route path="/product/details/:productId" render={(props) => <h2>{props.match.params.productId}</h2>} />
            <Route path="/" component={Landing} />
          </Switch>
        )}
      </AuthConsumer>
      </Container>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
