import React from "react";
import { Typography } from "antd";

import { weekDays } from "./../../constants/weekdays";

const { Title, Text } = Typography;

const CardHeader = ({ data }) => {
  const { date, description, city, country } = data;

  const d = new Date(date);
  const day = weekDays[d.getDay()];

  let hours = d.getHours();
  let minutes = d.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const time = hours + ":" + minutes + " " + ampm;

  const desc = !description
    ? ""
    : description.charAt(0).toUpperCase() + description.substr(1).toLowerCase();
  return (
    <>
      <Title level={3} style={{ margin: 0 }}>
        {city + ", " + country}
      </Title>
      <Text
        type="secondary"
        style={{ fontSize: 14 }}
      >{`${day}, ${time}, ${desc}`}</Text>
    </>
  );
};

export default CardHeader;
