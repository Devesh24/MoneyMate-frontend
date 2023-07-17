import React from 'react'
import { Link } from "react-router-dom"
import '../styles/start.css'

const Start = () => {
  return (
    <>
        <div className="start">
            <div className="mainHeadCont">
                <h1 className="mainHead">Money<span>Mate</span></h1>
                <h5 className='mainTagline mt-4'><span>Track |</span>| Analyze |<span>| Save</span></h5>
            </div>
        </div>
        <div className="next">
            <div className="next_left">
                <p> At MoneyMate, we go beyond just tracking expenses. Our robust platform offers advanced categorization tools, allowing you to effortlessly classify and analyze your spending across various categories. With our seamless integration across devices, you can access your expense data anytime, anywhere. Rest assured, your security is our top priority.</p> 
                We employ state-of-the-art encryption technology to safeguard your sensitive information. Experience the convenience and peace of mind that comes with our user-friendly interface and personalized alerts. It's time to reclaim control over your finances and embark on a journey towards financial success with MoneyMate.
            </div>
            <div className="next_right">
                <h2>JOIN US</h2>
                <p>Experience our user-friendly interface..</p>
                <div className="front_btngrp">
                    <Link to="/login"><button className="btn front_btn start_login">LOGIN</button></Link>
                    <Link to="/register"><button className="btn front_btn start_reg">REGISTER</button></Link>
                </div>
            </div>
        </div>
        <div className="front_footer">
            <p>Designed By: Devesh Raghuvanshi</p>
            <p>Connect me on <a href="https://www.linkedin.com/in/devesh-raghuvanshi-624040239">LinkedIn</a></p>
        </div>
    </>
  )
}

export default Start