import React, { useEffect, useState } from "react";
import NetworkGraph from "./components/NetworkGraph";
import { Card, Spin } from "antd"
import {
    useParams
} from "react-router-dom";
import { fetchTransactionsGraph } from "./utils/api";
import { isEmpty, stubFalse } from "lodash";


export default function Graph() {
    const [trxnData, setTrxnData] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await fetchTransactionsGraph();

                setTrxnData(data[0])
                setLoading(false)
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false)
            }
        };

        fetchData();
    }, []);

    const { id } = useParams();

    if (loading) {
        return <Spin></Spin>
    }
    return (
        <Card className="tw-m-4">
            <div className="tw-font-bold tw-mb-4 tw-text-2xl">Transaction Graph</div>
            <div className="tw-font-bold tw-mb-4">{id}</div>
            {!isEmpty(trxnData) && < NetworkGraph data={trxnData}></NetworkGraph>}
        </Card >
    )
}