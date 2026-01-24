import { useState } from "react";
import supabase from "../../../admin/supabase-client";

function AddWordMeaning() {
  const [newWord, setNewWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [bookName, setBookName] = useState("")
  const [storyNumber, setStoryNumber] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

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
    console.log("upserting Story Words.")
    console.log(`bookName: ${bookName}, storyNumber: ${storyNumber}, word: ${newWord}`);
    console.log(numericStoryNumber);
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
    // setMeaning("");
    // setBookName("");
    // setStoryNumber(0);
    setIsUpdating(false);
    // setRefreshToggle((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>BookName: </label>
        <input
          type="text"
          value={bookName}
          onChange={(e) => {isUpdating? null : setBookName(e.target.value)}}
          disabled={isUpdating}
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
  )
}

export default AddWordMeaning;