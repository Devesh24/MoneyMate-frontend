import React, { useState } from 'react'
import TransDetailsMob from './TransDetailsMob';

const Transaction = ({handleClick, transData, name, id}) => {

    const monthName = new Date(Date.UTC(2023, transData.month-1)).toLocaleString('en-US', { month: 'long' });
    const dayOfWeek = new Date(transData.year, transData.month-1, transData.day).toLocaleString('en-US', { weekday: 'long' });
    const [clicked, setClicked] = useState(false)

    const handleCardClick = () => {
        handleClick(true, transData)
        setClicked(true)
    }
    const handleCardMob = (val) => {
        setClicked(val)
    }

  return (
    <>
        <div className="trans_card" onClick={handleCardClick}>
            <div className="trans_left">
                <div className="trans_day fs-2">
                    {transData.day}
                </div>
                <div className="trans_info">
                    <div className="trans_date">
                        {`${dayOfWeek}, ${monthName} ${transData.year}`}
                    </div>
                    <div className="trans_note">
                        {transData.note ? transData.note : ""}
                    </div>
                </div>
            </div>
            {
                transData.type === 'income' ?
                    <div className="trans_right" style={{color: "blue"}}>
                        +₹ {transData.amount}
                    </div> :
                    <div className="trans_right" style={{color: "red"}}>
                        -₹ {transData.amount}
                    </div>
            }
        </div>
        {/* <TransDetailsMob clicked={clicked} handleCardMob={handleCardMob} transData={transData} name={name} userId={id}  /> */}
    </>
  )
}

export default Transaction