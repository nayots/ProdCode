import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Col
} from "reactstrap";
import { Link } from "react-router-dom";

export default class ProductCard extends React.Component {
  render() {
    return (
      <Col md={{ size: "3" }} style={{ display: "inline-block" }}>
        <Card>
          <CardImg
            top
            src={this.props.imageUrl}
            alt={this.props.name}
          />
          <CardBody>
            <CardTitle>{this.props.name}</CardTitle>
            <CardSubtitle>Code: {this.props.code}</CardSubtitle>
            <Link
              className="btn btn-outline-info btn-sm"
              to={`/product/details/${this.props.id}`}
            >
              Details
            </Link>
          </CardBody>
        </Card>
      </Col>
    );
  }
}
