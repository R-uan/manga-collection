import { useExpandMangaContext } from "./context/ExpandedMangaProvider";

export default function MangaCover() { 
    const { expandedData } = useExpandMangaContext();
    if(!expandedData) return (null);
    return (
        <div className="w-[250px] h-[350px] rounded-xl">
            <img 
            loading="lazy" 
            className="object-cover w-full h-full rounded-xl" 
            src={expandedData.link.cover} 
            alt="Cover"
            />
        </div>
    )
}