import React, { useState } from "react";
import "../styles/login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import BASE_URL from "../baseUrl";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
        const data = await axios.post(`${BASE_URL}/api/auth/login`, {
            email: email,
            password: password
        })
        if(data.status === 200)
        {
            alert("Login successfull")
            window.localStorage.setItem("token", data.data.accessToken)
            window.location.href = "./home"
        }
    }
    catch(err)
    {
      alert(err.message)
    }
  }
    
  return (
    <>
      <div className="login_cont">
        <div className="clr_cont">
          <div className="login_upper"></div>
          <div className="login_lower"></div>
        </div>
        <div className="logo">
          <img src="./assets/logos/logo-white-transparent-background.png" alt="Moneymate" />
        </div>
        <div className="login_cont_inner">
          <h2>Login</h2>
          <h5>Nice to see you again :)</h5>
          <form className="input_cont row g-3" onSubmit={handleSubmit}>
            <div className="col-md-12">
              <label className="form-label" htmlFor="email">
                E-mail:{" "}
              </label>
              <input
                className="form-control"
                type="email"
                name="email"
                id="email"
                onChange={(e) => {setEmail(e.target.value)}}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label" htmlFor="password">
                Password:{" "}
              </label>
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                onChange={(e) => {setPassword(e.target.value)}}
              />
            </div>
            <div className="col-12 d-flex justify-content-between mt-5">
                <div>
                    <p>New Here?</p>
                    <Link to="/register" className="signup_link">Register instead</Link>
                </div>
              <button type="submit" className="btn submit_btn">
                SIGN IN
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
