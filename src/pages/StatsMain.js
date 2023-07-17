import Stats from '../components/Stats'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import useFetchUser from '../useFetchUser'
import Loader from '../components/Loader'

const StatsMain = () => {

  const {name, id, loading} = useFetchUser()

  return (
    <>
        <div className="main_cont">
            <Sidebar />
            <div className="body">
                <Navbar name={name} id={id} />
                <div className="body_cont">
                  {
                    loading ? <Loader /> :
                    <Stats userId={id} />
                  }
                </div>
            </div>
        </div>
    </>
  )
}

export default StatsMain