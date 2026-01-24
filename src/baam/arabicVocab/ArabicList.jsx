import { useState, useEffect } from "react";
import supabase from "../../admin/supabase-client";
import createSupabaseChannel from "../../utils/createSupabaseChannel";

export default function ArabicList(){
    const [wordlist,setWordlist] = useState([]);
    const [refreshToggle,setRefreshToggle]=useState(false);


    // useEffect(() => {
    //     const fetchList = async () => {
    //     const { data, error } = await supabase
    //         .from("baam_words")
    //         .select("word");
    //         if (error) {
    //             console.error(error);
    //             return;
    //         }
    //         setWordlist(data);
    //         console.log(data);
    //     };
    //     fetchList();
    //     console.log(wordlist);
    // }, []);

    // Subscribe to database events
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
            console.log(data);
        };
        fetchList();
        console.log(wordlist);
        // const subscription = supabase
        //     .channel("public:words") // channel name, must be unique
        //     .on(
        //         "postgres_changes",
        //         { event: "*", schema: "public", table: "baam_words" },
        //         (payload) => {
        //             console.log("Realtime event:", payload);
        //             setWordlist(
        //                 (current) => {
        //                     switch (payload.eventType) {
        //                     case "INSERT":
        //                         return [...current, payload.new]; // add new row
        //                     case "UPDATE":
        //                         return current.map((w) =>
        //                         w.id === payload.new.id ? payload.new : w
        //                         ); // replace updated row
        //                     case "DELETE":
        //                         return current.filter((w) => w.id !== payload.old.id); // remove deleted row
        //                     default:
        //                         return current;
        //                     }
        //                 }
        //             );
        //         }
        //     )
        //     .subscribe();
        const subscription=createSupabaseChannel({handlers:[
            {table:"baam_words",setState:setWordlist}
        ]});
        subscription.subscribe();

        return () => {
            supabase.removeChannel(subscription); // cleanup on unmount
        };
    }, []);


    return(
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

    )
};