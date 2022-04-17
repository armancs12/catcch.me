import { asAuthenticated } from "@client/auth";
import Button from "@client/components/Button";
import ProjectCard from "@client/components/ProjectCard";
import { NextPage } from "next";
import { Col, Row } from "react-bootstrap";
import styles from "@client/styles/DashboardPage.module.css";
import CreateProjectModal from "@client/components/CreateProjectModal";
import { useState } from "react";
import useSWR from "swr";

const DashboardPage: NextPage = () => {
  const [modalShow, setModalShow] = useState(false);
  const { data, mutate } = useSWR("/api/projects");

  const handleModalClose = () => setModalShow(false);
  const handleModalOpen = () => setModalShow(true);

  const handleCreateProject = async (data: { name: string; url?: string }) => {
    const response = await fetch("/api/projects", {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (response.ok) {
      mutate();
    }
  };

  return (
    <main>
      <CreateProjectModal
        show={modalShow}
        onClose={handleModalClose}
        onCreate={handleCreateProject}
      />
      <div className="d-flex justify-content-between align-items-center">
        <h1 className={styles.Title}>Dashboard</h1>
        <Button className="my-2" onClick={() => handleModalOpen()}>
          Add New Project
        </Button>
      </div>
      <div className="mt-2 mt-md-4">
        {data && (
          <Row className="g-3">
            {data.map((project: { id: string; name: string; url?: string }) => (
              <Col key={project.id} md={6} lg={4} xxl={3}>
                <ProjectCard
                  id={project.id}
                  name={project.name}
                  url={project.url}
                />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </main>
  );
};

export default asAuthenticated(DashboardPage);
