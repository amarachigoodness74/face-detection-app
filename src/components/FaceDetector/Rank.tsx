import React from "react";
import { useUserContext } from "../../state/UserContext";
import Styles from "./FaceDetector.module.css";

const Rank = () => {
  const { userData } = useUserContext();
  const { name, entries } = userData.user;
  return (
    <div className={Styles.Rank}>
      <div className={Styles.RankDetails}>
        {`${name}, your current entry count is...`}
      </div>
      <div className={Styles.RankScore}>{entries}</div>
    </div>
  );
};

export default Rank;
