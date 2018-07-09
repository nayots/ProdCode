import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import Config from "../../config/appConfig";
import { Redirect } from "react-router-dom";

export default class LoginForm extends React.Component {
  state = {
    email: "",
    password: ""
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    let data = {
      email: this.state.email,
      password: this.state.password
    };
    fetch(Config.baseApiUrl + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .catch(error => console.error("Error:", error))
      .then(response => {
        this.props.login(response);
      });
  };

  render() {
    return this.props.isAuth ? (
      <Redirect to="/" />
    ) : (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="with a placeholder"
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="password placeholder"
            onChange={this.handleChange}
          />
        </FormGroup>
        <Button onClick={this.handleSubmit}>Submit</Button>
      </Form>
    );
  }
}
