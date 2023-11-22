import IManga from "../scripts/interfaces/IManga";
import { useExpandMangaContext } from "./context/ExpandedMangaProvider";

export default function Manga({ Manga } : { Manga: IManga }) {
    let { title, author, status, genre } = Manga;
    const { setExpandedData } = useExpandMangaContext()

    title?.length > 30 ? title = title.slice(0, 31) + "..." : null;
    author?.length > 30 ? author = author.slice(0, 31) + "..." : null;
    
    return (
        <div className="w-[528px] bg-[#0f1114] p-2 mr-0 mt-2 flex flex-row rounded-md items-center relative hover:cursor-pointer hover:bg-[#0b0d0f]">
            <div className="w-[370px] ml-3 mr-1">
                <span>
                    <h1 className="inline-block font-bold">Title:&nbsp;</h1> 
                    <h1 className="inline-block">{title}</h1><br />
                </span>
                <span>
                    <h1 className="inline-block font-bold">Author:&nbsp;</h1> 
                    <h1 className="inline-block">{author}</h1>
                </span>
            </div>
            <div className="mr-3 ml-0 w-52">
                <span>
                    <h1 className="inline font-bold">Genre:&nbsp;</h1> 
                    <h1 className="inline">{genre[0]}</h1><br />
                </span>
                <span>
                    <h1 className="inline font-bold">Status:&nbsp;</h1> 
                    <h1 className="inline">{status}</h1><br />
                </span>
            </div>
            
            <button onClick={() => setExpandedData(Manga)} aria-label="expand-manga" className="absolute rounded w-[99.9%] h-full left-0 bg-transparent"></button>
        </div>)
}