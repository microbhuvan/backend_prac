import { NavLink } from "react-router";

function Navbar(){
    return(
        <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/logout">Logout</NavLink>
        </>
    )
}

export default Navbar;