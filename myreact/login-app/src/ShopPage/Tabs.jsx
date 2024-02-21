import React from "react";
import { Tabs as MyTabs } from "antd";

const Tabs = ({ tabList }) => {
  const { TabsPanel } = Tabs;
  return (
    <MyTabs defaultActiveKey="1" className="anta-regular">
      {tabList?.map((item) => {
        return (
          // adding ANTD closable
          <TabsPanel
            closable={false}
            tab={item?.title}
            key={item?.key}
          ></TabsPanel>
        );
      })}
    </MyTabs>
  );
};

export default Tabs;
