import React from "react";
import { Button as BootstrapButton } from "react-bootstrap";
import styles from "./Button.module.css";
import cx from "classnames";

type Props = {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "reset" | "submit" | "button";
  wide?: boolean;
};

const Button: React.FC<Props> = ({
  children,
  className,
  onClick,
  type,
  wide = false,
}) => {
  return (
    <BootstrapButton
      variant="dark"
      className={cx(styles.Button, className, wide && styles.ButtonWide)}
      onClick={onClick}
      type={type}
    >
      {children}
    </BootstrapButton>
  );
};

export default Button;
