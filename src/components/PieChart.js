import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

const PieChart = ({data, name}) => {
    const options = {
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: `Total ${name}`,
                font: {
                    size: 20
                }
            }
        }
    }
  return (
    <>
        <div className="pie_cont">
            <Doughnut data={data} options={options} />
        </div>
    </>
  )
}

export default PieChart