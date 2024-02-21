import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://localhost:44325/api/Auth/register`,
        formData
      );
      Swal.fire({
        title: "Response",
        text: response.data.message,
        icon: response.data.success ? "success" : "error",
      });
      console.log(response.data);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="anta-regular d-flex  justify-content-center register-container">
      <h2>Register Page</h2>
      <form
        className="register-form align-items-center justify-content-center mt-lg-5"
        onSubmit={handleSubmit}
      >
        <div>
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
        <div>
          <input
            type="password"
            name="password"
            value={password}
            className="form-control"
            onChange={handleChange}
            placeholder="password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
      <div>
        <a href="/login">You already have an account?</a>
      </div>
    </div>
  );
};

export default Register;
