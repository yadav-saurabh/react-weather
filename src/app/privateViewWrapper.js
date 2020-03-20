import React from "react";
import { Layout } from "antd";
import SideBar from "../components/sidebar";

import styles from "./privateViewWrapper.module.scss";

const PrivateViewWrapper = ({ Component }) => {
  return (
    <Layout className={styles.container}>
      <SideBar />
      <Layout className={styles.contentWrapper}>
        <Component />
      </Layout>
    </Layout>
  );
};

export default PrivateViewWrapper;
