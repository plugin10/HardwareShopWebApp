import React from "react";
import { Grid } from "semantic-ui-react";
import { Tool } from "../../../app/models/tool";
import ToolList from "./ToolList";
import ToolDetails from "../details/ToolDetails";
import ToolForn from "../form/ToolForm";

interface Props {
  tools: Tool[];
  selectedTool: Tool | undefined;
  selectTool: (id: string) => void;
  cancelSelectTool: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (tool: Tool) => void;
  deleteTool: (id: string) => void;
  submitting: boolean;
}

export default function ToolDashboard({
  tools,
  selectedTool,
  selectTool,
  cancelSelectTool,
  editMode,
  openForm,
  closeForm,
  createOrEdit,
  deleteTool,
  submitting,
}: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <ToolList
          tools={tools}
          selectTool={selectTool}
          deleteTool={deleteTool}
          submitting={submitting}
        ></ToolList>
      </Grid.Column>
      <Grid.Column width="6">
        {selectedTool && !editMode && (
          <ToolDetails
            tool={selectedTool}
            cancelSelectTool={cancelSelectTool}
            openForm={openForm}
          ></ToolDetails>
        )}
        {editMode && (
          <ToolForn
            closeForm={closeForm}
            tool={selectedTool}
            createOrEdit={createOrEdit}
            submitting={submitting}
          ></ToolForn>
        )}
      </Grid.Column>
    </Grid>
  );
}
