import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import axios from "axios";

const UserTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://localhost:44325/api/Users");
        setData(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "username",
      dataIndex: "username",
    },
    {
      title: "option",
      render: (item) => {
        return (
          <Button type="primary" onClick={() => console.log(item.id)}>
            Chat
          </Button>
        );
      },
    },
  ];
  return <Table dataSource={data} columns={columns}></Table>;
};

export default UserTable;
