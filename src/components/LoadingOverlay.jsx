import styles from "../designs/LoadingOverlay.module.css"

const LoadingOverlay = ({ show, text = "Loading..." }) => {
  if (!show) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.box}>
        <div className={styles.spinner}></div>
        <div className={styles.text}>{text}</div>
      </div>
    </div>
  )
}

export default LoadingOverlay