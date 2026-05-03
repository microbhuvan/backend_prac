import { Outlet } from "react-router";

function Pages(){
    return(
        <>
            <h1>Pages</h1>
            <Outlet />
        </>
    )
}

export default Pages;