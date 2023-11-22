import { useEffect, useState } from "react"
import { useReloadContext } from "../context/ReloadProvider";
import { MangaRequests } from "../../scripts/Requests";
import { useExpandMangaContext } from "../context/ExpandedMangaProvider";

export default function UpdateButton() { 
    const { expandedData, setExpandedData } = useExpandMangaContext();
    const reload = useReloadContext();
    const [editStatus, setEditStatus] = useState(false);
    let id = expandedData!._id;
    let info = expandedData!;
    
    const [title, setTitle]     = useState(info.title);
    const [author, setAuthor]   = useState(info.author);
    const [genre, setGenre]     = useState(info.genre.join(", "));
    const [synopse, setSynopse] = useState(info.synopse);
    const [type, setType]       = useState(info.type);
    const [status, setStatus]   = useState(info.status);
    const [year, setYear]       = useState(info.year);
    const [cover, setCover]     = useState(info.cover);
    const [url, setUrl]         = useState(info.url);

    useEffect(() => {
        if(expandedData) {
            setAuthor(info.author);
            setTitle(info.title)
            setGenre(info.genre.join(", "))
            setSynopse(info.synopse)
            setType(info.type);
            setStatus(info.status)
            setYear(info.year)
            setCover(info.cover)
            setUrl(info.url)
        }
    }, [editStatus])
    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const id = expandedData!._id;
        const formData = {    
            title: form._title.value,
            type: form.type.value,
            year: form.year.value,
            status: form.status.value,
            author: form.author.value,
            genre: form.genre.value.split(",").map((x: string) => {
                return x.trim();
            }),
            synopse: form.synopse.value,
            url: form.url.value,
            cover: form.cover.value,            
        };
        MangaRequests.UpdateManga(id, formData)
        setEditStatus(false)
        setExpandedData(null);
        setTimeout(() => {
            reload!.reloadStatus == 0 ? reload!.setReloadStatus(1) : reload!.setReloadStatus(0); 
        }, 500);
    }

    const divStyle = "mb-3 w-11/12 flex flex-col"
    const inputStyle = "bg-[#0f1114] rounded mb-4 pl-1 h-6"
    const selectStyle = "bg-[#0f1114] w-36 mr-3 h-6"
    const buttonStyle = "bg-[#0f1114] hover:bg-[#1b1c20] mt-10 ml-5 p-3 pt-1 pb-1 rounded"

    if(editStatus){
        return(
            <>
            <button onClick={() => setEditStatus(true)} className="w-6/12 text-center bg-[#525252] rounded-lg hover:bg-[#323232]">EDIT</button>

            <div className="absolute z-50 flex justify-center items-center top-0 right-0 left-0 bottom-0 w-full h-full bg-[#00000070]">
                <div onClick={(event) => event.stopPropagation()} className="bg-[#15181d] rounded-lg">
                    <form onSubmit={(event) => {onSubmit(event)}} className="flex flex-col p-5 items-center" action="POST" >
                        <div className={divStyle}>
                            <label htmlFor="title">Title:</label>
                            <input className={inputStyle} id="_title" type="text" autoComplete="off" value={title} onChange={(e) => setTitle(e.target.value)} readOnly={false} required/>
                            
                            <label htmlFor="author">Author: </label>
                            <input className={inputStyle} id="author" type="text" autoComplete="off" value={author} onChange={(e) => setAuthor(e.target.value)} required/>
                        
                            <label htmlFor="genre">Genres: </label>
                            <input className={inputStyle} id="genre" type="text" autoComplete="off" value={genre} onChange={(e) => setGenre(e.target.value)}/>

                            <label htmlFor="synopse">Synopse: </label>
                            <textarea className="bg-[#0f1114] rounded mb-4 pl-1 h-[150px] min-h-[150px] max-h-[150px]" name="" id="synopse" cols={10} rows={10} value={synopse} onChange={(e) => setSynopse(e.target.value)}></textarea>
                        
                            <label htmlFor="cover">Cover: </label>
                            <input className={inputStyle} id="cover" type="text" autoComplete="off" value={cover} onChange={(e) => setCover(e.target.value)}/>

                            <label htmlFor="url">URL: </label>
                            <input className={inputStyle} id="url" type="text" autoComplete="off" value={url} onChange={(e)=> setUrl(e.target.value)}/>
                        </div>

                        <div className="flex w-11/12 items-center justify-center">
                            <label htmlFor="">Type:&nbsp;</label>
                            <select className={selectStyle} name="type" id="type" value={type} onChange={(e) => {setType(e.target.value)}}>
                                <option value="Manga">Manga</option>
                                <option value="Manhwa">Manhwa</option>
                            </select>

                            <label htmlFor="">Status:&nbsp;</label>
                            <select className={selectStyle} name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="Ongoing">Ongoing</option>
                                <option value="Complete">Complete</option>
                                <option value="Hiatus">Hiatus</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>

                            <label htmlFor="">Year:&nbsp;</label>
                            <input className={selectStyle} id="year" type="number" autoComplete="off" value={year} onChange={(e) => setYear(parseInt(e.target.value))} required/>
                        </div>
                        <input id="dId" name="dId" type="hidden" value={id} /* readOnly={true} */ />
                    <div>
                        <button className={buttonStyle} type="submit" > SAVE </button>
                        <button className={buttonStyle} type="reset" onClick={() => { setEditStatus(false); }}>Close</button>
                    </div>
                    </form>
                </div>
            </div>
            </>
            
        )
    }
    return (
        <button onClick={() => setEditStatus(true)} className="w-6/12 text-center rounded-lg bg-[#525252] hover:bg-[#323232]">EDIT</button>
    )
}