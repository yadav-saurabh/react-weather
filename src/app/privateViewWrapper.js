import React from "react";
import { Layout } from "antd";
import SideBar from "../components/sidebar";

import styles from "./privateViewWrapper.module.scss";

const PrivateViewWrapper = ({ component: Component, ...rest }) => {
  return (
    <Layout className={styles.container}>
      <SideBar {...rest} />
      <Layout className={styles.contentWrapper}>
        <Component {...rest} />
      </Layout>
    </Layout>
  );
};

export default PrivateViewWrapper;
