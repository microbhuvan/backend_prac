import { NavLink } from "react-router";

function Contacts(){
    return(
        <>
        <h1>contacts</h1>
        <NavLink to="/contacts">
            {({ isActive, isPending })=>(
                <>
                    <span>{isActive ? "=>ACTIVE" : "ACTIVE"}</span>
                    <span>{isPending ? "LOADING...." : ""}</span>
                </>
            )}
        </NavLink>
        </>
    )
}

export default Contacts;