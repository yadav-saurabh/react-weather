import React from "react";
import { Skeleton, Row, Col, Typography, List } from "antd";
import CardHeader from "../../components/weather/cardHeader";

const { Text, Title } = Typography;

const smallIcon = {
  fontSize: "1.2rem",
  padding: "5px"
};

const HistoryListItem = ({ props }) => {
  const { loading, temperature, windSpeed, humidity, iconId } = props;
  return (
    <List.Item>
      <Skeleton title={false} loading={loading} active>
        <div>
          <CardHeader data={{ ...props }} />
        </div>
        <Row>
          <Col span={14}>
            <Title style={{ fontSize: "3rem", fontWeight: 100, margin: 0 }}>
              {Math.round(temperature)}&deg;C
            </Title>
            <Text>
              <i className="wi wi-strong-wind" style={smallIcon} />
              {windSpeed} km/h Winds
            </Text>
            <i className="wi wi-humidity ml-4" style={smallIcon} />
            <Text>{humidity}% Humidity</Text>
          </Col>
          <Col span={10} className="d-center">
            <i
              className={`wi wi-owm-${iconId}`}
              style={{ fontSize: "6.5rem" }}
            />
          </Col>
        </Row>
      </Skeleton>
    </List.Item>
  );
};

export default HistoryListItem;
