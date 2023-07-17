import Categories from '../components/Categories'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import useCatFetch from '../useCatFetch'
import Loader from '../components/Loader'
import useFetchUser from '../useFetchUser'

const CatMain = () => {
  
  const {data, loading} = useCatFetch()
  const {name, id} = useFetchUser()

  return (
    <>
        <div className="main_cont">
            <Sidebar />
            <div className="body">
                <Navbar name={name} id={id} />
                <div className="body_cont">
                  {
                    loading ? <Loader /> :
                    <Categories catData={data} />
                  }
                </div>
            </div>
        </div>
    </>
  )
}

export default CatMain