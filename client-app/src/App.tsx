import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Header, List } from "semantic-ui-react";

function App() {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tools") // this is an async call to get the items
      .then((response) => {
        setTools(response.data); // this is a sync call to set the items in state
      });
  }, []); // empty array means this will only run once

  return (
    <div>
      <Header as="h2" icon="users" content="Hardware Shop" />
      <List>
        {tools.map((item: any) => (
          <List.Item key={item.id}>{item.name}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
