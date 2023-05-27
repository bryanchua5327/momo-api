import React, { useState, useEffect } from "react";
import AppBar from "./components/AppBar";
import CardScore from "./components/CardScore";

import { Col, Row, Card, Table, Tag } from "antd";

import { fetchUserTransactions } from "./utils/api";
// fetchUserTransactions("970417-07-3958");

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [userTxns, setUserTxns] = useState([]);
  const [aggregateResults, setAggregateResults] = useState({
    average: 0,
    max: 0,
    sum: 0,
    count: 0,
    totalAnomalies: 0,
  });

  const handleSearch = (searchValue) => {
    setSearchValue(searchValue);
  };

  // Fetch user transactions when search bar is triggered
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

  // Upon receiving user transactions, calculate aggregateResults
  useEffect(() => {
    if (Object.keys(userTxns).length === 0) return;

    const aggregateResults = userTxns.reduce(
      (acc, obj) => {
        const { transaction_amount, is_anomaly } = obj;
        // Calculate sum
        acc.sum += transaction_amount;
        // Calculate maximum value
        acc.max = Math.max(acc.max, transaction_amount);
        // Calculate count
        acc.count++;

        if (is_anomaly) {
          acc.totalAnomalies++;
        }
        return acc;
      },
      { sum: 0, max: -Infinity, count: 0, totalAnomalies: 0 }
    );

    // Calculate average
    aggregateResults.average = aggregateResults.sum / aggregateResults.count;
    setAggregateResults(aggregateResults);
  }, [userTxns]);

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
          <CardScore
            metric="Average Transaction Amount"
            value={`RM ${aggregateResults.average.toFixed(2)}`}
          />
        </Col>
        <Col span={6}>
          <CardScore
            metric="Max Transaction Amount"
            value={`RM ${aggregateResults.max}`}
          />
        </Col>
        <Col span={6}>
          <CardScore
            metric="Anomalies Detected"
            value={aggregateResults.totalAnomalies}
          />
        </Col>
        <Col span={6}>
          <CardScore
            metric="Total Outflow"
            value={`RM ${aggregateResults.sum.toFixed(2)}`}
          />
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
