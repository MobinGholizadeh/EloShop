import { DashOutlined, UnorderedListOutlined } from "@ant-design/icons";
import React from "react";
import Home from "./Home";
import ProductList from "./ShopPage/ProductList";
import Tab1 from "./Tab1";
import store from "./Redux/Store";
import ProductTables from "./ProductTables";
import { addTab, removeTab, setActiveKey } from "./Redux/Actions";
import { Menu, Tabs } from "antd";
import { connect } from "react-redux";

class Dashboard extends React.Component {
  menuTabItems = [
    {
      key: "home",
      icon: <DashOutlined />,
      label: "Home",
      component: <Home />,
    },
    {
      key: "product-list",
      icon: <UnorderedListOutlined />,
      label: "Products",
      component: <ProductList />,
    },
    {
      key: "Will be edited",
      icon: <UnorderedListOutlined />,
      label: "Will be edited",
      component: <Tab1 />,
    },
    {
      key: "ProductTables",
      icon: <UnorderedListOutlined />,
      label: "Admin Product Tables",
      component: <ProductTables />,
    },
  ];

  onClickMenu = (e) => {
    let menuItem = this.menuTabItems.find((x) => x.key === e.key);
    if (menuItem) this.props.setAddTab(menuItem.key);
  };

  onChangeTab = (key) => {
    store.dispatch(setActiveKey(key));
  };

  onEdit = (targetKey, action) => {
    if (action === "add") {
    } else {
      store.dispatch(removeTab(targetKey));
    }
  };

  render() {
    return (
      <div className="anta-regular">
        <div style={{ display: "flex" }}>
          <div style={{ width: 200 }}>
            <Menu
              style={{
                width: 256,
              }}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode={"inline"}
              theme={"light"}
              onClick={this.onClickMenu}
              items={this.menuTabItems}
            />
          </div>
          <div style={{ flex: 1, marginLeft: 100 }}>
            <Tabs
              hideAdd
              onChange={this.onChangeTab}
              activeKey={this.props.activeKey}
              type="editable-card"
              onEdit={this.onEdit}
              items={
                this.props.tabs?.map((tab) => {
                  let menu = this.menuTabItems.find((x) => x.key === tab.key);
                  if (menu)
                    return {
                      key: tab.key,
                      children: menu.component,
                      label: menu.label,
                    };

                  return { key: tab.key, label: "unknown" };
                }) ?? []
              }
            />
          </div>
        </div>
        <div>
          <a href="/Login">Log Out</a>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    tabs: state.tabList,
    activeKey: state.activeKey,
  };
};
const mapDis = (dispatch) => {
  return {
    setAddTab: (k) => dispatch(addTab(k)),
  };
};

export default connect(mapState, mapDis)(Dashboard);
