import { useState } from "react";
import { postManga } from "../../scripts/helpers/manga-requests"

export default function AddNewManga() {
    const [newManga, setNewMangaStatus] = useState(false);
    
    const inputStyle = "bg-[#0f1114] rounded mb-4 pl-1 h-6"
    const divStyle = "mb-3 w-11/12 flex flex-col"
    const selectStyle = "bg-[#0f1114] w-36 mr-3 h-6"
    const buttonStyle = "bg-[#0f1114] hover:bg-[#1b1c20] mt-10 ml-5 p-3 pt-1 pb-1 rounded"
    if(newManga) {
        return (
            <>
            {/* Button */}
            <div className="rounded w-[528px] hover:bg-[#0b0d0f] bg-[#0f1114]">
                <button onClick={() => { setNewMangaStatus(true)}} className="w-full h-full bg-transparent" type="button" >ADD NEW MANGA</button>
            </div>

            <div className="absolute z-50 flex justify-center items-center top-0 right-0 left-0 bottom-0 w-full h-full bg-[#00000070]">
                <div onClick={(event) => event.stopPropagation()} className="bg-[#15181d] rounded-lg">
                    <form className="flex flex-col p-5 items-center" action="POST" onSubmit={(e) => { postManga(e, setNewMangaStatus)}}>
                        <div className={divStyle}>
                            <label htmlFor="title">Title:</label>
                            <input className={inputStyle} id="_title" type="text" autoComplete="off"/>
                            
                            <label htmlFor="author">Author: </label>
                            <input className={inputStyle} id="author" type="text" autoComplete="off"/>
                        
                            <label htmlFor="genre">Genres: </label>
                            <input className={inputStyle} id="genre" type="text" autoComplete="off"/>

                            <label htmlFor="synopse">Synopse: </label>
                            <textarea className="bg-[#0f1114] rounded mb-4 pl-1 h-[150px] min-h-[150px] max-h-[150px]" name="" id="synopse" cols={15} rows={15}></textarea>
                        
                            <label htmlFor="cover">Cover: </label>
                            <input className={inputStyle} id="cover" type="text" autoComplete="off"/>

                            <label htmlFor="url">URL: </label>
                            <input className={inputStyle} id="url" type="text" autoComplete="off"/>
                        </div>

                        <div className="flex w-11/12 items-center justify-center">
                            <label htmlFor="">Type:&nbsp;</label>
                            <select className={selectStyle} name="type" id="type">
                                <option value="Manga">Manga</option>
                                <option value="Manhwa">Manhwa</option>
                            </select>

                            <label htmlFor="">Status:&nbsp;</label>
                            <select className={selectStyle} name="status" id="status">
                                <option value="Ongoing">Ongoing</option>
                                <option value="Complete">Complete</option>
                                <option value="Hiatus">Hiatus</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>

                            <label htmlFor="">Year:&nbsp;</label>
                            <input className={selectStyle} id="year" type="number" autoComplete="off"/>
                        </div>
                        <div>
                            <button className={buttonStyle} type="submit" > SAVE </button>
                            <button className={buttonStyle} type="button" onClick={() => { setNewMangaStatus(false) }} > CLOSE </button>
                        </div>
                    </form>
                </div>
            </div>
            </>
        )
    }
    return (
        /* Button */
        <div className="rounded w-[528px] hover:bg-[#0b0d0f] bg-[#0f1114]">
            <button onClick={() => { setNewMangaStatus(true)}} className="w-full h-full bg-transparent" type="button" >ADD NEW MANGA</button>
        </div>
    )
}