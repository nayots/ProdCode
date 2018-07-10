import React from "react";
import { Button, Form, FormGroup, Label, Input, Alert, Col } from "reactstrap";
import Config from "../../config/appConfig";
import { Redirect } from "react-router-dom";

export default class RegisterForm extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    passwordsecond: "",
    hasError: false,
    errorMsg: ""
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      hasError: false,
      errorMsg: ""
    });

    if (!this.state.name || this.state.name.length > 20) {
        this.setState({
          hasError: true,
          errorMsg: "The Name field is required and must be no longer than 20 characters.",
          name: this.state.name.substr(0, 20)
        });
        return;
      }

    if (!this.state.email || !(new RegExp(Config.emailRegex, "g").test(this.state.email))) {
      this.setState({
        hasError: true,
        errorMsg: "A valid Email is required."
      });
      return;
    }

    if (!this.state.password) {
      this.setState({
        hasError: true,
        errorMsg: "The Password field is required."
      });
      return;
    }

    if (!this.state.passwordsecond) {
        this.setState({
          hasError: true,
          errorMsg: "The Confirm Password field is required."
        });
        return;
      }

    let data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      passwordsecond: this.state.passwordsecond
    };
    fetch(Config.baseApiUrl + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(data)
    })
      .then(response =>  { 
        if (!response.ok) {
          console.error(`Error: `, response);
          let errMsg = "";
          for (const errorEleKey of Object.keys(response)) {
            const errorEle = response[errorEleKey];
            errMsg += `${errorEle.join(" ")} `;
          }
          this.setState({
            hasError: true,
            errorMsg: errMsg
          });
          return;
        }
        return response.json()
      })
      .then(response => {
        this.props.login(response);
      })
      .catch(error =>  {
        console.error("Error in fetch:", error);
        return;
      });
  };

  onDismiss = () => {
    this.setState({
      hasError: false
    });
  }

  render() {
    return this.props.isAuth ? (
      <Redirect to="/" />
    ) : (
      <React.Fragment>
      <Col md={{size: "6", offset: 3}}>
      <Alert  color="warning" isOpen={this.state.hasError} toggle={this.onDismiss}>
        {this.state.errorMsg || "Unknown error occured :("}
      </Alert >
      <Form onSubmit={this.handleSubmit}>
      <FormGroup>
          <Label for="Name">Name</Label>
          <Input
            type="text"
            name="name"
            id="Name"
            placeholder="John Smith"
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Email">Email</Label>
          <Input
            type="email"
            name="email"
            id="Email"
            placeholder="something@somewhere.com"
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Password">Password</Label>
          <Input
            type="password"
            name="password"
            id="Password"
            placeholder="password"
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="PasswordSecond">Confirm Password</Label>
          <Input
            type="password"
            name="passwordsecond"
            id="PasswordSecond"
            placeholder="confirm password"
            onChange={this.handleChange}
          />
        </FormGroup>
        <Button onClick={this.handleSubmit}>Submit</Button>
      </Form>
      </Col>
      </React.Fragment>
    );
  }
}
