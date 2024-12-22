import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../state/UserContext";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const navigate = useNavigate();
  const { userData, updateUser } = useUserContext();
  if (userData.isSignedIn) {
    return (
      <nav className={styles.Nav}>
        <button
          onClick={() => {
            updateUser({
              imageUrl: "",
              isSignedIn: false,
            });
            navigate("/");
          }}
        >
          Sign Out
        </button>
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
