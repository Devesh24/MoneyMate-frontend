import React from "react";
import axios from "axios";
import BASE_URL from "../baseUrl";
import { confirmAlert } from "react-confirm-alert";
import Alert from "./Alert";
import EditTrans from "./EditTrans";

const TransactionMobile = ({ transData, name, id }) => {
  const u = "S" + transData._id.toString();
  const monthName = new Date(
    Date.UTC(2023, transData.month - 1)
  ).toLocaleString("en-US", { month: "long" });
  const dayOfWeek = new Date(
    transData.year,
    transData.month - 1,
    transData.day
  ).toLocaleString("en-US", { weekday: "long" });

  const handleDelete = async (e) => {
    try {
      await axios.delete(
        `${BASE_URL}/api/${transData.type}/${id}/${transData._id}`
      );
      window.location.href = "./home";
    } catch (err) {
      alert(err.message)
    }
  };

  const deleteAlert = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Alert onClose={onClose} handleDelete={handleDelete} func="Delete" />
        );
      },
    });
  };

  return (
    <>
    <EditTrans name={name} transData={transData} />
      <div
        className="transactionaccordian accordion accordion-flush"
        id="accordionFlushExample"
      >
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingOne">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#${u}`}
              aria-expanded="false"
              aria-controls={u}
            >
              <div className="trans_card">
                <div className="trans_left">
                  <div className="trans_day fs-2">{transData.day}</div>
                  <div className="trans_info">
                    <div className="trans_date">
                      {`${dayOfWeek}, ${monthName} ${transData.year}`}
                    </div>
                    <div className="trans_note">
                      {transData.note ? transData.note : ""}
                    </div>
                  </div>
                </div>
                {transData.type === "income" ? (
                  <div className="trans_right" style={{ color: "blue" }}>
                    +₹ {transData.amount}
                  </div>
                ) : (
                  <div className="trans_right" style={{ color: "red" }}>
                    -₹ {transData.amount}
                  </div>
                )}
              </div>
            </button>
          </h2>
          <div
            id={u}
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <div className="trans_mob_details_right">
                <button className="btn delete_btn" onClick={deleteAlert}>
                  DELETE
                </button>
                <button
                  className="btn edit_btn"
                  data-bs-toggle="modal"
                  data-bs-target="#edit_trans"
                >
                  EDIT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionMobile;
