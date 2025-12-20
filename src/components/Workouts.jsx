
import { useState } from "react"
import styles from "./Workouts.module.css"
import {workouts} from "./helper/sampleworkouts"


export default function Workouts() {
  const [openIds, setOpenIds] = useState(new Set())

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>My Workouts</h1>

      <div className={styles.list}>
        {workouts.map(w => {
          const open = openIds.has(w.id)
          return (
            <div key={w.id} className={styles.card}>
              <button
                className={styles.cardHeader}
                onClick={() => {
                  const next = new Set(openIds)
                  open ? next.delete(w.id) : next.add(w.id)
                  setOpenIds(next)
                }}
              >
                <div>
                  <div className={styles.cardTitle}>{w.name}</div>
                  <div className={styles.meta}>{w.date} · {w.duration} min</div>
                </div>
      
              </button>

              <div className={`${styles.expand} ${open ? styles.open : ""}`}>
                <div className={styles.expandInner}>
                  {w.exercises.map(ex => (
                    <div key={ex.name} className={styles.exercise}>
                      <div className={styles.exerciseName}>{ex.name}</div>
                      <div className={styles.setRow}>
                        {ex.sets.map((s, i) => (
                          <span key={i} className={styles.set}>{s}</span>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className={styles.notes}>{w.notes}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

