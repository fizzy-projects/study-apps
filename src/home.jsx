import { useNavigate } from "react-router-dom";


function Home(){
    const navigate = useNavigate();

    return(
        <div>
            <h1>Hello</h1>
            <h3>Notes available:</h3>
            {/* <button onClick={() => navigate("/bulughul-maram/bulughulmaram")}>
                Bulughul Maram
            </button> */}
            <button onClick={() => navigate("/bulughul-maram")}>
                Bulughul Maram
            </button>
        </div>
    )
}

export default Home