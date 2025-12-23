import {Link} from 'react-router-dom'
import styles from '../designs/LogIn.module.css'
const Landing=()=>{
    return(
        <>
        <div className={styles.page}>
            <p >hello ! Welcome to shaurya's workout tracker , this is my first ever project</p>
        </div>
        <div>
            <Link to="/SignUp">SignUp</Link>
            <Link to="/LogIn">LogIn</Link>            
        </div>
        </>
    )
}
export default Landing

