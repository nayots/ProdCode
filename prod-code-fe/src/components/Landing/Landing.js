import React from "react";
import ProductCard from "../Product/ProductCard";
import {
  Row,
  Col,
  Progress,
  InputGroup,
  InputGroupAddon,
  Button,
  Input
} from "reactstrap";
import Config from "../../config/appConfig";

export default class Landing extends React.Component {
  state = {
    products: [],
    loadingBarMsg: "Loading products ⌛️",
    searchTerm: "",
    initialized: false
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  refineQuery = event => {
    event.preventDefault();
    event.target.blur();
    this.loadItems();
  };

  loadItems = async () => {
    try {
      this.setState({
        products: []
      });
      const response = await fetch(
        Config.baseApiUrl +
          `/product/all/${this.state.searchTerm ? this.state.searchTerm : ""}`
      );
      if (!response.ok) {
        this.setState({
          loadingBarMsg: "Unable to load products 🤫"
        });
        return;
      }

      const results = await response.json();

      this.setState({
        products: results
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = async () => {
    await this.loadItems();
    this.setState({
      initialized: true
    });
  };

  render() {
    const productsInfo = this.state.products.map(p => {
      return <ProductCard key={p.id} {...p} />;
    });
    const loadingBarStyle = {
      marginTop: "30%",
      marginBottom: "auto",
      height: "50px",
      fontSize: "20pt"
    };

    const hasProducts = this.state.products.length !== 0;

    const search = (
      <Row>
        <Col md={{ size: "12" }}>
          <InputGroup style={{ marginBottom: "10px" }}>
            <Input
              placeholder="your query goes here :)"
              name="searchTerm"
              style={{ textAlign: "center" }}
              onChange={this.handleChange}
              value={this.state.searchTerm}
            />
            <InputGroupAddon addonType="append">
              <Button onClick={this.refineQuery}>Search 🔍</Button>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>
    );

    return (
      <React.Fragment>
        {hasProducts ? (
          <React.Fragment>
            {search}
            {productsInfo}
          </React.Fragment>
        ) : this.state.initialized ? (
          <React.Fragment>
            {search}
            <Col style={{ textAlign: "center" }}>
              <h1>No products found 👨🏻‍💻</h1>
            </Col>
          </React.Fragment>
        ) : (
          <Progress animated value="100" style={loadingBarStyle}>
            {this.state.loadingBarMsg}
          </Progress>
        )}
      </React.Fragment>
    );
  }
}
