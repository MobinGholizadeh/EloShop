import {
  DollarTwoTone,
  HomeTwoTone,
  MehTwoTone,
  ProfileTwoTone,
} from "@ant-design/icons";
import { Menu, Tabs } from "antd";
import React from "react";
import { connect } from "react-redux";
import Home from "./Home";
import ProductTables from "./ProductTables";
import { addTab, removeTab, setActiveKey } from "./Redux/Actions";
import store from "./Redux/Store";
import ProductList from "./ShopPage/ProductList";
import Tab1 from "./Tab1";

class Dashboard extends React.Component {
  menuTabItems = [
    {
      key: "home",
      icon: <HomeTwoTone />,
      label: "Home",
      component: <Home />,
    },
    {
      key: "product-list",
      icon: <DollarTwoTone />,
      label: "Products",
      component: <ProductList />,
    },
    {
      key: "Orders",
      icon: <ProfileTwoTone />,
      label: "Orders",
      component: <Tab1 />,
    },
    {
      key: "ProductTables",
      icon: <MehTwoTone />,
      label: "Tables",
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
          <div
            style={{
              width: 200,
              height: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="h-100">
              <Menu
                style={{
                  width: 256,
                  height: "90vh",
                }}
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode={"inline"}
                theme={"light"}
                onClick={this.onClickMenu}
                items={this.menuTabItems}
              />
              <div
                style={{
                  height: "10vh",
                  width: 256,
                  backgroundColor: "#ffffff",
                }}
              >
                <a
                  href="/Login"
                  style={{ display: "block" }}
                  className="btn btn-block btn-danger"
                >
                  Log Out
                </a>
              </div>
            </div>
            <div className="w-100"></div>
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
