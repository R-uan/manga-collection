import Manga from "./Manga";
import IManga from "../scripts/interfaces/IManga";
import Search from "./Search";
import AddNewManga from "./CRUD/AddNewManga";
import { MangaRequests } from "../scripts/Requests";
import { useReloadContext } from "./context/ReloadProvider";
import { useEffect, useState } from "react";

export default function MangaList(){
    const [mangaList, setMangaList] = useState<IManga[] | null>(null);
    const [responseMessage, setResponseMessage] = useState("");
    const reload = useReloadContext()?.reloadStatus;

    useEffect(() => { 
        async function fetch() { 
            try {
                const response = await MangaRequests.FetchAll();
                if(response.length > 0) setMangaList(response);
                else setResponseMessage("Nothing Found");
            } catch (error) { setResponseMessage(`${error}`) } 
        }
        fetch()
    }, [reload])

    async function fetchMangas(data: { option: string, input: string }) { 
        try {
            const mangas: [] = await MangaRequests.SearchManga(data);
            if(mangas.length > 0) setMangaList(mangas);
            else setMangaList(null);
        } catch (error: any) { setMangaList(null); setResponseMessage(error) }
    }

    return(
        <div className="m-2 p-1">
            <Search searchMangas={fetchMangas} />
            <AddNewManga />
            <div className="relative h-[665px] overflow-auto flex flex-col w-fit">
                <div className="flex flex-col gap-1">
                    {
                    mangaList ? (mangaList.map((manga) => {
                        let m = <Manga key={manga._id} Manga={manga} />
                        return m  
                    })) 
                    : 
                    (<div className="w-[528px] bg-[#0f1114] p-2 mr-0 mt-2 flex flex-row justify-center rounded-md items-center relative">
                        <h1>{responseMessage}</h1>
                    </div>)
                }
                </div>
            </div>
        </div>
    );
}