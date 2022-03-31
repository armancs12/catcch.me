import Link from "next/link";
import React from "react";
import styles from "./ProjectCard.module.css";
import cx from "classnames";

type Props = {
  id: string;
  name: string;
  url?: string;
};

const ProjectCard: React.FC<Props> = ({ id, name, url }) => {
  return (
    <Link href={`/projects/${id}`} passHref>
      <a className={cx(styles.ProjectCard, !url && styles.OnlyTitle)}>
        <h2>{name}</h2>
        <p>{url}</p>
      </a>
    </Link>
  );
};

export default ProjectCard;
