import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

export default function NavBar() {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Hardware Shop
        </Menu.Item>
        <Menu.Item name="Tools" />
        <Menu.Item>
          <Button positive content="Add Tool" />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
