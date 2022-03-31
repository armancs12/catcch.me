import React, { FormEvent, useState } from "react";
import Button from "../Button";
import Modal from "../Modal";
import styles from "./CreateProjectModal.module.css";
import { Form } from "react-bootstrap";

type Props = {
  show: boolean;
  onClose: () => void;
  onCreate: (data: { name: string; url?: string }) => void;
};

const CreateProjectModal: React.FC<Props> = ({ show, onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [url, setURL] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const data = {
      name: name,
      url: url != "" ? url : undefined,
    };

    onCreate(data);
    onClose();
    setName("");
    setURL("");
  };

  return (
    <Modal show={show} onClose={onClose} title={"Create Project"}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mt-2" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            type="name"
            placeholder="Project Name"
            required
          />
        </Form.Group>
        <Form.Group className="mt-2" controlId="formUrl">
          <Form.Label>URL</Form.Label>
          <Form.Control
            value={url}
            onChange={(e) => setURL(e.target.value)}
            name="url"
            type="url"
            placeholder="Project URL"
          />
        </Form.Group>
        <Button type="submit" wide={true} className={"mt-4"}>
          Create
        </Button>
      </Form>
    </Modal>
  );
};

export default CreateProjectModal;
