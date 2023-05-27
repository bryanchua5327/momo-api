import { Card, Table, Tag } from "antd";

const TableTransactions = () => {
  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "txnId",
      key: "txnId",
    },
    {
      title: "Transaction Name",
      dataIndex: "txnName",
      key: "txnName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Transacted With",
      dataIndex: "transactedWith",
      key: "transactedWith",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Platform",
      dataIndex: "platform",
      key: "platform",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags) => (
        <>
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </>
      ),
    },
  ];
  const data = [
    {
      key: 1,
      txnId: "SDL139SDJ103S",
      txnName: "McDonald's Drive Thru",
      date: "2023-04-05 12.23 a.m",
      transactedWith: "RESTORAN GERBANG KUNING",
      total: "RM 23.56",
      platform: "MAYBANK",
      tags: ["HIGH AMOUNT", "REPEATED TXN"],
    },
    {
      key: 2,
      txnId: "SDL139SDJ103S",
      txnName: "McDonald's Drive Thru",
      date: "2023-04-05 12.23 a.m",
      transactedWith: "RESTORAN GERBANG KUNING",
      total: "RM 23.56",
      platform: "MAYBANK",
      tags: ["HIGH AMOUNT", "REPEATED TXN"],
    },
    {
      key: 3,
      txnId: "SDL139SDJ103S",
      txnName: "McDonald's Drive Thru",
      date: "2023-04-05 12.23 a.m",
      transactedWith: "RESTORAN GERBANG KUNING",
      total: "RM 23.56",
      platform: "MAYBANK",
      tags: ["HIGH AMOUNT", "REPEATED TXN"],
    },
  ];
  return (
    <Card>
      <p className="tw-text-lg">All Transactions</p>
      <Table
        columns={columns}
        dataSource={data}
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
  );
};

export default TableTransactions;
