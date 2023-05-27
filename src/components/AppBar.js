import { useState } from "react";
import { Layout, Input, Avatar } from "antd";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";

const { Header } = Layout;

const AppBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("970417-07-3958");

  const handleSearch = () => {
    onSearch(searchValue);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

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
          <Input
            placeholder="Enter I.C. Number or Account Identifier"
            prefix={<SearchOutlined style={{ color: "gray" }} />}
            value={searchValue}
            onChange={handleChange}
            onPressEnter={handleSearch}
            style={{ width: "100%" }}
          />
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
