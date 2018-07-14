import React from "react";
import UserCard from "../User/UserCard";
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

export default class Dashboard extends React.Component {
  state = {
    users: [],
    loadingBarMsg: "Loading users ⌛️",
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
        users: []
      });
      const response = await fetch(
        Config.baseApiUrl +
          `/user/all/${this.state.searchTerm ? this.state.searchTerm : ""}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.props.token}`
            }
          }
      );
      if (!response.ok) {
        this.setState({
          loadingBarMsg: "Unable to load users 🤫"
        });
        return;
      }

      const results = await response.json();

      this.setState({
        users: results
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
    const usersInfo = this.state.users.map(p => {
      return <UserCard key={p.id} {...p} token={this.props.token} />;
    });
    const loadingBarStyle = {
      marginTop: "30%",
      marginBottom: "auto",
      height: "50px",
      fontSize: "20pt"
    };

    const hasUsers = this.state.users.length !== 0;

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
        {hasUsers ? (
          <React.Fragment>
            {search}
            {usersInfo}
          </React.Fragment>
        ) : this.state.initialized ? (
          <React.Fragment>
            {search}
            <Col style={{ textAlign: "center" }}>
              <h1>No users found 👨🏻‍💻</h1>
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
