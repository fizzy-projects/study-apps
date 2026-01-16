
function Dropdown({imageList}){

    const handleGoTo = (e) => {
        const id = e.target.value;
        if (!id) return;

        document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        });

        // Optional: update URL hash (bookmarkable)
        window.history.replaceState(null, "", `#${id}`);
    };

    return(
        <div className="dropdown">
            <h4>Select Hadith No.</h4>
            <select onChange={handleGoTo} defaultValue="">
                {/* <option value="" disabled>
                    Jump to section
                </option> */}
                {
                    imageList.map(item => (
                        <option key={item.imageID} value={item.hadithNumber}>{item.hadithNumber}</option>
                    ))
                }
            </select>
            

        </div>
    )
}

export default Dropdown;