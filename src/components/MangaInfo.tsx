import { useExpandMangaContext } from "./context/ExpandedMangaProvider";

export default function MangaInfo() {
    const { expandedData } = useExpandMangaContext();
    if(!expandedData) return (null); 

    const { title, author, type, year, status, synopse } = expandedData;
    const genre = expandedData.genre.join(", ");

    return (
        <div className="ml-2 w-[60%] h-[350px] ">
            <div className="h-36 overflow-auto mb-2">
                <p className="text-2xl break-words"><b>{title}</b></p>
                <p className="text-sm"><b>Author:&nbsp;</b>{author}</p>
                <p className="text-sm"><b>Type:</b>&nbsp;{type}</p>
                <p className="text-sm"><b>Year:</b>&nbsp;{year}</p>
                <p className="text-sm"><b>Status:</b>&nbsp;{status}</p>
                <p className="text-sm mb-2"><b>Genre:&nbsp;</b>{genre}</p>
            </div>
            <hr />
            
            <div className="h-[195px] h-max-[10px] mt-1 overflow-auto">
                <p className="text-justify whitespace-pre-line break-words">
                    {synopse}
                </p>
            </div>
        </div>
    )
}