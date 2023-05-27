import React, { useState, useEffect } from "react";
import AppBar from "./components/AppBar";
import CardScore from "./components/CardScore";
import { Col, Row } from "antd";

import { fetchUserTransactions } from "./utils/api";
// fetchUserTransactions("970417-07-3958");

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [userTxns, setUserTxns] = useState(null);

  const handleSearch = (searchValue) => {
    setSearchValue(searchValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!searchValue) return;
      try {
        const data = await fetchUserTransactions(searchValue);
        setUserTxns(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchValue]);

  return (
    <div>
      <AppBar onSearch={handleSearch} />
      <Row gutter={16}>
        <Col span={6}>
          <CardScore metric="Average Transaction Amount" value="100" />
        </Col>
        <Col span={6}>
          <CardScore metric="Max Transaction Amount" value="100" />
        </Col>
        <Col span={6}>
          <CardScore metric="Anomalies Detected" value="100" />
        </Col>
        <Col span={6}>
          <CardScore metric="Total Outflow" value="100" />
        </Col>
      </Row>
    </div>
  );
}
