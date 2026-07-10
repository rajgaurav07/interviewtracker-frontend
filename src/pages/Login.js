import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { setUser, setToken } from "../utils/Auth";

function Login() {

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
        "http://localhost:8081/users/login",
        user
      );

      if (!response.data || !response.data.token) {

        alert("Invalid Email or Password");
        return;

      }

      alert("Login Successful");

      // Save user and token
      setUser(response.data);
      setToken(response.data.token);

      // Save name & email for dashboard
      localStorage.setItem("userName", response.data.name);
      localStorage.setItem("userEmail", response.data.email);

      window.location.href = "/dashboard";

    } catch (error) {

      console.log(error);
      alert("Login Failed");

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