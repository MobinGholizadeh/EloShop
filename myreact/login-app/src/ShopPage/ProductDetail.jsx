import React from "react";

const ProductDetail = ({ selectedProduct }) => {
  return (
    <div className="anta-regular">
      <h2>Product Detail</h2>
      {selectedProduct && (
        <div>
          <h3>{selectedProduct.productName}</h3>
          <p>{selectedProduct.productDesc}</p>
          <img
            src={`https://localhost:44325/api/Products/DownloadImage/?imageName=${selectedProduct.productIamge}`}
            alt={selectedProduct.productName}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
