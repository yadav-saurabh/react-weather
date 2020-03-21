import React from "react";
import { Row, Col, Typography } from "antd";

import { weekDays } from "./../../constants/weekdays";

const { Text } = Typography;

const ForeCastList = ({ date, iconId, min, max }) => {
  const d = new Date(date);
  const day = weekDays[d.getDay()];

  return (
    <Row style={{ width: "100%" }}>
      <Col span={8}>{day}</Col>
      <Col span={8} className="d-center">
        <i className={`wi wi-owm-${iconId}`} style={{ fontSize: "2rem" }} />
      </Col>
      <Col span={8} style={{ textAlign: "right" }}>
        <Text>{Math.round(min)}&deg; / </Text>
        <Text>{Math.round(max)}&deg;</Text>
      </Col>
    </Row>
  );
};

export default ForeCastList;
