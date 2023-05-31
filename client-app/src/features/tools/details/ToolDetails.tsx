import React from "react";
import { Button, ButtonGroup, Card, Image } from "semantic-ui-react";
import { Tool } from "../../../app/models/tool";

interface Props {
  tool: Tool;
  cancelSelectTool: () => void;
  openForm: (id: string) => void;
}

export default function ToolDetails({
  tool,
  cancelSelectTool,
  openForm,
}: Props) {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${tool.pictureUrl}.jpg`} />
      <Card.Content>
        <Card.Header>{tool.name}</Card.Header>
        <Card.Meta>
          <span>{tool.type}</span>
        </Card.Meta>
        <Card.Description>
          <div>{tool.price}</div>
          <div>{tool.description}</div>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup widths="2">
          <Button
            onClick={() => openForm(tool.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={cancelSelectTool}
            basic
            color="grey"
            content="Cancel"
          />
        </ButtonGroup>
      </Card.Content>
    </Card>
  );
}
