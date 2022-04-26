import ProjectLog from "@client/components/ProjectLog";
import useDynamicParam from "@client/use-dynamic-param";
import useFetch from "@client/use-fetch";
import useSWR from "swr";
import styles from "@client/styles/ProjectPage.module.css";

const ProjectPage = () => {
  const id = useDynamicParam("id");
  const { data: logs } = useSWR(id ? `/api/projects/${id}/logs` : undefined);
  const { data: project, loading } = useFetch(id ? `/api/projects/${id}` : undefined);

  if (loading) {
    return null;
  }

  return (
    <div>
      <h1>{project?.name}</h1>
      <ul className={styles.ProjectLogs}>
        {logs?.map((log: any) => (
          <li key={log.id} className={styles.ProjectLog}>
            <ProjectLog
              type={log.type}
              message={log.message}
              stack={log.stack}
              additionalInfo={log.additionalInfo}
              dateCreated={log.dateCreated}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProjectPage;