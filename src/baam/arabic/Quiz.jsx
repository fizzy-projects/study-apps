import { useArabicContext } from "./ArabicContext"; 
import Spinner from "../../utils/Spinner";
import { useState, useEffect } from "react";
import { QuizCard } from "./QuizCard";


export default function ArabicQuiz(){
    const [testedStories,setTestedStories] = useState([]);
    const [testedWords,setTestedWords] = useState([]);
    const [testedWordMeanings,setTestedWordMeanings] = useState([]);
    
    // Get Arabic Tables from Arabic Context
    const {isLoadingArabic,
        tblSources,setTblSources,
        tblWords,setTblWords,
        tblWordMeanings,setTblWordMeanings,
        tblStoryWords,setTblStoryWords
        } = useArabicContext();

    // Load filtered words to test
    useEffect(()=>{
        setTestedWords(tblWords.map((row)=>(row.word)));
    },[tblWords])
    useEffect(()=>{setTestedWordMeanings(tblWordMeanings)}
    ,[tblWordMeanings]);

    // Debugging
    useEffect(()=>{
        // console.log(`Quiz.jsx testedWords:`);
        // console.log(testedWords);
    },[testedWords])
    useEffect(()=>{
        // console.log("Quiz.jsx testedWordMeanings:");
        // console.log(testedWordMeanings);
    },[testedWordMeanings])
    
    // Select word and its meanings
    

    return(
            isLoadingArabic?  <Spinner/> :
            <div style={{backgroundColor:"var(--colour4,white)"}}>
                <h2 style={{color:"black"}}>Arabic Quiz</h2>
                <QuizCard 
                testedWords={testedWords}
                testedWordMeanings={testedWordMeanings}

                />
            </div>
            
    );
}