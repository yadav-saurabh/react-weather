import React, { useState, useEffect } from "react";
import { Layout, List, Button, Alert } from "antd";
import { getWeatherHistory } from "../../services/weather";
import HistoryListItem from "./histList";

const { Content } = Layout;
let skip = 0;

const getData = async skip => {
  try {
    const { data } = await getWeatherHistory(skip).catch(error => {
      if (error.response === undefined) {
        throw new Error({ msg: "Please check your internet connection" });
      }
      throw error.response.data;
    });
    return { data };
  } catch (error) {
    return { error };
  }
};

const History = () => {
  const [error, setError] = useState(false);
  const [initLoading, setinitLoading] = useState(true);
  const [data, setdata] = useState([]);
  const [list, setlist] = useState([{ loading: true }, { loading: true }]);
  const [dataComplete, setDataComplete] = useState(false);

  useEffect(() => {
    fetchData();
    return () => {
      skip = 0;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    setError(false);
    const { data: wData, error } = await getData(skip);
    if (initLoading) {
      setinitLoading(false);
    } else {
      setlist([...data, ...[{ loading: true }, { loading: true }]]);
    }
    if (error) {
      setError(true);
      return;
    }
    const { data: listData, limit, total } = wData;
    if (skip > total) {
      setDataComplete(true);
      alert("all data fetched");
    }
    skip = skip + limit;
    setTimeout(() => {
      setlist(initLoading ? [...listData] : [...data, ...listData]);
    }, 100);
    setdata([...data, ...listData]);
  };

  const loadMore =
    !initLoading && list.length !== 0 && !dataComplete ? (
      <div className="d-center mt-5">
        <Button onClick={() => fetchData()}>loading more</Button>
      </div>
    ) : null;

  return (
    <Content className="bg-white mh-6 mv-7 p-4" style={{ minHeight: "auto" }}>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={item => <HistoryListItem props={item} />}
      />
      {error && (
        <Alert message="Error Loading Data" description={error} type="error" />
      )}
    </Content>
  );
};

export default History;
