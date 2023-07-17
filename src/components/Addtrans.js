import { useState } from "react";
import SelectCat from "./SelectCat";
import axios from "axios";

const Addtrans = ({ name, id }) => {
  const [category, setCategory] = useState("");
  const [catType, setCatType] = useState("")
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const handleCatClick = (val, type) => {
    setCategory(val);
    setCatType(type)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [year, month, day] = date.split('-');

    try{
      const data = await axios.post(`http://localhost:5000/api/${catType}`, {
        userId: id,
        amount: amount,
        day: day,
        month: month, 
        year: year,
        category: category,
        note: note
      })
      console.log(data);
      window.location.href = "./home"
    }
    catch(err)
    {
        console.log(err);
    }
  };

  return (
    <>
      <SelectCat handleCatClick={handleCatClick} />
      <div
        className="modal fade"
        id="add_trans"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <form className="modal-dialog modal-lg" onSubmit={handleSubmit}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 px-3" id="staticBackdropLabel">
                Add Transaction
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal_body">
              <form className="row g-3">
                <div className="col-md-4">
                  <label htmlFor="recipient-name" className="col-form-label">
                    User:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    placeholder={name}
                    disabled
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Category:
                  </label>
                  <button
                    type="button"
                    className="form-control"
                    id="recipient-name"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    required
                  >
                    {category}
                  </button>
                </div>
                <div className="col-md-4">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Amount:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="recipient-name"
                    placeholder="0"
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="recipient-name"
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="col-md-8">
                  <label htmlFor="message-text" className="col-form-label">
                    Note:
                  </label>
                  <textarea
                    className="form-control"
                    id="message-text"
                    onChange={(e) => {
                      setNote(e.target.value);
                    }}
                    required
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal_btn_cont">
              <button className="btn cancel_btn" data-bs-dismiss="modal">
                CANCEL
              </button>
              <button
                type="submit"
                className="btn add_trans_btn"
                data-bs-dismiss="modal"
              >
                SAVE
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Addtrans;
