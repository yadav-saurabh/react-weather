import React, { useEffect, useState } from "react";
import { Alert, Card, Row, Col, Typography, List } from "antd";
import { getWeather, getForecast } from "../../services/weather";

import { mapDataToWeather } from "./helperFunctions";
import CardHeader from "./cardHeader";
import ForeCastList from "./forecastList";

const { Title, Text } = Typography;

const smallIcon = {
  fontSize: "1.2rem",
  padding: "5px"
};

const getData = async city => {
  try {
    const { data: wData } = await getWeather(city).catch(error => {
      if (error.response === undefined) {
        throw new Error({ msg: "Please check your internet connection" });
      }
      throw error.response.data;
    });
    const { data: fData } = await getForecast(city).catch(error => {
      if (error.response === undefined) {
        throw new Error({ msg: "Please check your internet connection" });
      }
      throw error.response.data;
    });
    let weather = {};
    let forecast = [];

    if (Object.entries(wData).length) {
      weather = mapDataToWeather(wData);
    }

    if (Object.entries(fData).length) {
      for (let i = 0; i < fData.list.length; i += 8) {
        forecast.push(mapDataToWeather(fData.list[i + 4]));
      }
    }

    return { data: { weather, forecast } };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const Weather = ({ city }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await getData(city);
      setLoading(false);
      if (error) {
        setError(error.message);
      }
      setWeather(data.weather);
      setForecast(data.forecast);
    };
    fetchData();
  }, [city]);

  return (
    <Card
      className="mt-5"
      headStyle={{ border: "none" }}
      title={!loading && <CardHeader data={weather} />}
      loading={loading}
    >
      <Row>
        <Col span={14}>
          <Title style={{ fontSize: "5rem", fontWeight: 100, margin: 0 }}>
            {Math.round(weather.temperature)}&deg;C
          </Title>
          <Text>
            <i className="wi wi-strong-wind" style={smallIcon} />
            {weather.windSpeed} km/h Winds
          </Text>
          <i className="wi wi-humidity ml-4" style={smallIcon} />
          <Text>{weather.humidity}% Humidity</Text>
        </Col>
        <Col span={10} className="d-center">
          <i
            className={`wi wi-owm-${weather.iconId}`}
            style={{ fontSize: "6.5rem" }}
          />
        </Col>
      </Row>

      <List
        className="mt-5"
        size="large"
        bordered={false}
        dataSource={forecast}
        renderItem={({ date, iconId, min, max }) => (
          <List.Item>
            <ForeCastList date={date} iconId={iconId} min={min} max={max} />
          </List.Item>
        )}
      />

      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          closable
          onClose={() => setError("")}
        />
      )}
    </Card>
  );
};

export default Weather;
