import React, { useEffect, useState } from 'react'
// import wallet from './assets/wallet.png'
import Addtrans from './Addtrans'
import {Link, useLocation} from 'react-router-dom'


const Navbar = ({name, id}) => {

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
                transform: "translateX(0)"
            })
        }
        else
        {
            setStyle("close")
            setSideStyle({
                opacity: 0,
                transform: "translateX(-100vw)"
            })
        }
    }

    const [searchVal, setSearchVal] = useState("close")
    const [boxStyle, setBoxStyle] = useState({})
    const [searchStyle, setSearchStyle] = useState({})
    const toggleSearch = () => {
        setBoxStyle({
            border: "1px solid rgb(210, 210, 210)"
        })
        setSearchStyle({
            width: "15rem"
        })
    }

  return (
    <>
        <Addtrans name={name} id={id} />
        <div className="navbar">
            <div className="left">
                <div className='nav_icon side_toggle' onClick={toggleSide}>
                    <i className="fa-solid fa-bars"></i>
                </div>
                <div className="wallet_logo">
                    <img src="./assets/wallet.png" alt="wallet" />
                </div>
                <div className="user">
                    <p className="navTitle">MoneyMate</p>
                    <p>Hey, <span className="username">{name}</span></p>
                </div>
            </div>
            <div className="right">
                <a href="/home" className='nav_icon'>
                    <i className="fa-solid fa-calendar"></i>
                </a>
                {/* <div className='nav_icon'>
                    <i className="fa-solid fa-eye"></i>
                </div> */}
                {/* <div className="searchBox" style={boxStyle}>
                    <input type="text" className="searchInput" style={searchStyle} onChange={(e) => setSearchVal(e.target.value)} />
                    <div className='nav_icon' onClick={toggleSearch}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div> */}
                <div className="nav_btn nav_btn_pc">
                    <button className='btn add_btn' data-bs-toggle="modal" data-bs-target="#add_trans">Add Transaction</button>
                </div>
                <div className="nav_btn nav_btn_mobile">
                    <button className='btn add_btn' data-bs-toggle="modal" data-bs-target="#add_trans"><i className="fa-solid fa-plus"></i></button>
                </div>
            </div>
        </div>
        <div className="sideBar_toggle_nav" style={sideStyle}>
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

export default Navbar