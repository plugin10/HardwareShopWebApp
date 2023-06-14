import axios from "axios";
import React, { useState } from "react";
import { useSignIn } from "react-auth-kit";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";

export default function LoginForm() {
  const [error, setError] = useState("");
  const signIn = useSignIn();

  const handleSubmit = async (value: any) => {
    console.log(value);
    setError("");

    // let email = value.Email;
    // let password = value.Password;

    // console.log(email);
    // console.log(password);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/autho/Admin/Admin`,
        value
      );
      signIn({
        token: response.data.token,
        expiresIn: 60 * 60 * 24 * 3,
        tokenType: "Bearer",
        authState: { Email: value.Email },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      setError("Invalid username or password");
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Log-in to your account
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              name="Email"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="Password"
            />

            <Button color="teal" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
}
