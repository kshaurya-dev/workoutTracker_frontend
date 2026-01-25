import styles from "../designs/Confirm.module.css"

const Confirm = ({ type, message, handleConfirm, setState }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.box}>
        <p className={styles.text}>{message}?</p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.confirmBtn}
            onClick={() => handleConfirm()}
          >
            {type}
          </button>

          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => setState(null)}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default Confirm
