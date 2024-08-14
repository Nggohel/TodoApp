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

function SignUp({ onSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = () => {
    if (email && password) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.find((user) => user.email === email);

      if (userExists) {
        setError("User already exists. Please log in.");
      } else {
        users.push({ email, password });
        localStorage.setItem("users", JSON.stringify(users));
        onSignUp({ email });
      }
    } else {
      setError("Please fill in all fields.");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="mt-5">
            <Card.Body>
              <Card.Title className="text-center">Sign Up</Card.Title>
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
                    onClick={handleSignUp}
                    style={{ width: "50%" }}
                  >
                    Sign Up
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;
