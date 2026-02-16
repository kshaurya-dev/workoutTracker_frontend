import { useMemo , useState} from 'react'
import { useSelector } from 'react-redux'
import statisticsService from '../../services/statistics/history'
import './DashBoard.css'
import getWorkoutStreaks from '../../services/statistics/streak'
import { Doughnut } from "react-chartjs-2"
import { ArcElement } from "chart.js"
import {Chart as ChartJS} from "chart.js"
const centerTextPlugin = {
  id: "centerText",
  beforeDraw: (chart) => {
    const { width, height, ctx } = chart;

    ctx.save();

    const total = chart.data.datasets[0].data
      .reduce((a, b) => a + b, 0);

    // BIG NUMBER
    ctx.font = "bold 28px sans-serif";
    ctx.fillStyle = "#e6e6e6";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(total, width / 2, height / 2 - 8);

    // SUBTEXT
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#9aa0a6";
    ctx.fillText("Total Sets", width / 2, height / 2 + 16);

    ctx.restore();
  }
};
ChartJS.register(ArcElement)
const DashBoard =()=>{

    const workouts = useSelector(state => state.workouts)
    console.log(workouts)
    //workouts.forEach(w=>console.log(w.exercises))
    const [currentDate , setCurrentDate] =useState(new Date())
    const [chartMode , setChartMode]=useState('exercise')
    
    const year = currentDate.getFullYear()
    const month =currentDate.getMonth()

    const setPreviousMonth=()=>setCurrentDate(new Date(year , month-1 , 1))
    const setNextMonth=()=>setCurrentDate(new Date(year , month+1 , 1))
    
    const {currentStreak, bestStreak} = getWorkoutStreaks(workouts)
    const totalWorkoutsThisMonth = workouts.filter(w => {
        const d = new Date(w.date)
        return d.getFullYear() === year && d.getMonth() === month
    })

    const volumeThisMonth = statisticsService.getTotalVolume(workouts , month , year)

    const exerciseMap = useMemo(()=>{
        const map={}
        workouts.forEach(w=>{
            const workoutDate = new Date(w.date)
            if(workoutDate.getFullYear() === year && workoutDate.getMonth()===month){
                 w.exercises.forEach(e=>{
                    let count=e.sets.length;
                    if(!map[e.name])map[e.name]=count;
                    else map[e.name]+=count;
                })
            }
        })
        return map
    } , [workouts , year , month])
    const muscleMap = useMemo(()=>{
        const map={}
        workouts.forEach(w=>{
            const workoutDate = new Date(w.date)
            if(workoutDate.getFullYear() === year && workoutDate.getMonth()===month){
                 w.exercises.forEach(e=>{
                    let count=e.sets.length;
                    if(!map[e.primaryMuscle])map[e.primaryMuscle]=count;
                    else map[e.primaryMuscle]+=count;
                })
            }
        })
        return map
    } , [workouts , year , month ])
    const workoutMap = useMemo(()=>{
        const map={}

        workouts.forEach(w =>{
            const dateStr = new Date(w.date).toDateString()
            map[dateStr] = w.name
        })
        return map
    } , [workouts])
    console.log(muscleMap)
    const daysInMonth = new Date(year , month+1, 0).getDate()
    const firstDayIndex = new Date(year , month , 1).getDay()

    const calendarDays = []

    for(let i=0 ; i<firstDayIndex ; i++)calendarDays.push(null)

    for(let day=1 ; day<=daysInMonth ; day++){
        calendarDays.push( new Date(year , month , day))
    }
    const pieData = {
        labels: chartMode==='exercise' ? Object.entries(exerciseMap) :  Object.entries(muscleMap) ,
        datasets: [
            {
                data: chartMode==='exercise' ? Object.values(exerciseMap) :  Object.values(muscleMap) ,
                backgroundColor: ["#065f46","#047857","#059669","#0f766e","#155e75","#1e40af","#4c1d95","#7f1d1d"],
                borderColor: "#1f1f21",
                borderWidth: 2
            }
        ]
    }
    const pieOptions = {
  cutout: "80%", 
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: "#2a2a2c",
      callbacks: {
        label: (context) =>
          `${context.label}: ${context.raw} sets`
      }
    }
  }
}
    return (
  <div className="dashboardLayout">

    <div className="universalStats">
      <div className="statCard">
             <div className="statLabel">Total Workouts   </div>
             <div className="statValue">{totalWorkoutsThisMonth.length}</div>
        </div>

    <div className="statCard">
      <div className="statLabel">Total Volume</div>
      <div className="statValue">{volumeThisMonth}</div>
      
    </div>

    <div className="statCard">
       <div className="statLabel">Current Streak</div>
      <div className="statValue">{currentStreak}</div>
     
    </div>

    <div className="statCard">
      <div className="statLabel">Best Streak</div>
      <div className="statValue">{bestStreak}</div>
    </div>

    </div>
    <div className="calendarCard">
      <div className="calendarHeader">
                <button className='navigationBtn'
                onClick={setPreviousMonth}>{'<'}</button>

                {currentDate.toLocaleString("default", { month: "short" })} {year}

                <button className='navigationBtn'
                 onClick={setNextMonth}>{'>'}</button>
        </div>

            

            <hr style={{color:'cyan' , marginBottom:'15px'}}/>

            <div className="calendarGrid">
                {['S' ,'M' , 'T' ,'W','T','F','S'].map(d=>(
                    <div key={d.index} className="weekday">{d}</div>
                ))}
                {
                    calendarDays.map((date , index)=>{
                        if(!date) return <div key={index}/>

                        const dateStr = date.toDateString()
                        const workoutName = workoutMap[dateStr]
                        const isWorkout = !!workoutName

                        return(
                            <div
                            key={index}
                            className={`dayCell ${isWorkout ? "worked" : ""}`}>
                                {date.getDate()}
                            {isWorkout && (
                                <div className='tooltip'> {workoutName} </div> 
                            )}
                            </div>
                        )
                    })
                }
            </div>
    </div>
    <div className="doughnutCard">

  <div className="doughnutHeader">
    <div className="chartToggle">
      <button
        className={`toggleBtn ${chartMode === "exercise" ? "active" : ""}`}
        onClick={() => setChartMode("exercise")}
      >
        Exercise
      </button>

      <button
        className={`toggleBtn ${chartMode === "muscle" ? "active" : ""}`}
        onClick={() => setChartMode("muscle")}
      >
        Muscle
      </button>
    </div>
  </div>

  <div className="doughnutWrapper">
    <Doughnut
      data={pieData}
      options={pieOptions}
      plugins={[centerTextPlugin]}
    />
  </div>

</div>
  </div>
)
}
export default DashBoard