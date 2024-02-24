import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
// import { Link } from "react-router";
import "./Styles.css/Login.css";
import { Button } from "antd";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { username, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const tryLogin = () => {
    setLoading(true);

    axios
      .post(`https://localhost:44325/api/Auth/login`, formData)
      .then((response) => {
        setLoading(false);
        Swal.fire({
          title: "We said",
          text: response.data.message ?? "information",
          icon: response.data.success ? "success" : "error",
        });

        if (response.data.success) {
          setTimeout(() => {
            window.location = "/Shop";
          }, 1000);
        }
      })
      .catch((error) => {
        console.error(error);

        setLoading(false);
      });
  };

  return (
    <div className="anta-regular d-flex login-container  align-items-center justify-content-center">
      <h2>Login Page</h2>
      <div className="login-form">
        <div className="mb-3">
          <input
            type="username"
            name="username"
            value={username}
            className="form-control"
            onChange={handleChange}
            placeholder="username"
            required
          />
        </div>
        <br></br>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            className="form-control"
            value={password}
            onChange={handleChange}
            placeholder="password"
            required
          />
        </div>
        <Button
          className="btn btn-primary mb-3"
          onClick={() => tryLogin()}
          loading={loading}
        >
          Login
        </Button>
      </div>
      <div>
        <a href="/register">Don't have an account?</a>
      </div>
    </div>
  );
};

export default Login;
