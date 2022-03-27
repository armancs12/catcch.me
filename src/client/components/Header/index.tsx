import styles from "./Header.module.css";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Logo from "../Logo";
import cx from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const HeaderLink = (props: { href: string; text: string }) => {
  const { pathname } = useRouter();
  const isActive = pathname === props.href;

  return (
    <Link href={props.href} passHref>
      <Nav.Link active={isActive}>{props.text}</Nav.Link>
    </Link>
  );
};

const Header: React.FC = () => {
  const { data, status } = useSession();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated" && data != null;

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
          {!isLoading &&
            (isAuthenticated ? (
              <Nav>
                <HeaderLink
                  href="/auth/profile"
                  text={data.user?.name ?? data.user?.email ?? "Profile"}
                />
                <HeaderLink href="/auth/logout" text="Logout" />
              </Nav>
            ) : (
              <Nav>
                <HeaderLink href="/auth/login" text="Login" />
                <HeaderLink href="/auth/register" text="Register" />
              </Nav>
            ))}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
