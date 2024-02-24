import { Button, Card, Col, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductList = ({}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://localhost:44325/api/Products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const truncateDescription = (description, maxLength) => {
    const lines = description.split("\n");
    let truncatedDescription = lines[0];

    if (truncatedDescription.length > maxLength) {
      truncatedDescription =
        truncatedDescription.substring(0, maxLength - 3) + "...";
    }
    return truncatedDescription;
  };

  const renderProducts = () => {
    return products.map((product) => (
      <Col span={8}>
        <Card hoverable style={{ width: 240 }} className="anta-regular">
          <h3>{product.productName}</h3>
          <p>{truncateDescription(product.productDesc, 50)}</p>
          <img
            src={`https://localhost:44325/api/Products/DownloadImage/?imageName=${product.productIamge}`}
            alt={product.productName}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Card>
      </Col>
    ));
  };

  return (
    <div className="anta-regular">
      <h2>Product List</h2>
      <Row>{renderProducts()}</Row>
      {/* <Button onClick={() => addTab({ key: "home" })}>add tab</Button> */}
    </div>
  );
};

export default ProductList;
