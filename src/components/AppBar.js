import { Layout, Avatar, Select } from "antd";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Option } = Select;

const AppBar = ({ onSearch }) => {
  const handleChange = (value) => {
    onSearch(value);
  };

  const ids = [
    "970417-07-3958",
    "650811-02-5485",
    "720622-04-6859",
    "811104-11-9852",
    "891006-10-1234",
    "920927-09-4678",
    "950721-09-5865",
  ];

  return (
    <Header style={{ background: "white" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <MenuOutlined style={{ fontSize: "20px", marginRight: "16px" }} />

        <div style={{ flex: "1", marginRight: "16px" }}>
          <Select
            placeholder="Enter I.C. Number or Account Identifier"
            prefix={<SearchOutlined style={{ color: "gray" }} />}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            {ids.map((id) => (
              <Option key={id} value={id}>
                {id}
              </Option>
            ))}
          </Select>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            size="small"
            src="avatar.png" // Replace with the actual image source
            style={{ marginRight: "8px" }}
          />
          <span>User Name</span>
        </div>
      </div>
    </Header>
  );
};

export default AppBar;
