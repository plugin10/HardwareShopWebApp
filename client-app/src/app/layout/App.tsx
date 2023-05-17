import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Header, List } from "semantic-ui-react";
import { Tool } from "../models/tool";
import NavBar from "./NavBar";

function App() {
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    axios
      .get<Tool[]>("http://localhost:5000/api/tools") // this is an async call to get the items
      .then((response) => {
        setTools(response.data); // this is a sync call to set the items in state
      });
  }, []); // empty array means this will only run once

  return (
    <div>
      <NavBar />
      <Container style={{ marginTop: "7.5em" }}>
        <List>
          {tools.map((item: Tool) => (
            <List.Item key={item.id}>{item.name}</List.Item>
          ))}
        </List>
      </Container>
    </div>
  );
}

export default App;
