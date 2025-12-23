import { useSelector } from "react-redux"
import styles from '../designs/Notification.module.css'
const Notification=()=>{

    const type=useSelector(state=>state.notification.type)
    const message = useSelector(state=>state.notification.message)

    if(!message) return null
     return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.toast} ${
          type === "error" ? styles.error : styles.success
        }`}
      >
        <div className={styles.icon} />
        <div className={styles.message}>{message}</div>
      </div>
    </div>
  )
}
export default Notification