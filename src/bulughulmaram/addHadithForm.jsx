import { useState } from "react";
import supabase from "../supabase-client";

function AddHadithForm({setRefreshToggle}) {
    const [insertingImage,setInsertingImage]=useState(false);
    const [hadithImages,setHadithImages] = useState(null);
    const [insertingRow,setInsertingRow]=useState(false);
    const [insertingHadiths,setInsertingHadiths]=useState(false);


    const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length>0) {
        setHadithImages(e.target.files);
        // setHadithImage(e.target.files[0]);
        }
    }
    const uploadImage = async(file) => {
        const filePath = `${file.name}`;
        const bucketName = "summarisedNotes";
        setInsertingImage(true);
        const {error} = await supabase.storage.from(bucketName).upload(filePath,file);
        if (error) {
            console.error("Error uploading image:", error.message);
            return null;
        }
        // else {
        //     alert('Image uploaded successfully');
        // }
        setInsertingImage(false);
        const {data} = supabase.storage.from(bucketName).getPublicUrl(filePath);
        let imageUrl = data.publicUrl;
        return {imageUrl:imageUrl, filePath:filePath};
    }
    const addRow = async(imageDetails) => {
        setInsertingRow(true);
        const {imageUrl,filePath} = imageDetails
        const imageID = filePath.replace(/\.[^/.]+$/, "");
        const hadithNumber = imageID.split("_")[0];
        const hadithPart = imageID.split("_")[1];
        const {data,error} = await supabase.from("tblSummarisedNotes").insert(
            {
                imageID:imageID,
                hadithNumber:hadithNumber,
                hadithPart:hadithPart,
                imageUrl:imageUrl
            }
        )
        if (error) {
            console.error("Error inserting data");
            return null;
        } 
        // else {
        //     alert("Row added successfully");
        // }
        setInsertingRow(false);
        return null;
    }



    const handleSubmit = async(e) => {
        e.preventDefault();
        if (hadithImages){      
            
            const files = Array.from(hadithImages);
            setInsertingHadiths(true);
            const uploads = files.map(async (file) => {
                let hadithImage = file;
                let imageDetails = await uploadImage(hadithImage);
                let result = await addRow(imageDetails);
            })

            const results = await Promise.all(uploads);

            setInsertingHadiths(false);
            setHadithImages(null);
            alert("All images uploaded successfully!");

        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Choose Hadith Image</label>
                    <div>
                        <input type="file" multiple accept="image/*" onChange={(e)=>handleFileChange(e)} />
                    </div>
                </div>
                <button type="submit" disabled={insertingHadiths}>
                    {insertingHadiths ? "Adding..." : "Add"}
                </button>
            </form>
        </div>
    )
}

export default AddHadithForm;