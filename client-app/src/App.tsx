import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Header, List } from "semantic-ui-react";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/items") // this is an async call to get the items
      .then((response) => {
        setItems(response.data); // this is a sync call to set the items in state
      });
  }, []); // empty array means this will only run once

  return (
    <div>
      <Header as="h2" icon="users" content="Hardware Shop" />
      <List>
        {items.map((item: any) => (
          <List.Item key={item.id}>{item.name}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
