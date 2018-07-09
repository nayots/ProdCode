import React, { Component } from "react";
import "./App.css";
import { AuthConsumer } from "./components/Auth/AuthContext";
import Header from "./components/Header/Header";

class App extends Component {
  render() {
    return (
      <AuthConsumer>
        {({ isAuth, login, logout }) => (
          <Header isAuth={isAuth} login={login} logout={logout} />
        )}
      </AuthConsumer>
    );
  }
}

export default App;
