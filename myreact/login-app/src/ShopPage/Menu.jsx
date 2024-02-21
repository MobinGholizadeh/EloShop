import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const MyMenu = ({ addTab }) => {
  const [openKeys, setOpenKeys] = useState(["sub1"]);

  const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Menu
      className="anta-regular"
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{ width: 256 }}
    >
      <Menu.SubMenu key="sub1" icon={<MailOutlined />} title="Emails">
        <Menu.Item key="1" onClick={() => addTab("Messages")}>
          Messages
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="sub2" icon={<AppstoreOutlined />} title="Shop">
        <Menu.Item key="5" onClick={() => addTab("Shop")}>
          Products
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="sub4" icon={<SettingOutlined />} title="Settings">
        <Menu.Item key="9" onClick={() => addTab("Setting")}>
          Just for testing
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default MyMenu;
