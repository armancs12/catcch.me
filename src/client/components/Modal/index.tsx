import { Modal as BootstrapModal } from "react-bootstrap";
import Button from "../Button";
import styles from "./Modal.module.css";
import cx from "classnames";

type Props = {
  show: boolean;
  onClose: () => void;
  title: string;
  description?: string;
};

const Modal: React.FC<Props> = ({
  show,
  onClose,
  title,
  description,
  children,
}) => {
  return (
    <BootstrapModal
      show={show}
      onHide={onClose}
      className={"modal-content-transparent"}
    >
      <div className={styles.Modal}>
        <Button
          className={cx("btn-close", styles.CloseButton)}
          onClick={onClose}
        />
        <h1 className={styles.ModalTitle}>{title}</h1>
        {description && (
          <p className={cx("lead", styles.BoxDescription)}>{description}</p>
        )}
        {children}
      </div>
    </BootstrapModal>
  );
};

export default Modal;
