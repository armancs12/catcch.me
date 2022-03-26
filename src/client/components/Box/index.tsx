import styles from "./Box.module.css";
import cx from "classnames";

type Props = {
  title: string;
  description?: string | React.ReactElement;
};

const Box: React.FC<Props> = ({ title, description, children }) => {
  return (
    <div className={styles.Box}>
      <h1 className={styles.BoxTitle}>{title}</h1>
      {description && (
        <p className={cx("lead", styles.BoxDescription)}>{description}</p>
      )}
      {children}
    </div>
  );
};

export default Box;
