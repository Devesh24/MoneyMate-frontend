import React from 'react'
import { Link } from 'react-router-dom'

const Summary = ({trans, filter, summaryString}) => {

    let totalIncome = 0
    let totalExpense = 0
    trans.map((i) => {
        if(i.type === "income")
        {
            totalIncome += i.amount;
        }
        else
        {
            totalExpense += i.amount;
        }
    })
    const total = totalIncome - totalExpense

    

  return (
    <>
        <div className="trans_summary">
            <div className="inflow">
                <div className="inflow_left">Inflow</div>
                <div className="inflow_right">+₹ {totalIncome}</div>
            </div>
            <div className="outflow">
                <div className="outflow_left">Outflow</div>
                <div className="outflow_right">-₹ {totalExpense}</div>
            </div>
            <div className="total">
                <div className="total_right">{total>=0 ? `+₹ ${total}` : `-₹ ${-total}`}</div>
            </div>
            <div className="summary_btn_cont">
                <Link to={`/stats?filter=${summaryString}`} className='btn summary_btn'>VIEW STATS FOR THIS PERIOD</Link>
            </div>
        </div>
    </>
  )
}

export default Summary