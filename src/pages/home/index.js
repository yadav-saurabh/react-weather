import React, { useState } from "react";
import { Layout, Input, AutoComplete, Empty, Spin, Alert } from "antd";

import { cities } from "./../../services/city";
import Weather from "../../components/weather";

const { Content } = Layout;

const getCities = async name => {
  try {
    const { data } = await cities(name).catch(error => {
      if (error.response === undefined) {
        throw new Error({ msg: "Please check your internet connection" });
      }
      throw error.response.data;
    });
    let citiesData = [];
    if (data?.count > 0) {
      citiesData = data._embedded["city:search-results"].map(result => ({
        label: result.matching_full_name,
        value: result.matching_full_name,
        key: result._links["city:item"].href
          .split("/")[5]
          .replace("geonameid:", "id=")
      }));
    }
    return { data: citiesData };
  } catch (error) {
    return { error };
  }
};

const Home = () => {
  const noData = { key: "nd", label: <Empty />, value: "" };
  const loadingData = { key: "ld", label: <Spin />, value: "" };

  const [value, setValue] = useState("");
  const [options, setOptions] = useState([noData]);
  const [slectedCity, setSlectedCity] = useState("");

  const onSearch = async searchText => {
    setOptions([loadingData]);
    const { data, error } = await getCities(searchText);
    if (error) {
      const errData = {
        key: "ed",
        label: <Alert message="Error Fetching Data" type="error" />,
        value: ""
      };
      setOptions([errData]);
      return;
    }
    const optionData =
      data.length > 0
        ? data
        : [{ label: searchText, value: searchText, key: "q=" + searchText }];
    setOptions(optionData);
  };

  const onSelect = (data, { key }) => {
    if (key === "ed" || key === "ld" || key === "nd") {
      return;
    }
    setSlectedCity(key);
  };

  const onChange = data => {
    setValue(data);
  };

  return (
    <Content className="bg-white mh-6 mv-7 p-4" style={{ minHeight: "auto" }}>
      <AutoComplete
        value={value}
        options={options}
        style={{ width: "100%" }}
        onSelect={onSelect}
        onChange={onChange}
        onSearch={onSearch}
      >
        <Input.Search size="large" placeholder="Input city name" />
      </AutoComplete>
      {slectedCity && <Weather city={slectedCity} />}
    </Content>
  );
};

export default Home;
