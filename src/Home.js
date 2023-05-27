import React, { useState, useEffect } from "react";
import AppBar from "./components/AppBar";
import { Col, Row, Card, Table, Tag, Statistic, Spin, Divider } from "antd";
import { fetchUserTransactions } from "./utils/api";
import MalaysiaMap from "./components/MalaysiaMap";
// import NetworkGraph from "./components/NetworkGraph";
import { ClientMap, ClientImageMap } from "./state/client";
// fetchUserTransactions("970417-07-3958");

export default function Home() {
    const [searchValue, setSearchValue] = useState("");
    const [userTxns, setUserTxns] = useState([]);
    const [loading, setLoading] = useState(false)
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
                setLoading(true)
                const data = await fetchUserTransactions(searchValue);
                setUserTxns(data);
                setLoading(false)

            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false)
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
            render: (transaction_id) => {
                return <a target="_blank" href={`http://localhost:3000/trxnGraph/${transaction_id}`}>{transaction_id}</a>
            }
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
            render: (client_id) => {
                return (
                    <span className="tw-flex">
                        <img src={ClientImageMap[client_id]} width={30} className="tw-mx-2"></img>
                        <div>{ClientMap[client_id]}</div>
                    </span>
                )
            }
        },
        // TODO: fix this
        {
            title: "Tags",
            dataIndex: "anomaly_type",
            key: "anomaly_type",
            render: (tags) => {
                const tagsList = tags.split(",")
                return (
                    <>
                        {
                            tagsList.length > 0 ? tagsList.map((tag) => (
                                <Tag key={tag}>{tag}</Tag>
                            )) : <div></div>
                        }
                    </>
                )
            },
        }
    ];

    return (
        <div className="tw-bg-gray-200">
            <AppBar onSearch={handleSearch} />
            {
                loading ? <Spin></Spin> :
                    <div className="tw-p-4">
                        <div className="tw-font-light tw-text-sm tw-absolute" style={{ right: "10px" }}>
                            HIGHLY CONFIDENTIAL INFORMATION</div>

                        <div className="tw-font-bold tw-mb-4 tw-text-2xl">Transaction Metrics</div>

                        <Row gutter={[16, 16]}>
                            <Col span={18}>
                                <Row gutter={[16, 16]}>
                                    <Col span={8}>
                                        <Card>
                                            <Statistic
                                                title="Name"
                                                value={`Sachdave Singh`}
                                            />
                                        </Card>
                                    </Col>

                                    <Col span={8}>
                                        <Card>
                                            <Statistic
                                                title="Average Transaction Amount"
                                                value={aggregateResults.average}
                                                prefix="RM"
                                                precision={2}
                                            />
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card>
                                            <Statistic
                                                title="Max Transaction Amount"
                                                value={aggregateResults.max}
                                                prefix="RM"
                                                precision={2}
                                            />
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card>
                                            <Statistic
                                                title="Anomalies Detected"
                                                value={aggregateResults.totalAnomalies}
                                            />
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card>
                                            <Statistic
                                                title="Total Outflow"
                                                value={aggregateResults.sum}
                                                prefix="RM"
                                                precision={2}
                                            />
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={6}>
                                <div style={{ width: "100%", height: "100%" }}>
                                    <MalaysiaMap points={userTxns}></MalaysiaMap>
                                </div>
                            </Col>
                        </Row>
                        <Divider></Divider>
                        <div className="tw-font-bold tw-mb-4 tw-text-2xl">Transaction History</div>
                        <Card className="tw-mt-4">
                            <Table
                                columns={allTxnsColumns}
                                dataSource={userTxns.map((obj, index) => {
                                    return { ...obj, key: index + 1 };
                                })}
                            />

                        </Card>
                        <div className="tw-font-light tw-mb-4 tw-text-sm">
                            "CONFIDENTIAL: The contents of this page are highly classified and strictly confidential. Unauthorized access, disclosure, or dissemination of the information contained herein is strictly prohibited and may result in severe legal consequences. This page contains sensitive and privileged information that is intended solely for authorized individuals or entities.</div>
                    </div >
            }
        </div >

    );

}
