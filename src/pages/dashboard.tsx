import { asAuthenticated } from "@client/auth";
import Button from "@client/components/Button";
import ProjectCard from "@client/components/ProjectCard";
import { NextPage } from "next";
import { Col, Row } from "react-bootstrap";
import styles from "@client/styles/DashboardPage.module.css";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const DashboardPage: NextPage = () => {
  const { data } = useSWR("/api/projects", (url) =>
    fetch(url).then((data) => data.json())
  );

  return (
    <main>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className={styles.Title}>Dashboard</h1>
        <Button className="my-2">Add New Project</Button>
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
