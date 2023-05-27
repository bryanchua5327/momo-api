import React, { useState, useEffect } from "react";
import AppBar from "./components/AppBar";
import CardScore from "./components/CardScore";

import { Col, Row, Card, Table, Tag } from "antd";

import { fetchUserTransactions } from "./utils/api";
// fetchUserTransactions("970417-07-3958");

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [userTxns, setUserTxns] = useState([]);

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

  const allTxnsColumns = [
    {
      title: "Transaction ID",
      dataIndex: "transaction_id",
      key: "transaction_id",
    },
    {
      title: "Transaction Details",
      dataIndex: "transaction_details",
      key: "transaction_details",
    },
    {
      title: "Date",
      dataIndex: "transaction_date",
      key: "transaction_date",
    },
    {
      title: "Transacted With",
      dataIndex: "transacted_to",
      key: "transacted_to",
    },
    {
      title: "Amount",
      dataIndex: "transaction_amount",
      key: "transaction_amount",
    },
    {
      title: "Platform",
      dataIndex: "client_id",
      key: "client_id",
    },
    // TODO: fix this
    // {
    //   title: "Tags",
    //   dataIndex: "anomaly_type",
    //   key: "anomaly_type",
    //   render: (tags) => (
    //     <>
    //       {tags.map((tag) => (
    //         <Tag key={tag}>{tag}</Tag>
    //       ))}
    //     </>
    //   ),
    // },
  ];

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

      <Card>
        <p className="tw-text-lg">All Transactions</p>
        <Table
          columns={allTxnsColumns}
          dataSource={userTxns.map((obj, index) => {
            return { ...obj, key: index + 1 };
          })}
          expandable={{
            expandedRowRender: (record) => (
              <p
                style={{
                  margin: 0,
                }}
              >
                {record.description}
              </p>
            ),
            rowExpandable: (record) =>
              record.description !== "No transaction flow found.",
          }}
        />
      </Card>
    </div>
  );
}
