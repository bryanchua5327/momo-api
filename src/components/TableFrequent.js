import { Card, Table } from "antd";

const TableFrequent = () => {
  const columns = [
    {
      title: "Account ID",
      dataIndex: "accId",
      key: "accId",
    },
    {
      title: "Account Name",
      dataIndex: "accName",
      key: "accName",
    },
    {
      title: "Total Count",
      dataIndex: "totalCount",
      key: "totalCount",
    },
    {
      title: "Average Amount",
      dataIndex: "avgAmt",
      key: "avgAmt",
    },
    {
      title: "Max Amount",
      dataIndex: "maxAmt",
      key: "maxAmt",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmt",
      key: "totalAmt",
    },
  ];
  const data = [];
  return (
    <Card>
      <p className="tw-text-lg">Most Frequently Transacted With</p>
      <Table columns={columns} dataSource={data} />
    </Card>
  );
};

export default TableFrequent;
