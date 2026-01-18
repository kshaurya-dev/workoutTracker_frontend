const EditForm=({workout , setWorkoutToEdit})=>{
    return(
        <>
        <p>{workout.name}</p>
        <button onClick={()=>setWorkoutToEdit()}>ok</button>
        </>
        
    )
}
export default EditForm