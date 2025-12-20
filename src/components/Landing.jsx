import {Link} from 'react-router-dom'

const Landing=()=>{
    return(
        <>
        <div>
            <p>hello ! Welcome to shaurya's workout tracker , this is my first ever project</p>
        </div>
        <div>
            <Link style={{padding : 5}} to="/SignUp">SignUp</Link>
            <Link to="/LogIn">LogIn</Link>            
        </div>
        </>
    )
}
export default Landing

