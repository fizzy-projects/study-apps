import { useArabicContext } from "./ArabicContext"; 
import Spinner from "../../utils/Spinner";
import { useState, useEffect } from "react";
import { QuizCard } from "./QuizCard";


export default function ArabicQuiz(){
    const [testedStories,setTestedStories] = useState([]);
    const [testedWords,setTestedWords] = useState([]);
    const [testedWordMeanings,setTestedWordMeanings] = useState([]);
    const [isLoadingQuiz,setIsLoadingQuiz] = useState(true);

    // For middleman selection by user 
    const [selectedStories,setSelectedStories]=useState(["All"]);
    const [myTemp,setMyTemp]=useState(null);

    // Get Arabic Tables from Arabic Context
    const {isLoadingArabic,
        tblSources,setTblSources,
        tblWords,setTblWords,
        tblWordMeanings,setTblWordMeanings,
        tblStoryWords,setTblStoryWords
        } = useArabicContext();

    // Load filtered words to test
    useEffect(()=>{
        setTestedWords(tblWords.map((row)=>(row.word)))}
    ,[tblWords])
    useEffect(()=>{setTestedWordMeanings(tblWordMeanings)}
    ,[tblWordMeanings]);
    useEffect(()=>{setTestedStories(tblSources)}
    ,[tblSources]);

    // Debugging
    // useEffect(()=>{
        // console.log(`Quiz.jsx testedWords:`);
        // console.log(testedWords);
    // },[testedWords])
    // useEffect(()=>{
        // console.log("Quiz.jsx testedWordMeanings:");
        // console.log(testedWordMeanings);
    // },[testedWordMeanings])
    useEffect(()=>{
        console.log("myTemp:");console.log(myTemp)}
    ,[myTemp])
    
    // Select word and its meanings
    const getListAllStories=(obj={},outputType='str|int')=>{
        // Takes in an obj = Object of Object Of Rows, outputType = 'str' or 'int'
        if (outputType=="str") {
            return [... new Set(Object.values(obj).map(row=>row.storyNumber).sort((a,b)=>parseInt(a)-parseInt(b)))]
        }
        if (outputType=="int") {
            return [... new Set(Object.values(obj).map((row,i)=>parseInt(row.storyNumber,10)).sort((a,b)=>a-b))]
        }
    }
    
    useEffect(()=>{
        console.log('tempUseEffect:')
        console.log(getListAllStories(tblStoryWords,"str"))
        // setMyTemp(getListAllStories(tblStoryWords,"str")
        //                     .map(i=>({value:i,label:i})))
    },[tblStoryWords])


    // Updated testedStories with the user-selected stories
    useEffect(()=>{
        console.log("selectedStories:");
        console.log(selectedStories);
        if (selectedStories[0]=="All") {
            setTestedStories(getListAllStories(tblStoryWords,"str"))
        } else setTestedStories(selectedStories);
    },[selectedStories])

    useEffect(()=>{
        console.log('TestedStoriesChanged:');console.log(testedStories);
        setTestedWords(Object.values(tblStoryWords)
                            .filter(row=>testedStories.includes(row.storyNumber))
                            .map(row=>row.word)
                        )
    },[testedStories])

    useEffect(()=>{
        console.log("testedWords changed:");console.log(testedWords);
        setTestedWordMeanings(Object.values(tblWordMeanings)
                                    .filter(row=>testedWords.includes(row.word))
                                    // .map(row=>row.meaning)
                                )
    },[testedWords])

    useEffect(()=>{
        console.log("testedWordMeanings changed:");console.log(testedWordMeanings);
        setIsLoadingQuiz(false);
    },[testedWordMeanings])


    const handleSelected=(e)=>{
        const values = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedStories(values);
    }

    return(
            isLoadingQuiz?  <Spinner/> :
            <div>


                <label>Story No. </label>
                <select
                value={selectedStories} 
                onChange={handleSelected}
                >
                    {getListAllStories(tblStoryWords,"str")
                            .map(i=>(
                            <option key={i} value={i}>{i}</option>
                            ))}
                    <option value="All">All</option>
                </select>

                <div style={{backgroundColor:"var(--colour4,white)"}}>
                    <h2 style={{color:"black"}}>Arabic Quiz</h2>
                    <QuizCard 
                    testedWords={testedWords}
                    testedWordMeanings={testedWordMeanings}
                    />
                </div>
            </div>

            
    );
}