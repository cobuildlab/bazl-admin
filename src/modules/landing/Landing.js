import React from "react";
import { Container, Row, Col } from "reactstrap";

//Background
import bgLanding from "../../assets/image/background.png";

class Landing extends React.Component {
  render() {
    return (
      <Container
        style={{
          backgroundImage: `url(${bgLanding})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "100vh"
        }}
        fluid
        className="h-100 d-flex align-items-center d-flex justify-content-center bg-left"
      >
        <Row>
          <Col className="text-center">landing </Col>{" "}
        </Row>{" "}
      </Container>
    );
  }
}

export default Landing;
