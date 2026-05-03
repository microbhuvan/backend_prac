import { useParams } from "react-router";

function Dynamic(){

    const { id } = useParams();

    return(
        <h1>we are in dynamic / {id}</h1>
    )
}

export default Dynamic;
