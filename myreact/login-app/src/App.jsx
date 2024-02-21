import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Shop from "./ShopPage/Shop";

const App = () => {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/ProductDetail/:productId" element={<Shop />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
