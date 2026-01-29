import { useState, useEffect } from "react";
import supabase from "../../admin/supabase-client";
import createSupabaseChannel from "../../utils/createSupabaseChannel";
import ProtectedComponent from "../../admin/ProtectedComponent";

export default function ArabicList(){
    const [wordlist,setWordlist] = useState([]);

    useEffect(() => {
        const fetchList = async () => {
            const { data, error } = await supabase
                                    .from("baam_words")
                                    .select("word");
            if (error) {
                console.error(error);
                return;
            }
            setWordlist(data);
        };
        fetchList();
        const subscription=createSupabaseChannel({handlers:[
            {table:"baam_words",setState:setWordlist}
        ]});
        subscription.subscribe();

        return () => {
            supabase.removeChannel(subscription); // cleanup on unmount
        };
    }, []);


    return(
        <ProtectedComponent>
            <div>
                <div className="dropdown">
                    <h4>Word List</h4>
                    <select>
                        {wordlist.map((row,i) => (
                            <option key={i}> {row.word} </option>
                        ))}
                    </select>
                </div>
            </div>
        </ProtectedComponent>


    )
};