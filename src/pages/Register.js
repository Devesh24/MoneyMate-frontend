import React, { useState } from "react";
import "../styles/register.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPass, setCheckPass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(checkPass !== password) 
    {
      return alert("Passwords do not match")
    }

    try{
        const data = await axios.post('http://localhost:5000/api/auth/register', {
            name: name,
            username: username,
            email: email,
            password: password
        })
        window.location.href = "./login"
        console.log(data);
    }
    catch(err)
    {
        console.log(err);
    }
  }

  return (
    <>
      <div className="reg_cont">
        <div className="clr_cont">
          <div className="reg_upper"></div>
          <div className="reg_lower"></div>
        </div>
        <div className="logo">
          <img src="./assets/logos/logo-white-transparent-background.png" alt="Moneymate" />
        </div>
        <div className="reg_cont_inner">
          <h2>Register</h2>
          <form
            className="reg_input_cont row g-3"
            onSubmit={handleSubmit}
          >
            <div className="col-md-6">
              <label className="form-label" htmlFor="name">
                Name:{" "}
              </label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                onChange={(e) => {setName(e.target.value)}}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="username">
                Username:{" "}
              </label>
              <input
                className="form-control"
                type="text"
                name="username"
                id="username"
                onChange={(e) => {setUsername(e.target.value)}}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="email">
                E-mail:{" "}
              </label>
              <input
                className="form-control"
                type="email"
                name="email"
                id="email"
                onChange={(e) => {setEmail(e.target.value)}}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="age">
                Age:{" "}
              </label>
              <input
                className="form-control"
                type="number"
                name="age"
                id="age"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="pass">
                Password:{" "}
              </label>
              <input
                className="form-control"
                type="password"
                name="pass"
                id="pass"
                onChange={(e) => {setPassword(e.target.value)}}
                required
              />
            </div>
            <div className="col-md-6 mb-2">
              <label className="form-label" htmlFor="conf_pass">
                Confirm Password:{" "}
              </label>
              <input
                className="form-control"
                type="password"
                name="conf_pass"
                id="conf_pass"
                onChange={(e) => {setCheckPass(e.target.value)}}
                required
              />
            </div>
            <div className="col-12 d-flex justify-content-between mt-4 align-items-center">
                <div>
                    <p>Already have an account?</p>
                    <Link to="/login" className="login_link">Login instead</Link>
                </div>
              <button type="submit" className="btn reg_submit_btn">
                REGISTER
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
