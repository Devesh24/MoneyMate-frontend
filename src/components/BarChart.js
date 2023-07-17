import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'


const BarChart = ({incomeData}) => {
    const options = {
        scales: {
            x: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Day',
                    font:{
                        size: 14
                    }
                  }
            },
            y: {
                stacked: true,
                title: {
                  display: true,
                  text: 'Total  Income  and  Expenses',
                  font:{
                    size: 14
                  }
                }
            }
        }
    }

  return (
    <>
        <div className="bar_cont">
            <Bar data={incomeData} options={options} />
        </div>
    </>
  )
}

export default BarChart