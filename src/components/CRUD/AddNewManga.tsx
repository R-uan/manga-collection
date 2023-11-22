import { useState } from "react";
import { MangaRequests } from "../../scripts/Requests";
import { useReloadContext } from "../context/ReloadProvider";

export default function AddNewManga() {
    const [newManga, setNewMangaStatus] = useState(false);
    const [warning, setWarning] = useState("");
    const reload = useReloadContext();
    
    const inputStyle = "bg-[#0f1114] rounded mb-4 pl-1 h-6"
    const divStyle = "mb-3 w-11/12 flex flex-col"
    const selectStyle = "bg-[#0f1114] w-36 mr-3 h-6"
    const buttonStyle = "bg-[#0f1114] hover:bg-[#1b1c20] mt-10 ml-5 p-3 pt-1 pb-1 rounded"

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const form = event.currentTarget;
            const genre = form.genre.value.split(",").map((x: string) => {
                return x.trim();
            })
            const data = {
                title: form._title.value ? form._title.value : null,
                author: form.author.value ? form.author.value : null,
                type: form.type.value ? form.type.value : "Manga",
                year: form.year.value ? form.year.value : null,
                status: form.status.value ? form.status.value : "Ongoing",
                genre: genre ? genre : ["none"],
                synopse: form.synopse.value ? form.synopse.value : "No synopse found",
                cover: form.cover.value ? form.cover.value : "None",
                url: form.url.value ? form.url.value : "None",
            };
            await MangaRequests.PostManga(data)
            setNewMangaStatus(false)
            setWarning("");
        } catch (error: any) {
            console.log(error)
            setWarning(error)
        }
        setTimeout(() => reload!.reloadStatus == 0 ? reload!.setReloadStatus(1) : reload!.setReloadStatus(0), 500);
    }
    if(newManga) {
        return (
            <>
            {/* Button */}
            <div className="rounded w-[528px] hover:bg-[#0b0d0f] bg-[#0f1114]">
                <button onClick={() => { setNewMangaStatus(true)}} className="w-full h-full bg-transparent" type="button" >ADD NEW MANGA</button>
            </div>

            <div className="absolute z-50 flex justify-center items-center top-0 right-0 left-0 bottom-0 w-full h-full bg-[#00000070]">
                {warning ? (
                <div className="absolute top-0 bg-[#ff3333] h-8 w-full justify-center flex items-center">
                    <h1>{warning}</h1>
                </div>
                ) : null}
                <div onClick={(event) => event.stopPropagation()} className="bg-[#15181d] rounded-lg">
                    <form className="flex flex-col p-5 items-center" action="POST" onSubmit={(e) => { onSubmit(e) }}>
                        <div className={divStyle}>
                            <label htmlFor="title">Title:</label>
                            <input className={inputStyle} id="_title" type="text" autoComplete="off" required/>
                            
                            <label htmlFor="author">Author: </label>
                            <input className={inputStyle} id="author" type="text" autoComplete="off" required/>
                        
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
                            <input className={selectStyle} id="year" type="number" autoComplete="off" required/>
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