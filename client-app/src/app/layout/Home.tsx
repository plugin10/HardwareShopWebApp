import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Tool } from "../models/tool";
import NavBar from "./NavBar";
import ToolDashboard from "../../features/tools/dashboard/ToolDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponents from "./LoadingComponents";

export default function Home() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [selectedTool, setSelectedTool] = useState<Tool | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Tools.list().then((response) => {
      setTools(response);
      setLoading(false);
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
    setSubmitting(true);
    if (tool.id) {
      agent.Tools.update(tool).then(() => {
        setTools([...tools.filter((x) => x.id !== tool.id), tool]);
        setSelectedTool(tool);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      tool.id = uuid();
      agent.Tools.create(tool).then(() => {
        setTools([...tools, tool]);
        setSelectedTool(tool);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  }

  function handleDeleteTool(id: string) {
    setSubmitting(true);
    agent.Tools.delete(id).then(() => {
      setTools([...tools.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
  }

  if (loading) return <LoadingComponents content="Loading tools..." />;

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
          submitting={submitting}
        />
      </Container>
    </>
  );
}
