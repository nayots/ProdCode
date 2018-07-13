import React from "react";
import {
  Button,
  Col,
  Row,
  Progress,
  ListGroup,
  ListGroupItem,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import Disqus from "disqus-react";
import Config from "../../config/appConfig";
import { Redirect, Link } from "react-router-dom";

export default class ProductDetails extends React.Component {
  state = {
    data: null,
    progressBarMsg: "Loading product information",
    progressBarColor: "info",
    invalidIdRedirect: false,
    modalDelete: false,
    deleteInProgress: false,
    deleteProcessStyle: "success"
  };

  handleInvalidId = (msg, style) => {
    this.setState({
      progressBarMsg: msg,
      progressBarColor: style
    });

    setTimeout(() => {
      this.setState({
        invalidIdRedirect: true
      });
    }, 6000);
  };

  toggle = event => {
    event.preventDefault();
    event.target.blur();
    this.setState({
      modalDelete: !this.state.modalDelete
    });
    return;
  };

  arhiveItem = async () => {
    try {
      this.setState({
        deleteInProgress: true
      });
      let response = await fetch(
        Config.baseApiUrl + `/product/delete/${this.state.data.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.props.token}`
          }
        }
      );

      if (!response.ok) {
        this.setState({
          deleteProcessStyle: "danger"
        });
      }

      setTimeout(() => {
        this.setState({
          invalidIdRedirect: true
        });
      }, 3000);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  componentDidMount = async () => {
    try {
      let response = await fetch(
        Config.baseApiUrl +
          `/product/details/${this.props.match.params.productId}`
      );
      if (!response.ok) {
        this.handleInvalidId(
          "The provided Id is invalid 🛑, you will be redirected 🌀",
          "warning"
        );
      }
      let result = await response.json();
      this.setState({
        data: result
      });
    } catch (error) {
      this.handleInvalidId(
        "Something went wrong with your request 😫, you will be redirected 🌀",
        "warning"
      );
    }
  };

  render() {
    const loadingBarStyle = {
      marginTop: "30%",
      marginBottom: "auto",
      height: "50px",
      fontSize: "20pt"
    };
    const disqusShortname = "prodcode";
    const disqusConfig = {
      url: `http://prodcode.azurewebsites.net/product/details/${
        this.state.data ? this.state.data.id : ""
      }`,
      identifier: this.state.data ? this.state.data.disqusId : "",
      title: this.state.data ? this.state.data.name : ""
    };

    let hasRights = false;
    if (this.state.data && this.props.user) {
      hasRights = this.state.data
        ? this.props.user.id === this.state.data.authorId ||
          this.props.user.roles.includes("Admin")
        : false;
    }

    if (this.state.invalidIdRedirect) {
      return <Redirect to="/" />;
    }

    return (
      <Row>
        <Col md={{ size: "10", offset: 1 }}>
          {this.state.data ? (
            <React.Fragment>
              <Row>
                <Col md={{ size: "6" }}>
                  <img
                    src={this.state.data.imageUrl}
                    alt={this.state.data.name}
                    style={{maxWidth: "500px", minWidth: "100px"}}
                  />
                </Col>
                <Col md={{ size: "1" }} />
                <Col md={{ size: "5" }}>
                  <ListGroup>
                    <h2>
                      <Badge color="light" pill>
                        Title
                      </Badge>
                    </h2>
                    <ListGroupItem>{this.state.data.name}</ListGroupItem>
                    <h2>
                      <Badge color="light" pill>
                        Code
                      </Badge>
                    </h2>
                    <ListGroupItem>{this.state.data.code}</ListGroupItem>
                  </ListGroup>
                  {hasRights ? (
                    <div style={{ marginTop: "5px" }}>
                      <Link
                        className="btn btn-warning"
                        to={`/product/edit/${this.state.data.id}`}
                      >
                        Edit
                      </Link>{" "}
                      <Button color="primary" onClick={this.toggle}>
                        Delete
                      </Button>
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
              <Row style={{ marginTop: "20px" }}>
                <Col>
                  {this.state.data ? (
                    <Disqus.DiscussionEmbed
                      shortname={disqusShortname}
                      config={disqusConfig}
                    />
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
              <Modal isOpen={this.state.modalDelete} toggle={this.toggle}>
                {this.state.deleteInProgress ? (
                  <Progress
                    animated
                    color={this.state.deleteProcessStyle}
                    value="100"
                  >
                    {this.state.deleteProcessStyle === "info"
                      ? "Deleting item..."
                      : this.state.deleteProcessStyle === "success"
                        ? "Delete was successful :)"
                        : "Delete failed, redirecting :("}
                  </Progress>
                ) : (
                  <React.Fragment>
                    <ModalHeader toggle={this.toggle}>
                      Delete Product
                    </ModalHeader>
                    <ModalBody>
                      Are you sure you want to delete{" "}
                      <h3>
                        <em>{this.state.data.name}</em>
                      </h3>{" "}
                      ?
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" onClick={this.arhiveItem}>
                        Yes Delete
                      </Button>{" "}
                      <Button color="secondary" onClick={this.toggle}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </React.Fragment>
                )}
              </Modal>
            </React.Fragment>
          ) : (
            <Progress
              animated
              color={this.state.progressBarColor}
              value="100"
              style={loadingBarStyle}
            >
              {this.state.progressBarMsg}
            </Progress>
          )}
        </Col>
      </Row>
    );
  }
}
