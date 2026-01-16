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
                            />
                        </div>
                    ))}

                </div>
            </div>
            
        </div>
    )
}



export default CompiledGallery