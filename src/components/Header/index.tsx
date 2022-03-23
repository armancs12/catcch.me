import styles from "./Header.module.css";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Logo from "../Logo";
import cx from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

const HeaderLink = (props: { href: string; text: string }) => {
  const { pathname } = useRouter();
  const isActive = pathname === props.href;

  return (
    <Link href={props.href} passHref>
      <Nav.Link active={isActive}>
        {props.text}
      </Nav.Link>
    </Link>
  );
};

const Header: React.FC = () => {
  return (
    <Navbar
      className={cx(styles.Header)}
      collapseOnSelect
      expand="lg"
      variant="dark"
    >
      <Container className={styles.HeaderContainer}>
        <Link href="/" passHref>
          <Navbar.Brand>
            <Logo size="small" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className={styles.ResponsiveNavbar}
        >
          <Nav className="me-auto">
            <HeaderLink href="/about" text="About" />
          </Nav>
          <Nav>
            <HeaderLink href="/auth/login" text="Login" />
            <HeaderLink href="/auth/register" text="Register" />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
