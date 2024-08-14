import React, { useState } from "react";
import {
  Form,
  Button,
  Alert,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function SignIn({ onSignIn, setIsAccount }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignIn = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      onSignIn(user);
    } else {
      setError("Invalid email or password. Make Account if you don't have !!");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="mt-5">
            <Card.Body>
              <Card.Title className="text-center">Sign In</Card.Title>
              <Form>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="d-flex justify-content-center">
                  <Button
                    variant="primary"
                    className="mt-4"
                    onClick={handleSignIn}
                    style={{ width: "50%" }}
                  >
                    Sign In
                  </Button>
                </div>
              </Form>

              <div className="text-center mt-3">
                If you don't have an account,{" "}
                <b>
                  <a
                    href="#login"
                    onClick={() => {
                      setIsAccount(true);
                    }}
                  >
                    Click Here
                  </a>
                </b>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SignIn;
