import { useMemo , useState} from 'react'
import { useSelector } from 'react-redux'

import './Calendar.css'

const Calendar =()=>{

    const workouts = useSelector(state => state.workouts)
    const [currentDate , setCurrentDate] =useState(new Date())

    const year = currentDate.getFullYear()
    const month =currentDate.getMonth()

    const setPreviousMonth=()=>setCurrentDate(new Date(year , month-1 , 1))
    const setNextMonth=()=>setCurrentDate(new Date(year , month+1 , 1))
    
    const totalWorkoutsThisMonth = workouts.filter(w => {
        const d = new Date(w.date)
        return d.getFullYear() === year && d.getMonth() === month
    })

    const volumeThisMonth = totalWorkoutsThisMonth.reduce((sum,workout)=>sum + workout.volume, 0)
    const workoutMap = useMemo(()=>{
        const map={}

        workouts.forEach(w =>{
            const dateStr = new Date(w.date).toDateString()
            map[dateStr] = w.name
        })
        return map
    } , [workouts])

    const daysInMonth = new Date(year , month+1, 0).getDate()
    const firstDayIndex = new Date(year , month , 1).getDay()

    const calendarDays = []

    for(let i=0 ; i<firstDayIndex ; i++)calendarDays.push(null)

    for(let day=1 ; day<=daysInMonth ; day++){
        calendarDays.push( new Date(year , month , day))
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
      <div className="statValue">3</div>
     
    </div>

    <div className="statCard">
      <div className="statLabel">Best Streak</div>
      <div className="statValue">9</div>
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

            <div className="line"></div>

            <hr style={{color:'black' , marginBottom:'15px'}}/>

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

  </div>
)
}
export default Calendar