import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

interface Props {
  openForm: () => void;
}

export default function NavBar({ openForm }: Props) {
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
          <Button onClick={openForm} positive content="Add Tool" />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
