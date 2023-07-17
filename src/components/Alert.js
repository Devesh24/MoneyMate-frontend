const Alert = ({onClose, handleDelete, handleEdit, func}) => {
  return (
    <>
        <div className='delete_alert'>
            <h2>Are you sure?</h2>
            <p className='mt-2'>You want to {func} this transaction?</p>
            <div className="btn_grp_delete">
                <button onClick={func==="Delete" ? handleDelete : handleEdit} className='btn delete_btn'> Yes, {func} it! </button>
                <button onClick={onClose} className='btn edit_btn'>Cancel</button>
            </div>
        </div>
    </>
  )
}

export default Alert