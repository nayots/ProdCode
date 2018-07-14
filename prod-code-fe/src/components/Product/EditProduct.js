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

export default class EditProduct extends React.Component {
  state = {
    productId: -1,
    productName: "",
    productCode: "",
    productImage: null,
    previousImage: "http://via.placeholder.com/600x350",
    hasError: false,
    errorMsg: "",
    fetching: true,
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
    data.append("id", this.state.productId);
    data.append("productName", this.state.productName);
    data.append("productCode", this.state.productCode);
    data.append("productImage", this.state.productImage);

    this.setState({
      fetching: true
    })
    fetch(Config.baseApiUrl + `/product/edit/${this.state.productId}`, {
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

  componentDidMount = async () => {
    try {
        const response = await fetch(Config.baseApiUrl + `/product/edit/${this.props.match.params.productId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.props.token}`,
                "Content-Type": "application/json; charset=utf-8"
              }
        });

        if (!response.ok) {
            this.setState({
                redirectRoute: "/"
            })
        }

        const result = await response.json();

        this.setState({
            fetching: false,
            productName: result.name,
            productCode: result.code,
            productId: result.id,
            previousImage: result.imageUrl
        })
    } catch (error) {
        console.log(error);
    }
  }

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
                value={this.state.productName}
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
                value={this.state.productCode}
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
              <Button onClick={this.handleSubmit}>Edit</Button>
            )}
          </Form>
        </Col>
        <Col md={{ size: "6", offset: "3" }}>
                  <img
                    src={this.state.previousImage}
                    alt={this.state.productName}
                    style={{maxWidth: "500px", minWidth: "100px", marginTop: "5px"}}
                  />
                </Col>
      </React.Fragment>
    );
  }
}
