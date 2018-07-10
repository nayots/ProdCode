import React, { Component } from "react";
import "./App.css";
import { AuthConsumer } from "./components/Auth/AuthContext";
import Header from "./components/Header/Header";

class App extends Component {
  render() {
    return (
      <AuthConsumer>
        {({ isAuth, login, logout, user }) => (
          <Header isAuth={isAuth} login={login} logout={logout} user={user} />
        )}
      </AuthConsumer>
    );
  }
}

export default App;
