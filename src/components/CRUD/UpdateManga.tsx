import { updateManga } from "../../scripts/helpers/manga-requests";
import { useReloadContext } from "../context/ReloadProvider";
import { useEffect, useState } from "react"
import { useExpandMangaContext } from "../context/ExpandedMangaProvider";

export default function UpdateButton() { 
    const { expandedData, setExpandedData } = useExpandMangaContext();
    const reload = useReloadContext();
    const [editStatus, setEditStatus] = useState(false);
    let info = { title: "null", author:"null", synopse:"null", type:"null", status:"null", year:1999, genre: ["null"] }
    let link = { cover: "null", url: "null" }
    let id = "null";
    if(expandedData){
        info = expandedData.info;
        link = expandedData.link;
        id = expandedData._id;
    }
    
    const initialGenre = info.genre.join(", ")
    const [title, setTitle]     = useState(info.title);
    const [author, setAuthor]   = useState(info.author);
    const [genre, setGenre]     = useState(initialGenre);
    const [synopse, setSynopse] = useState(info.synopse);
    const [type, setType]       = useState(info.type);
    const [status, setStatus]   = useState(info.status);
    const [year, setYear]       = useState(info.year);
    const [cover, setCover]     = useState(link.cover);
    const [url, setUrl]         = useState(link.url);

    useEffect(() => {
        if(expandedData) {
            setAuthor(info.author);
            setTitle(info.title)
            setGenre(initialGenre)
            setSynopse(info.synopse)
            setType(info.type);
            setStatus(info.status)
            setYear(info.year)
            setCover(link.cover)
            setUrl(link.url)
        }
    }, [editStatus])

    const divStyle = "mb-3 w-11/12 flex flex-col"
    const inputStyle = "bg-[#0f1114] rounded mb-4 pl-1 h-6"
    const selectStyle = "bg-[#0f1114] w-36 mr-3 h-6"
    const buttonStyle = "bg-[#0f1114] hover:bg-[#1b1c20] mt-10 ml-5 p-3 pt-1 pb-1 rounded"

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const id = form.id.value
        const formData = {
            info: {
                title: form._title.value,
                author: form.author.value,
                type: form.type.value,
                year: form.year.value,
                status: form.status.value,
                genre: form.genre.value.split(",").map((x: string) => {
                    return x.trim();
                }),
                synopse: form.synopse.value,
            },
            link: {
                cover: form.cover.value,
                url: form.url.value,
            },
        };

        updateManga(id, formData)
        setEditStatus(false)
        setExpandedData(null);
        setTimeout(() => {
            reload!.reloadStatus == 0 ? reload!.setReloadStatus(1) : reload!.setReloadStatus(0); 
        }, 500);
    }

    if(editStatus){
        return(
            <>
            <button onClick={() => setEditStatus(true)} className="w-6/12 text-center bg-[#525252] rounded-lg hover:bg-[#323232]">EDIT</button>

            <div className="absolute z-50 flex justify-center items-center top-0 right-0 left-0 bottom-0 w-full h-full bg-[#00000070]">
                <div onClick={(event) => event.stopPropagation()} className="bg-[#15181d] rounded-lg">
                    <form onSubmit={(event) => {onSubmit(event)}} className="flex flex-col p-5 items-center" action="POST" >
                        <div className={divStyle}>
                            <label htmlFor="title">Title:</label>
                            <input className={inputStyle} id="_title" type="text" autoComplete="off" value={title} onChange={(e) => setTitle(e.target.value)} readOnly={false}/>
                            
                            <label htmlFor="author">Author: </label>
                            <input className={inputStyle} id="author" type="text" autoComplete="off" value={author} onChange={(e) => setAuthor(e.target.value)}/>
                        
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
                            <input className={selectStyle} id="year" type="number" autoComplete="off" value={year} onChange={(e) => setYear(parseInt(e.target.value))}/>
                        </div>
                        <input id="id" name="id" type="hidden" value={id} /* readOnly={true} */ />
                    <div>
                        <button className={buttonStyle} type="submit" > SAVE </button>
                        <button className={buttonStyle} type="button" onClick={() => { setEditStatus(false) }}> CLOSE </button>
                    </div>
                    </form>
                </div>
            </div>
            </>
            
        )
    }
    return (
        <button onClick={() => setEditStatus(true)} className="w-6/12 text-center bg-[#525252] rounded-lg hover:bg-[#323232]">EDIT</button>
    )
}