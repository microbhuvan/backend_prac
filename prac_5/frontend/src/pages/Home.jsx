import { Link } from "react-router-dom"

function Home(){
    return (
        <>
            <nav>
                <Link to="/login"> Login</Link>
                <Link to="/signup"> SignUp</Link>
                <Link to="/logout">Logout</Link>
            </nav>
            <h1>this is home page</h1>
        </>
    )
}

export default Home;