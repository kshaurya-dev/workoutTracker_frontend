import { useState } from "react"
const ExerciseForm =({exercise , updateExercise ,onAddSet })=>{
    return(
        <div>
            <p>
                <label>Name  of exercise :  </label>
                <input  type="text" value={exercise.name}
                onChange={e=>updateExercise("exercise" , e.target.value)}/>
            </p>
            {
            exercise.sets.map((s,i)=>(
            <div key={i}>
                <label> weight : </label>
                <input type="text" placeholder={s.weight}
                onChange={e=>updateExercise("set" , {setIndex:i , field:"weight" , value:e.target.value})}/>

                <label> reps : </label>
                <input type="text" placeholder={s.reps}
                onChange={ e => updateExercise("set" , {setIndex:i , field:"reps" , value:e.target.value})}/>
            </div>
            ))
            }
            <button type="button" onClick={onAddSet}> add set</button>
        </div>
    )
}
const Add=()=>{
    const[workout , setWorkout] = useState({
        name:"",
        duration:"" , 
        notes:"",
        exercises:[]
    })
    const onAddSet = (i)=>{
        setWorkout( prev =>{
            const exercises = prev.exercises.map((ex , index)=>
                index===i ? {...ex , sets : [...ex.sets , {weight:"" , reps:""}]} : ex
            )
            return {...prev , exercises}
        })
    }
    const updateExercise = (exerciseIndex ,type ,payload)=>{
        setWorkout( prev => {
            const exercises = prev.exercises.map((ex , i)=>{
                if(i != exerciseIndex)return ex
                if(type === "exercise")return {...ex , name:payload}
                if(type === "set"){
                    const {setIndex , field, value}=payload
                    const sets = ex.sets.map((s,j)=>
                    j === setIndex ? {...s , [field]:value} : s)
                    return {...ex , sets}
                }
                return ex
            })
            return {...prev , exercises}
        })
    }
    const addExercise = ()=>{
        setWorkout(prev=>({
            ...prev,
            exercises: [...prev.exercises , {name:"" ,sets:[]} ]
        }))
    }
    return(
        <div>
           <form>
           <p>

            <label>Name of Workout: </label>
            <input 
            className="border-red-500 border-4"type="text" 
            value={workout.name}
            onChange={e => setWorkout(prev => ({...prev , name:e.target.value}))}/>

            <label>time taken : </label>
            <input className="border-red-500 border-4"type="text"
            value={workout.duration}
            onChange={e=> setWorkout( prev => ({...prev , duration:e.target.value}))}/>

            <label>notes : </label>
            <input className="border-red-500 border-4"type="text"
            value={workout.notes}
            onChange = {e=>setWorkout(prev=>({...prev , notes:e.target.value}))}/>

           </p>
           <div>
            {workout.exercises.map((exercise, i) => (
                <ExerciseForm
                key={i}
                exercise={exercise}
                onAddSet={() => onAddSet(i)}
                updateExercise={(type, payload) =>updateExercise(i, type, payload)
                }
                />
            ))}
           </div>
           </form>
           <button onClick={addExercise} type="button">add exercise</button>
           <button  type="button">save workout</button>
        </div>
    )
}
export default Add