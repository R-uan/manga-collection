import ExpandedManga from "../components/ExpandedManga";
import MangaList from "../components/MangaList";
import ExpandedMangaProvider from "../components/context/ExpandedMangaProvider";
import ReloadProvider from "../components/context/ReloadProvider";

export default function Home() { 
    return (
        <div className="flex flex-row">
            <ReloadProvider>
                <ExpandedMangaProvider>
                    <MangaList />
                    <ExpandedManga />
                </ExpandedMangaProvider>
            </ReloadProvider>
        </div>
        
            
    )
}