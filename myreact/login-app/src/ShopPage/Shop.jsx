import React, { useState } from "react";
import Menu from "./Menu";
import ProductList from "./ProductList";
import "../Styles.css/App.css";
import { connect } from "react-redux";
import { displayProductDetails } from "../Redux/Actions";
import { changeTab, changePage } from "../Redux/Actions";
import ProductDetail from "./ProductDetail";

const Shop = ({ activeTab, setActiveTab, currentPage, setCurrentPage }) => {
  const [tabList, SetTabList] = useState([]);
  const addTab = (tabTitle) => {
    let lastKey = tabList[tabList.length - 1];
    let key = 1;
    if (lastKey) key = lastKey.key + 1;
    SetTabList([
      ...tabList,
      {
        title: tabTitle,
        key,
      },
    ]);
  };
  return (
    <div className="anta-regular">
      <div style={{ display: "flex" }}>
        <div style={{ width: 200 }}>
          <Menu addTab={addTab} onItemClick={setActiveTab} />
        </div>
        <div style={{ flex: 1, marginLeft: 100 }}>
          <h1>Shop Page</h1>
          <Tabs tabList={tabList} activeTab={activeTab} />
          {currentPage === "ProductDetail" ? (
            <ProductDetail />
          ) : (
            <ProductList />
          )}
        </div>
      </div>
      <div>
        <a href="/Login">Log Out</a>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activeTab: state.activeTab,
    currentPage: state.currentPage,
    selectedProduct: state.selectedProduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePage: (page) => dispatch(changePage(page)),
    onChangeTab: (tab) => dispatch(changeTab(tab)),
    onDisplayProductDetails: (product) =>
      dispatch(displayProductDetails(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
