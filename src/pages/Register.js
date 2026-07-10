import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      await axios.post(
        "https://interviewtracker-backend-2o4l.onrender.com//users/register",
        user
      );

      alert("Registration Successful! Please login.");

      setUser({
        name: "",
        email: "",
        password: ""
      });

      // Redirect to Login Page
      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Registration Failed");

    }
  };

  return (

    <div className="container mt-5">

      <div className="card shadow p-4 col-md-5 mx-auto">

        <h2 className="text-center mb-4">
          Register
        </h2>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            className="form-control mb-3"
            name="name"
            placeholder="Enter Name"
            value={user.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            className="form-control mb-3"
            name="email"
            placeholder="Enter Email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            name="password"
            placeholder="Enter Password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="btn btn-success w-100"
          >
            Register
          </button>

        </form>

      </div>

    </div>

  );
}

export default Register;