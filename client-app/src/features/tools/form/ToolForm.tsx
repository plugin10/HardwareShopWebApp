import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Tool } from "../../../app/models/tool";

interface Props {
  tool: Tool | undefined;
  closeForm: () => void;
  createOrEdit: (tool: Tool) => void;
  submitting: boolean;
}

export default function ToolForn({
  tool: selectedTool,
  closeForm,
  createOrEdit,
  submitting,
}: Props) {
  const initialState = selectedTool ?? {
    id: "",
    name: "",
    type: "",
    description: "",
    price: 0.0,
    pictureUrl: "",
  };

  const [tool, setTool] = useState(initialState);

  function handleSubmit() {
    createOrEdit(tool);
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setTool({ ...tool, [name]: value });
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Name"
          value={tool.name}
          name="name"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Type"
          value={tool.type}
          name="type"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Price"
          value={tool.price}
          name="price"
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Description"
          value={tool.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Picture Url"
          value={tool.pictureUrl}
          name="pictureUrl"
          onChange={handleInputChange}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={closeForm}
          floated="left"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
}
