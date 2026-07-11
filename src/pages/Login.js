import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { setUser, setToken } from "../utils/Auth";

function Login() {

  const navigate = useNavigate();

  const [user, setUserState] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUserState({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "https://interviewtracker-backend-2o4l.onrender.com/users/login",
        user
      );

      if (!response.data || !response.data.token) {
        alert("Invalid Email or Password");
        return;
      }

      // Save token
      setToken(response.data.token);

      // Save complete user object
      setUser(response.data);

      // Save individual values
      localStorage.setItem("userName", response.data.name);
      localStorage.setItem("userEmail", response.data.email);
      localStorage.setItem("role", response.data.role);

      alert("Login Successful");

      // Navigate using React Router
      navigate("/dashboard", { replace: true });

    } catch (error) {

      console.error("Login Error:", error);

      if (error.response) {
        alert(error.response.data.message || "Login Failed");
      } else {
        alert("Unable to connect to server.");
      }

    }

  };

  return (

    <div className="container mt-5">

      <div className="card shadow p-4 col-md-5 mx-auto">

        <h2 className="text-center text-primary mb-4">
          Login
        </h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Login
          </button>

        </form>

        <hr />

        <div className="text-center">

          <p className="mb-2">
            Don't have an account?
          </p>

          <Link
            to="/register"
            className="btn btn-success w-100"
          >
            Register
          </Link>

        </div>

      </div>

    </div>

  );

}

export default Login;