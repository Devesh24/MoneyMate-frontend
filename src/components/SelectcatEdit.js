import Category from './Category'
import useCatFetch from '../useCatFetch'

const SelectcatEdit = ({handleCatClick}) => {
  
    const {data} = useCatFetch()
    
    return (
      <>
        <div
          className="modal fade"
          id="editModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Select Category
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-target="#edit_trans"
                  data-bs-toggle="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                  {
                    data.map((i) => {
                      return <div data-bs-target="#edit_trans" data-bs-toggle="modal" onClick={()=>handleCatClick(i.title, i.type)}>
                              <Category page="cat" data={i} /> 
                            </div>
                    })
                  }
              </div>
              <div className="modal_btn_cont pb-3">
                  <button className="btn cancel_btn" data-bs-target="#edit_trans" data-bs-toggle="modal">CANCEL</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default SelectcatEdit