import { useState } from "react";
import styles from './ExerciseSelect.module.css'
import { EXERCISES } from "../../data/exercises";

const ExerciseSelect=({onSelect})=>{
    const [query , setQuery]=useState('')
    const [open , setOpen]=useState(false)

    const filtered = EXERCISES.filter(ex=>
        ex.name.toLowerCase().includes(query.toLowerCase())
    )
    const handleSelect =(ex)=>{
      const exercise = EXERCISES.filter(e=>
        e.name.toLowerCase().includes(ex.name.toLowerCase())
      )
      onSelect(exercise[0])
      
    }
    return (
    <div className={styles.dropdownWrapper}>
      <input
        className={styles.mediumInput}
        placeholder="Search exercise..."
        value={query}
        onFocus={() => setOpen(true)}
        onChange={e => {
          setQuery(e.target.value)
          setOpen(true)
        }}
      />

      {open && (
        <div className={styles.dropdown}>
          {filtered.length === 0 && (
            <div className={styles.dropdownItemMuted}>
              No exercises found
            </div>
          )}

          {filtered.map(ex => (
            <div
              key={ex.exercise_id}
              className={styles.dropdownItem}
              onClick={() => {
                handleSelect(ex)
                setQuery(ex.name)
                setOpen(false)
              }}
            >
              <div>{ex.name}</div>
              <div className={styles.muscleHint}>
                {ex.primaryMuscle}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ExerciseSelect