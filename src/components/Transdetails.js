import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Alert from './Alert';
import EditTrans from './EditTrans';
import BASE_URL from '../baseUrl';
// import icon from './assets/icons/icon_124.png'

const Transdetails = ({clicked, handleClick, transData, userId, name}) => {

    const [display, setDisplay] = useState("none")

    useEffect(() => {
        if(clicked) setDisplay("block")
        else setDisplay("none")
    },[clicked])

    const monthName = new Date(Date.UTC(2023, transData.month-1)).toLocaleString('en-US', { month: 'long' });
    const dayOfWeek = new Date(transData.year, transData.month-1, transData.day).toLocaleString('en-US', { weekday: 'long' });

    const handleDelete = async (e) => {
        try{
            const data = await axios.delete(`${BASE_URL}/api/${transData.type}/${userId}/${transData._id}`)
            window.location.href = "./home"
            console.log(data);
        }
        catch(err)
        {
            console.log(err);
        }
    }


    const deleteAlert = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
              return <Alert onClose={onClose} handleDelete={handleDelete} func="Delete" />
            }
        });
    }
console.log(transData);
  return (
    <>
        <EditTrans name={name} transData={transData} />
        <div className={`trans_details d-${display}`}>
            <div className="trans_details_head">
                <div className="trans_details_left">
                    <button className='btn cross' onClick={() => handleClick(false, {})}>X</button>
                    <p>TRANSACTION DETAILS</p>
                </div>
                <div className="trans_details_right">
                    <button className='btn delete_btn' onClick={deleteAlert}>DELETE</button>
                    <button className='btn edit_btn' data-bs-toggle="modal" data-bs-target="#edit_trans">EDIT</button>
                </div>
            </div>
            <div className="trans_details_body">
                <div className="trans_details_body_left">
                    <div className='title_grp'>
                        <div className="trans_details_icon">
                            <img src={transData.icon} alt="" />
                        </div>
                        <span className="details_title">{transData.category}</span>
                    </div>
                    <span className="details_date">{`${dayOfWeek}, ${transData.day} ${monthName} ${transData.year}`}</span>
                    <span className="details_note">{transData.note ? transData.note : ""}</span>
                </div>
                {
                    transData.type === 'income' ?
                    <div className="trans_details_right" style={{color: "blue"}}>
                        <span>+₹ {transData.amount}</span>
                    </div> :
                    <div className="trans_details_right" style={{color: "red"}}>
                        <span>-₹ {transData.amount}</span>
                    </div>
                }
            </div>
        </div>
    </>
  )
}

export default Transdetails