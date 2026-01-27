import ProtectedComponent from "../../admin/ProtectedComponent";
import { useNavigate } from "react-router-dom";

export default function ArabicHome(){
    const navigate=useNavigate();
    const navigateArabic= (path)=>{
        const currentPath="/arabic/";
        navigate(currentPath+path);
    }
    return(
        <div className="mainBody" 
        style={{gap:"0.5rem", marginTop:"4rem",display:"flex", flexDirection:"column"}}
        >
            <div>
                <button onClick={() => navigateArabic("quiz")}>
                    Quiz
                </button>
            </div>
            <div>
                <button onClick={() => navigateArabic("list")}>
                    Arabic Words
                </button>
            </div>
            <ProtectedComponent>
                <div>
                    <button onClick={() => navigateArabic("addword")}>
                        Add Words
                    </button>
                </div>
            </ProtectedComponent>
        </div>
    )
}