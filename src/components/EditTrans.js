import axios from 'axios';
import { useEffect, useState } from 'react'
import SelectCat from './SelectCat';
import SelectcatEdit from './SelectcatEdit';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Alert from './Alert';

const EditTrans = ({name, transData}) => {
    const dateString = new Date(transData.year, transData.month-1, transData.day).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const [category, setCategory] = useState("");
    const [catType, setCatType] = useState("")
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");
    console.log(dateString);
    useEffect(() => {
        setCategory(transData.category)
        setCatType(transData.type)
        setAmount(transData.amount)
        setDate(dateString)
        setNote(transData.note)
    },[transData])

    const handleEdit = async () => {
        const [year, month, day] = date.split('-');

        try{
          const data = await axios.put(`http://localhost:5000/api/${transData.type}/${transData._id}`, {
            amount: amount,
            day: day,
            month: month, 
            year: year,
            category: category,
            note: note
          })
          window.location.href = "./home"
        }
        catch(err)
        {
            alert("No Change in Data detected. Edit Failed!")
            window.location.href = "./home"
            console.log(err);
        }
    }

    const handleCatClick = (val, type) => {
        setCategory(val);
        setCatType(type)
    };

    const handleSubmit = async () => {
        confirmAlert({
            customUI: ({ onClose }) => {
              return <Alert onClose={onClose} handleEdit={handleEdit} func="Edit" />
            }
        });
      };

  return (
    <>
        <SelectcatEdit handleCatClick={handleCatClick} />
        <div
        className="modal fade"
        id="edit_trans"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <form className="modal-dialog modal-lg" onSubmit={(e) => e.preventDefault()}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 px-3" id="staticBackdropLabel">
                Edit Transaction
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
                    data-bs-target="#editModal"
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
                    placeholder={transData.amount}
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
                    placeholder={transData.note}
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
                onClick={handleSubmit}
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
  )
}

export default EditTrans