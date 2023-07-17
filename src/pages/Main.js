import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Transactions from "../components/Transactions";
import Transdetails from "../components/Transdetails";
import '../styles/navigation.css'
import '../styles/transaction.css'
import '../styles/category.css'
import Loader from "../components/Loader";
import useFetchUser from "../useFetchUser";

const Main = () => {

  const [clicked, setClicked] = useState(false)
  const [transData, setTransData] = useState({})

  const {name, id, loading} = useFetchUser()
  
  const handleClick = (val, transData) => {
    setClicked(val)
    setTransData(transData)
  }

  return (
    <>
        <div className="main_cont">
            <Sidebar />
            <div className="body">
                <Navbar name={name} id={id} />
                <div className="body_cont">
                  {
                    loading ? <Loader /> : 
                    <>
                      <Transactions handleClick={handleClick} userId={id} name={name} />
                      <Transdetails clicked={clicked} handleClick={handleClick} transData={transData} userId={id} name={name} />
                    </>
                  }
                </div>
            </div>
        </div>
    </>
  );
};

export default Main;
