import supabase from "../../admin/supabase-client";
import { useEffect, useState, createContext, useContext } from "react";
// import createSupabaseChannel from "../../utils/createSupabaseChannel";

const ArabicContext = createContext();

export function ArabicProvider({children}) {
    // List states mirroring database entries
    const [isLoadingArabic,setIsLoadingArabic]=useState(true);
    const [tblSources,setTblSources]=useState([]);
    const [tblStoryWords,setTblStoryWords]=useState([]);
    const [tblWords,setTblWords]=useState([]);
    const [tblWordMeanings,setTblWordMeanings]=useState([]);


    useEffect(()=>{
        // Fetches initial lists for books and words
        const fetchList = async ({tableName,columnNames="*",setState}) => {
            const {data,error} = await supabase.from(tableName).select(columnNames);
            if (error){
                console.error(error);
                alert(error);
            } else {
                setState(data);
            }
        }
        
        fetchList({tableName:"baam_sources",setState:setTblSources});
        fetchList({tableName:"baam_words",setState:setTblWords});
        fetchList({tableName:"baam_word_meaning",setState:setTblWordMeanings});
        fetchList({tableName:"baam_story_words",setState:setTblStoryWords});
        setIsLoadingArabic(false);

        // Sets up Realtime subscription for the updating lists
        // const subscription=createSupabaseChannel({handlers:[
        //     {table:"baam_sources",setState:setListBooks},
        //     {table:"baam_words",setState:setListWords}
        // ]});
        // subscription.subscribe();

        // Unmounts to prevent memory leakage
        // return () => {
        //     supabase.removeChannel(subscription); // cleanup on unmount
        // };
    },[])

    return(
        <ArabicContext.Provider 
        value={{isLoadingArabic,
                tblSources,setTblSources,
                tblWords,setTblWords,
                tblWordMeanings,setTblWordMeanings,
                tblStoryWords,setTblStoryWords}}
        >
            {children}
        </ArabicContext.Provider>
    );
};

export function useArabicContext(){
    return useContext(ArabicContext);
}