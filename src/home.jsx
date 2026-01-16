import { useNavigate } from "react-router-dom";


function Home(){
    const navigate = useNavigate();

    return(
        <div>
            <h2>Hello</h2>
            <h6>Compendium of notes available:</h6>
            <button onClick={() => navigate("/bulughul-maram/bulughulmaram")}>
                Bulughul Maram
            </button>
        </div>
    )
}

export default Home