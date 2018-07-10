import React from "react";

const AuthContext = React.createContext(null);

class AuthProvider extends React.Component {
  state = {
    isAuth: false,
    user: null,
    token: null
  };

  login = (authStatus) => {
    localStorage.setItem("jwtToken", authStatus.token);
    localStorage.setItem("user", JSON.stringify(authStatus.user));
    this.setState({
        isAuth: true,
        token: authStatus.token,
        user: authStatus.user
    });
  }

  logout = () => {
    this.setState({ 
        isAuth: false,
        user: null,
        token: null
    });
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
  }

  componentDidMount = () => {
    let tok = localStorage.getItem("jwtToken");
    let urs = localStorage.getItem("user");
    if (tok !== null && urs !== null) {
        this.setState({
            isAuth: true,
            token: tok,
            user: JSON.parse(urs)
        });
    }
  }

  render() {
    return (
      <AuthContext.Provider value={{ 
          isAuth: this.state.isAuth,
          login: this.login,
          logout: this.logout,
          token: this.state.token,
          user: this.state.user
           }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export {AuthProvider, AuthConsumer};