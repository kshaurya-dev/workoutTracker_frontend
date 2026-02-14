const getTotalVolume = (workouts , month , year )=>{
    const filteredWorkouts = workouts.filter(w=>{
        const  date = new Date(w.date);
        return (
            date.getMonth()===month &&
            date.getFullYear()===year
        )
    })
    const totalVolume = filteredWorkouts.reduce((totalWorkout , w)=>{
        const workoutVolume = w.exercises.reduce((totalExercise , e)=>{
            const exerciseVolume = e.sets.reduce((totalSet , s)=>{
                return  totalSet + s.weight * s.reps
            } , 0)
            return totalExercise + exerciseVolume
        },0)
        return  totalWorkout + workoutVolume
    },0)
    return totalVolume
}
const getExerciseHistory=(workouts , ex_id)=>{
    const filteredWorkouts = workouts.filter(w=>{
        return w.exercises.some(ex=>ex.exercise_id ===ex_id)
    })
    const exercises = filteredWorkouts.map(workout => {
    const exercise = workout.exercises.find(
        ex => ex.exercise_id === ex_id
    );
    return {
        date: workout.date,
        exercise: exercise
    };
});
   const stats =exercises.map(item=>{
    const weights= item.exercise.sets.map(set=>set.weight)
    const volumes = item.exercise.sets.map(set=>set.weight*set.reps)
    const oneRMs = item.exercise.sets.map(set=>set.weight * (1+ set.reps /30))
    return {
        date:item.date,
        maxSet: Math.max(...weights),
        estimated1Rm : Math.max(...oneRMs),
        volume:volumes.reduce((sum , vol)=>sum+vol , 0)
    }
   })
   stats.sort((a, b) => new Date(a.date) - new Date(b.date))
   return stats
}

export default {getExerciseHistory , getTotalVolume}