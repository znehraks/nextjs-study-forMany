import type { NextPage } from "next";
import HomeArticle from "../components/HomeArticle";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <HomeArticle />
    </div>
  );
};

export default Home;
