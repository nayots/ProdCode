import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Col,
  Label,
  Input,
  Progress
} from "reactstrap";
import Config from "../../config/appConfig";


export default class UserCard extends React.Component {
  state = {
    isAdmin: this.props.isAdmin,
    isFetching: false
  };
  handleChange = async (event) => {
    this.setState({
      [event.target.name]: event.target.checked,
      isFetching: true
    });

    try {
        const response = await fetch(
            Config.baseApiUrl +
              `/user/change/${this.props.id}`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${this.props.token}`
                }
              }
          );
          if (!response.ok) {
            throw Error("Unable to change status");
          }

          this.setState({
              isFetching: false
          })
    } catch (error) {
        console.log(error);

        this.setState({
            isAdmin: !this.state.isAdmin,
            isFetching: false
        })
    }
  };

  render() {
    return (
      <Col md={{ size: "3" }} style={{ display: "inline-block" }}>
        <Card>
          <CardBody>
            <CardTitle>{this.props.name}</CardTitle>
            <CardSubtitle>Code: {this.props.email}</CardSubtitle>
            {this.state.isFetching ? (
              <Progress animated color="info" value="100">
                Executing..
              </Progress>
            ) : (
              <Label check>
                <Input
                  name="isAdmin"
                  type="checkbox"
                  checked={this.state.isAdmin}
                  onChange={this.handleChange}
                />{" "}
                Toggle Admin Status
              </Label>
            )}
          </CardBody>
        </Card>
      </Col>
    );
  }
}
