import supabase from "../supabase-client";
import { useEffect,useState } from "react";
import Dropdown from "./dropdown";

function CompiledGallery(){
    const [wordList,setWordList] = useState([]);
    const [refreshToggle,setRefreshToggle]=useState(false);
    const [imageList,setImageList]=useState([]);

    useEffect(() => {
        const fetchList = async () => {
        const { data, error } = await supabase
            .from("tblCompiledNotes")
            .select("imageID,hadithNumber, hadithPart,imageUrl")
            .order("hadithNumber,hadithPart");
            if (error) {
                console.error(error);
                return;
            }
            setImageList(data);
            };
        fetchList();
        // console.log(imageList);
    }, []);

    useEffect(() => {
        if (!imageList.length) return;

        const hash = window.location.hash.replace("#", "");
        if (hash) {
        document.getElementById(hash)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
        }
    }, [imageList]);

    // console.log(imageList);

    // function DropdownMenu() {
    //     return (
    //         <div className="dropdown">
    //             <button className="dropdown-btn">Navigate</button>

    //             <div className="dropdown-content">
    //                 <a href="/home">Home</a>
    //                 <a href="/about">About</a>
    //                 <a href="#section-2">Section 2</a>
    //                 <a href="https://example.com" target="_blank">
    //                 External
    //                 </a>
    //             </div>
    //         </div>
    //     );
    // }



    // async function fetchList(){
    //     try {
    //         const {data,error}= await supabase
    //             .from('tblCompiledNotes')
    //             .select(`root_base,root_meaning`,                    
    //         )
    //         if (error){
    //             throw error;
    //         }
            
    //         console.log(data);
    //         console.log(error);
    //         setWordList(data);
    //     } 
    //     catch(error){
    //         console.error('Error fetching table', error);

    //     }
    // }

    

    return(
        <div>
            <Dropdown imageList={imageList}/>
            <div className="container">
                <div className="list">
                    {/* <h1>Image List</h1> */}
                    {imageList.map((img,i) => (
                        <div
                        className="noteItem"
                        id={img.hadithNumber}
                        key={img.imageID}>
                            <img
                                src={img.imageUrl}
                                alt={img.imageID}
                                width="96vw"
                            />
                        </div>
                    ))}

                </div>
            </div>
            
        </div>
    )
}



export default CompiledGallery