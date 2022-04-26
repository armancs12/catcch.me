import { FC } from "react";
import { Card } from "react-bootstrap";
import styles from "./ProjectLog.module.css";
import cx from "classnames"
import { formatDistanceToNow } from "date-fns";

type LogType = "ERROR" | "INFO" | "WARNING";

type Props = {
  type: LogType;
  message: string;
  stack?: string;
  additionalInfo?: string;
  dateCreated: Date;
}

const ProjectLog: FC<Props> = ({ message, type, stack, additionalInfo, dateCreated }) => {
  return (
    <Card className={styles.Main}>
      <Card.Header className={cx("d-flex justify-content-between align-items-center", styles.Header)}>
        <h5>{type}</h5>
        <span>{formatDistanceToNow(new Date(dateCreated.toLocaleString()))} ago</span>
      </Card.Header>
      <Card.Body>
        <details>
          <summary><Card.Title as="span" className={styles.Title}>{message}</Card.Title></summary>
          {stack && (
            <>
              <div className={styles.Label}>Stack</div>
              <pre className={styles.Info}>{stack}</pre>
            </>
          )}

          {additionalInfo && (
            <>
              <div className={styles.Label}>Additional Info</div>
              <pre className={styles.Info}>{additionalInfo}</pre>
            </>
          )}
        </details>
      </Card.Body>
    </Card>
  )
}

export default ProjectLog;