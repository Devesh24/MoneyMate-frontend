import React, { useEffect, useState } from 'react'

const Category = ({page, data}) => {
    const [displayStyle, setDisplayStyle] = useState("block")

    useEffect(()=>{
        if(page === "cat") setDisplayStyle("none")
        else setDisplayStyle("block")
    },[])
    
  return (
    <>
        { 
            data &&
            <div className="cat_card">
                <div className="cat_left">
                    <div className="cat_icon">
                        <img src={data.icon} alt="" />
                    </div>
                    <div className="cat_info">
                        <p className="cat_title fw-bolder">{data.title}</p>
                        <p className={`trans_no d-${displayStyle}`}>{page==="cat" ? "" : data.transNo} Transaction</p>
                    </div>
                </div>
                <div className={`cat_right fs-4 trans_no d-${displayStyle}`}>
                    {page !== "cat" &&  data.total>=0 ? `+₹ ${data.total}` : `-₹ ${-data.total}`}
                </div>
            </div>
        }
    </>
  )
}

export default Category