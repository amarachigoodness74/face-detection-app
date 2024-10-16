import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from '../../state/UserContext';
import styles from "./Navigation.module.css";

const Navigation = () => {
  const { userData } = useUserContext();
  if (userData.isSignedIn) {
    return (
      <nav className={styles.Nav}>
        <Link to="/signout">Sign Out</Link>
      </nav>
    );
  } else {
    return (
      <nav className={styles.Nav}>
        <Link to="/">Sign In</Link>
        <Link to="/signup">Register</Link>
      </nav>
    );
  }
};

export default Navigation;
