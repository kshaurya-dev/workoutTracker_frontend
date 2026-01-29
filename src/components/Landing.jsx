import {Link} from 'react-router-dom'
import styles from '../designs/LogIn.module.css'
const Landing=()=>{
    return(
        <>
        <div className={styles.page}>
            <p >Hello ! Welcome to shaurya's workout tracker .</p>
        </div>
        <div>
            <Link to="/SignUp">SignUp</Link>
            <Link to="/LogIn">LogIn</Link>            
        </div>
        </>
    )
}
export default Landing

