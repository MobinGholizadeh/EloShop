import React from "react";
import { Tabs } from "antd";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";

const { TabPane } = Tabs;

class CenterManagement extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <div className="row">
          <div className="col-12" style={{ marginTop: 3 }}>
            <Tabs type="card" style={{ marginRight: -13 }}>
              <TabPane tab={t("ProductsList")} key="1">
                <ProductList />
              </TabPane>
              <TabPane tab={t("ProductDetail")} key="2">
                <ProductDetail />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </>
    );
  }
}

const mapState = (state) => {
  return {};
};
const mapDis = (dispatch) => {
  return {};
};

export default CenterManagement;
