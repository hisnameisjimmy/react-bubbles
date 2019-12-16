import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({});

  const handleChange = e => {
    e.preventDefault();
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
    .post("http://localhost:5000/api/login", credentials)
    .then(res => {
      console.log(res);
      localStorage.setItem("token", res.data.payload);
      props.history.push("/bubbles");
    })
    .catch(err => {
      console.log(err);
    });
  };

  const logOut = e => {
    e.preventDefault();
    localStorage.clear();
    window.location.reload();
    props.history.push("/");
  }

  return (
    <div className="login-page">
      <h1>Welcome to the Bubble App!</h1>

      {localStorage.getItem("token") ? (
        <>
          <Link to="/bubbles">See Bubbles Yo</Link>
          <button className="button logout" onClick={logOut}>
            Logout
          </button>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={credentials.username}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={credentials.password}
              onChange={handleChange}
            />
            <button className="button login">Login</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
