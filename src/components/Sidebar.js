import React, { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'

const Sidebar = () => {

    const [page, setPage] = useState("")
    const location = useLocation();

    useEffect(()=> {
        const path = location.pathname
        if(path === '/home')
        {
            setPage("home")
        }
        else if(path === '/stats')
        {
            setPage("stats")
        }
        else if(path === '/categories')
        {
            setPage("cat")
        }
    },[])

    const [sideStyle, setSideStyle] = useState({})
    const [style, setStyle] = useState("close")
    const toggleSide = () => {
        if(style === "close")
        {
            setStyle("open")
            setSideStyle({
                opacity: 1,
                transform: "translateX(5vw)"
            })
        }
        else
        {
            setStyle("close")
            setSideStyle({
                opacity: 0,
                transform: "translateX(-20vw)"
            })
        }
    }

  return (
    <>
        <div className="sidebar">
            <div className="side_icon toggle" onClick={toggleSide}>
                <i className="fa-solid fa-bars"></i>
            </div>
            <Link to="/home">
                <div className="side_icon" style={page==="home" ? {backgroundColor: "#d7b7ff", color: "#1b1b3a"} : {}}>
                    <i className="fa-solid fa-wallet"></i>
                </div>
            </Link>
            <Link to="/stats?filter=none">
                <div className="side_icon" style={page==="stats" ? {backgroundColor: "#d7b7ff", color: "#1b1b3a"} : {}}>
                    <i className="fa-solid fa-chart-simple"></i>
                </div>
            </Link>
            <Link to="/categories">
                <div className="side_icon" style={page==="cat" ? {backgroundColor: "#d7b7ff", color: "#1b1b3a"} : {}}>
                    <i className="fa-solid fa-boxes-stacked"></i>
                </div>
            </Link>
            <div className="side_break"></div>
        </div>
        <div className="sideBar_toggle" style={sideStyle}>
            <div className="side_icon toggle_empty" onClick={toggleSide}>
                <p onClick={toggleSide}>X</p>
            </div>
            <Link to="/home">
                <div className="side_icon" style={page==="home" ? {backgroundColor: "#d7b7ff", color: "#1b1b3a"} : {}}>
                    <p>Transactions</p>
                </div>
            </Link>
            <Link to="/stats">
                <div className="side_icon" style={page==="stats" ? {backgroundColor: "#d7b7ff", color: "#1b1b3a"} : {}}>
                    <p>Statistics</p>
                </div>
            </Link>
            <Link to="/categories">
                <div className="side_icon" style={page==="cat" ? {backgroundColor: "#d7b7ff", color: "#1b1b3a"} : {}}>
                    <p>Categories</p>
                </div>
            </Link>
            <div className="side_break"></div>
        </div>
    </>
  )
}

export default Sidebar