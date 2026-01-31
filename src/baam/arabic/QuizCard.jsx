import { useEffect, useRef, useState } from "react"
// import styles2 from "../../utils/colours/DebuggingCSS.module.css";
import styles from "./QuizCard.module.css";


export function QuizCard({ testedWords, testedWordMeanings}){
    
    const ref = useRef(null);
    const [minHeight,setMinHeight] = useState(150);
    const [showMeaning,setShowMeaning] = useState(false);
    
    // Set current test
    const [testNumber,setTestNumber]=useState(null);
    const [testLength,setTestLength]=useState(null)
    const [testedWord,setTestedWord]=useState(null);
    const [testedMeaning,setTestedMeaning]=useState(["meaning1","meaning2"]);


    // Sizing Aesthetics
    useEffect(()=>{
        const updateMinHeight = () => {
            if (ref.current) {
                setMinHeight(ref.current.offsetWidth / 2);
            }
        };
        updateMinHeight();
        window.addEventListener("resize", updateMinHeight);
        return () => window.removeEventListener("resize", updateMinHeight);
    },[])

    // Debugging ----------------------------------------
    useEffect(()=>{
        console.log("init testedWords:");console.log(testedWords);
        console.log("init testedWordMeanings:");console.log(testedWordMeanings);
    },[])
    useEffect(()=>{
        console.log('testedWords:');
        console.log(testedWords);
    }, [testedWords])
    useEffect(()=>{
        console.log('testedWordMeanings:');
        console.log(testedWordMeanings);
    }, [testedWordMeanings])
    useEffect(()=>{
        console.log(`testNumber: ${testNumber}`);
    },[testNumber])
    useEffect(()=>{
        console.log(`testLength: ${testLength}`);
    },[testLength])
    useEffect(()=>{
        console.log(`1 testedWord: ${testedWord}`);       
    },[testedWord])
    useEffect(()=>{console.log('testedMeaning:');console.log(testedMeaning);
    },[testedMeaning])
    useEffect(()=>{
        console.log("showMeaning:");console.log(showMeaning);
    },[showMeaning]);
    // End of Debugging --------------------------------------

    // Start
    useEffect(()=>{
        setTestNumber(0);
        setTestLength(Object.keys(testedWords).length);
        setTestedWord(testedWords[0]);
    },[testedWords])
    
    useEffect(()=>{
        setTestedWord(testedWords[testNumber]);
    },[testNumber])


    // filter
    useEffect(()=>{
        const filteredRows = Object.values(testedWordMeanings)
                                .filter((row)=>row.word==testedWord)
                                .map((row)=>row.meaning);
        setTestedMeaning(filteredRows);   
    },[testedWord])


    // Button Functions
    const handleNext = ()=>{
        setTestNumber((testNumber+1)%testLength);
    }
    const handlePrev = ()=>{
        setTestNumber((testNumber-1+testLength)%testLength);
    }
    const toggleShowMeaning = ()=>{
        setShowMeaning(prev => !prev);
    };


    return(
        <div className={styles.quizCard}>
            
            <div className={styles.progressDiv}>
                <h3 style={{color:"grey"}} >{testNumber+1} / {testLength}</h3>
            </div>

            {/* Div for tested word */}
            <div className={styles.quizWord}>
                <h1>{testedWord}</h1>
            </div>

            {/* Div for meanings */} 
            <div className={styles.meaningsContainer} 
            style={{height:`${minHeight}px`}}
            >
                {showMeaning && testedMeaning.map((meaning,i)=>
                    (<div key={i} className={styles.meaning}>
                        {<h4>{meaning}</h4>}
                    </div>)
                )}
            </div>
            
            <div className={styles.meaningsBtnContainer}>
                <button  className={styles.meaningsButton} onClick={toggleShowMeaning}>
                    {showMeaning? "Hide Meanings" : "Show Meanings"}
                </button>
            </div>

            <button className={styles.quizNextButton} onClick={handlePrev}>
                Previous
            </button>
            <button className={styles.quizNextButton} onClick={handleNext}>
                Next
            </button>
            
        </div>
        // <h1>QuizCard</h1>
    )
}