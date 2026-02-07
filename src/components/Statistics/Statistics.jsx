import { Line  , Bar} from "react-chartjs-2"
import Confirm from "../Confirm"
import { useState } from "react"
import exerciseService from '../../services/statistics/history'
import ExerciseSelect from "../ExerciseSelect/ExerciseSelect"
import { useSelector } from "react-redux"
import Calendar from "../calendar/Calendar.jsx"
import './Statistics.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)
const Statistics=()=>{
  const [exercise , setExercise] = useState('')
  const workouts = useSelector(state=> state.workouts)
 // const exercise = 'hammer_curl'
  const history = exerciseService.getExerciseHistory(workouts , exercise.exercise_id)
  

   const options = {
  responsive: true,
  plugins: {
    tooltip: {
      enabled: true
    }
  }
}


    const chartData = {
        labels: history.map(h => h.date.slice(0, 10)),
        datasets: [
      {
      label: "Top Set (kg)",
      data: history.map(h => h.maxSet),

     borderColor: "#3b82f6",
     backgroundColor: "rgba(59,130,246,0.12)",
     pointBackgroundColor: "#3b82f6",
      pointBorderColor: "#fff",
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2,
      tension: 0.35,
      fill: true
    }
  ]
}
const oneRMdata = {
        labels: history.map(h => h.date.slice(0, 10)),
        datasets: [
      {
      label: "1 RM (kg)",
      data: history.map(h => h. estimated1Rm),

      borderColor: "rgb(27, 172, 117)",
      backgroundColor: "rgba(96,165,250,0.12)",
      pointBackgroundColor: "#3b82f6",
      pointBorderColor: "#fff",
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2,
      tension: 0.35,
      fill: true
    }
  ]
}
const volumeData = {
  labels: history.map(h => h.date.slice(0, 10)),
  datasets: [
    {
      label: "Total Volume",
      data: history.map(h => h.volume),

      backgroundColor: " rgb(123, 42, 129)",
borderColor: "rgb(50, 10, 53)",
      borderWidth: 1,
      borderRadius: 5,        // smooth bars
      maxBarThickness: 40
    }
  ]
}
if(!history.length)return (
  <div className="statsPage">
    <Calendar/>
   <ExerciseSelect onSelect={setExercise}/>
   <div className="statsTitle">No data  found</div>
  </div>
  )
else 
  return (
    <div className="statsPage">
      <Calendar/>
      <ExerciseSelect onSelect={setExercise}/>

      <div className="statsHeader">
        <h2 className="statsTitle">
          {exercise?.name} Analytics
        </h2>
      </div>

      <div className="chartsRow">

        <div className="chartCard">
          <div className="chartTitle">Top Set</div>
          <Line data={chartData} options={options} />
        </div>

        <div className="chartCard">
          <div className="chartTitle">Estimated 1RM</div>
          <Line data={oneRMdata} options={options} />
        </div>
        
        <div className="chartCard">
          <div className="chartTitle">Total Volume</div>
          <Bar data={volumeData} options={options} />
        </div>
      </div>
    </div>
  )


}
export default Statistics
