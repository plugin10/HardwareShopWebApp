import React, { SyntheticEvent, useState } from "react";
import { Tool } from "../../../app/models/tool";
import { Button, Item, Label, Segment } from "semantic-ui-react";

interface Props {
  tools: Tool[];
  selectTool: (id: string) => void;
  deleteTool: (id: string) => void;
  submitting: boolean;
}

export default function ToolListItem({
  tools,
  selectTool,
  deleteTool,
  submitting,
}: Props) {
  const [target, setTarget] = useState("");

  function handleToolDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteTool(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {tools.map((tool) => (
          <Item key={tool.id}>
            <Item.Content>
              <Item.Header as="a">{tool.name}</Item.Header>
              <Item.Meta>{tool.type}</Item.Meta>
              <Item.Description>
                <div>{tool.price}</div>
                <div>{tool.description}</div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectTool(tool.id)}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  name={tool.id}
                  loading={submitting && target === tool.id}
                  onClick={(e) => handleToolDelete(e, tool.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                />
                <Label basic content={tool.type} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
