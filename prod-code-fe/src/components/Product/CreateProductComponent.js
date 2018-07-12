import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Col,
  Progress
} from "reactstrap";
import Config from "../../config/appConfig";
import { Redirect } from "react-router-dom";

export default class CreateProduct extends React.Component {
  state = {
    productName: "",
    productCode: "",
    productImage: null,
    hasError: false,
    errorMsg: "",
    fetching: false,
    redirectRoute: null
  };

  handleChange = event => {
    if (event.target.files && event.target.files.length > 0) {
      this.setState({ [event.target.name]: event.target.files[0] });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      hasError: false,
      errorMsg: ""
    });

    if (!this.state.productName || this.state.productName.length > 100) {
      this.setState({
        hasError: true,
        errorMsg:
          "Product name is required with a maximum length of 100 characters!"
      });
      return;
    }

    if (!this.state.productCode || this.state.productName.length > 20) {
      this.setState({
        hasError: true,
        errorMsg:
          "Product code is required with a maximum length of 20 characters!"
      });
      return;
    }

    if (!this.state.productImage) {
      this.setState({
        hasError: true,
        errorMsg: "Product image is required!"
      });
      return;
    }

    var data = new FormData();
    data.append("productName", this.state.productName);
    data.append("productCode", this.state.productCode);
    data.append("productImage", this.state.productImage);

    this.setState({
      fetching: true
    })
    fetch(Config.baseApiUrl + "/product/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.props.token}`
      },
      body: data
    })
      .then(response => {
        if (!response.ok) {
          console.error(`Error: `, response);
          let errMsg = `Type:${response.type} Status: ${response.status} - ${response.statusText}`;
          
          this.setState({
            hasError: true,
            errorMsg: errMsg,
            fetching: false
          });
          return;
        }
        return response.json();
      })
      .then(response => {
        this.setState({
          redirectRoute: `/product/details/${response.productId}`
        });

        this.forceUpdate();
        console.log(response);
      })
      .catch(error => {
        console.error("Error in fetch:", error);
        this.setState({
          fetching: false
        })
        return;
      });
  };

  onDismiss = () => {
    this.setState({
      hasError: false
    });
  };

  render() {
    if (this.state.redirectRoute) {
      return <Redirect to={this.state.redirectRoute} />
    }

    return !this.props.isAuth ? (
      <Redirect to="/" />
    ) : (
      <React.Fragment>
        <Col md={{ size: "6", offset: 3 }}>
          <Alert
            color="warning"
            isOpen={this.state.hasError}
            toggle={this.onDismiss}
          >
            {this.state.errorMsg || "Unknown error occured :("}
          </Alert>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="ProductName">Product Name</Label>
              <Input
                type="text"
                name="productName"
                id="ProductName"
                placeholder="Potato Chips"
                onChange={this.handleChange}
                disabled={this.state.fetching}
              />
            </FormGroup>
            <FormGroup>
              <Label for="ProductCode">Product Code</Label>
              <Input
                type="text"
                minLength="1"
                maxLength="20"
                name="productCode"
                id="ProductCode"
                placeholder="123456789"
                onChange={this.handleChange}
                disabled={this.state.fetching}
              />
            </FormGroup>
            <FormGroup>
              <Label for="ProductImage">Product Image</Label>
              <Input
                type="file"
                name="productImage"
                id="ProductImage"
                accept="image/x-png,image/jpg,image/jpeg"
                onChange={this.handleChange}
                disabled={this.state.fetching}
              />
            </FormGroup>
            {this.state.fetching ? (
              <Progress animated color="info" value="100">Sending</Progress>
            ) : (
              <Button onClick={this.handleSubmit}>Submit</Button>
            )}
          </Form>
        </Col>
      </React.Fragment>
    );
  }
}
