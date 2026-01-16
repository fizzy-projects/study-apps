import { useState } from "react";
import supabase from "../supabase-client";

function AddHadithRow({setRefreshToggle}) {
    const [imageID, setImageID]=useState("");
    const [insertingRow, setInsertingRow] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setInsertingRow(true);
        
        const { data, error } = await supabase
                                .from("tblCompiledNotes")
                                .insert(
                                    {
                                    imageID: imageID
                                    }
                                );
        setInsertingRow(false);
        if (error) {
        console.error(error);
        alert("Error inserting data");
        } else {
        alert("Row added successfully!");
        setImageID("");
        setRefreshToggle((prev) => !prev);
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>imageID</label>
                    <input
                    type="text" 
                    value={imageID}
                    placeholder="type imageID here"
                    onChange={(e) => setImageID(e.target.value)}
                    required/>
                </div>
                <button type="submit" disabled={insertingRow}>
                    {insertingRow ? "Adding..." : "Add"}
                </button>

            </form>
        </div>
    );
}

export default AddHadithRow;