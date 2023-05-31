import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Tool } from "../models/tool";
import NavBar from "./NavBar";
import ToolDashboard from "../../features/tools/dashboard/ToolDashboard";
import { v4 as uuid } from "uuid";

function App() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [selectedTool, setSelectedTool] = useState<Tool | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Tool[]>("http://localhost:5000/api/tools") // this is an async call to get the items
      .then((response) => {
        setTools(response.data); // this is a sync call to set the items in state
      });
  }, []); // empty array means this will only run once

  function handleSelectTool(id: string) {
    setSelectedTool(tools.find((x) => x.id === id));
  }

  function handleCancelSelectTool() {
    setSelectedTool(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectTool(id) : handleCancelSelectTool();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditTool(tool: Tool) {
    tool.id
      ? setTools([...tools.filter((x) => x.id !== tool.id), tool]) // if the tool has an id, then it already exists in the array, so we need to replace it
      : setTools([...tools, { ...tool, id: uuid() }]); // if the tool does not have an id, then it is new, so we need to add it to the array
    setEditMode(false);
    setSelectedTool(tool);
  }

  function handleDeleteTool(id: string) {
    setTools([...tools.filter((x) => x.id !== id)]);
  }

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7.5em" }}>
        <ToolDashboard
          tools={tools}
          selectedTool={selectedTool}
          selectTool={handleSelectTool}
          cancelSelectTool={handleCancelSelectTool}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditTool}
          deleteTool={handleDeleteTool}
        />
      </Container>
    </>
  );
}

export default App;
