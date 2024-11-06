import { Outlet } from "react-router-dom";

import styles from './home.module.scss';
import NavBar from "../Commons/NavBar/NavBar";

function Home() {
  return (
    <section className={styles.homeSection}>
      <NavBar />
      <Outlet />
    </section>
  );
}

export default Home;
