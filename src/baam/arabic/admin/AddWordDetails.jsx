import { useEffect, useState } from "react";
import supabase from "../../../admin/supabase-client";
import createSupabaseChannel from "../../../utils/createSupabaseChannel";
import ProtectedComponent from "../../../admin/ProtectedComponent";
import AutocompleteInput from "../../../utils/AutoCompleteInput";

function AddWordDetails() {
  // List states mirroring database entries
  const [listBooks,setListBooks]=useState([]);
  const [listWords,setListWords]=useState([]);
  // Form input states
  const [newWord, setNewWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [bookName, setBookName] = useState("")
  const [storyNumber, setStoryNumber] = useState("");
  // Form control states
  const [isUpdating, setIsUpdating] = useState(false);
  // Form autocomplete selections
  // const [bookSelected,setBookSelected]=useState(null);
  // const [wordSelected,setWordSelected]=useState(null);

  useEffect(()=>{
    // Fetches initial lists for books and words
    const fetchList = async ({tableName,columnName,setState}) => {
      const {data,error} = await supabase.from(tableName).select(columnName);
      if (error){
        console.error(error);
        alert(error);
      } else {
        setState(data);
      }
    }
    fetchList({tableName:"baam_sources",columnName:"source",setState:setListBooks});
    fetchList({tableName:"baam_words",columnName:"word",setState:setListWords});
    // Sets up Realtime subscription for the updating lists
    const subscription=createSupabaseChannel({handlers:[
        {table:"baam_sources",setState:setListWords},
        {table:"baam_words",setState:setListBooks}
    ]});
    subscription.subscribe();

    // Unmounts to prevent memory leakage
    return () => {
        supabase.removeChannel(subscription); // cleanup on unmount
    };
  },[])

  const upsertWord = async()=>{
    const {error} = await supabase
                                .from("baam_words")
                                .upsert({word:newWord})
                                .select();
    return error;
  }
  const upsertMeaning = async()=>{
    const {error} = await supabase
                                .from("baam_word_meaning")
                                .upsert({word:newWord,meaning:meaning})
                                .select();
    return error;
  }
  const upsertBook = async()=>{
    const {error} = await supabase
                                .from("baam_sources")
                                .upsert({source:bookName})
                                .select();
    return error;
  }
  const upsertStoryWords = async()=>{
    const numericStoryNumber = Number(storyNumber);
    const {error} = await supabase
                                .from("baam_story_words")
                                .upsert({bookName:bookName,storyNumber:numericStoryNumber,word:newWord})
                                .select();
    return error;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newWord.trim()=="") {
      alert("Word is empty.")
      return null;
    }
    setIsUpdating(true);

    let error = await upsertWord(newWord);
    if (error) {
      console.error(error);
      alert("error inserting word");
      setIsUpdating(false);
      return null;
    }

    if (meaning.trim()!=="") {
      error = await upsertMeaning();
      if (error) {
        console.error(error);
        alert("error inserting meaning");
        setIsUpdating(false);
        return null;
      }
    }

    if (bookName.trim()!=="") {
      error = await upsertBook();
      if (error) {
        console.error(error);
        alert("error inserting book");
        setIsUpdating(false);
        return null;
      }
    }

    if (storyNumber.trim()!=="") {
      error = await upsertStoryWords();
      if (error) {
        console.error(error);
        alert("error inserting story words");
        setIsUpdating(false);
        return null;
      }
    }

    alert("Word details added successfully!")
    setNewWord("");
    setMeaning("");
    // setBookName("");
    // setStoryNumber(0);
    setIsUpdating(false);
    // setRefreshToggle((prev) => !prev);
  };



  return (
    <ProtectedComponent>
      <div>
        <form onSubmit={handleSubmit} className="product-form">
          
          {/* <div>
            <label>BookName: </label>
            <input
              type="text"
              value={bookName}
              onChange={(e) => {isUpdating? null : setBookName(e.target.value)}}
              disabled={isUpdating}
            />
          </div> */}
          
          <div>
            <AutocompleteInput
                labelText="BookName:"
                items={listBooks.map(row=>row.source)}
                transformItem={(c) => c}
                value={bookName}
                disableCondition={isUpdating}
                // onChange={(val) => {
                //   setBookName(val);
                //   setBookSelected(null);
                // }}
                onChangeFunc={(e) => {
                  // console.log("this is onChangeFunc");
                  setBookName(e.target.value);
                  // console.log(`finished onChangeFunc. bookName: ${bookName}`)
                  // console.log(bookName);
                  // setBookSelected("");
                }}
                onSelectFunc={(transformedItem) => {
                  // console.log("this is onSelectFunc.");
                  setBookName(transformedItem);
                  // console.log(`completed setting bookName: ${bookName}`);
                  // console.log(bookName);
                  // setBookSelected(transformedItem);
                }}
                placeholder="Type the source of the word"
            />
          </div>


          <div>
            <label>StoryNumber: </label>
            <input
              type="number"
              value={storyNumber}
              onChange={(e) => {isUpdating? null : setStoryNumber(e.target.value)}}
              disabled={isUpdating}
            />
          </div>

          <div>
            <label>Word: </label>
            <input
              type="text"
              value={newWord}
              placeholder="...فعل"
              onChange={(e) => {isUpdating? null: setNewWord(e.target.value)}}
              disabled={isUpdating}
              required
            />
          </div>

          <div>
            <label>Meaning: </label>
            <input
              type="text"
              value={meaning}
              onChange={(e) => {isUpdating? null : setMeaning(e.target.value)}}
              placeholder="Do..."
              disabled={isUpdating}
            />
          </div>

          <button type="submit" disabled={isUpdating}>
            {isUpdating ? "Adding..." : "Add"}
          </button>
        </form>
      </div>
    </ProtectedComponent>
  )
}

export default AddWordDetails;