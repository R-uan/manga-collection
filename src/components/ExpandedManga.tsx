import DeleteButton from "./CRUD/DeleteManga";
import { useExpandMangaContext } from "./context/ExpandedMangaProvider";
import MangaCover from "./MangaCover";
import MangaInfo from "./MangaInfo";
import UpdateButton from "./CRUD/UpdateManga";
import gif from "../assets/ezgif.com-gif-maker_3.gif"
import github from "../assets/github.png";

export default function ExpandedManga() {
    const { expandedData } = useExpandMangaContext();
    if(!expandedData) return (
        <div className=" bg-[#0f1114] w-[710px] h-[414px] m-2 mt-3 flex flex-col content-center rounded-xl flex-wrap justify-center items-middle relative">
            <img src={gif} alt="" className="w-36 h-36" />
            <div className="absolute bottom-2 left-3 flex">
                <span className="text-[#9a9a9a] inline">
                    Created/Developed by: Ruan
                </span>
                <span>
                    <a aria-label="github repository" href="https://github.com/R-uan/manga-collection" target="_blank">
                    <img className="w-5 h-5 ml-2 inline opacity-50 mb-0 top-0" src={github} alt="" />
                    </a>
                </span>
            </div>
        </div>
    ); 
    return(
        <div className=" bg-[#0f1114] w-[710px] h-fit m-2 mt-3 flex flex-col content-center rounded-xl static">
            <div className="w-full h-max m-2 flex flex-row align-middle">
                <MangaCover />
                <MangaInfo />
            </div>
            <div className="mr-2 ml-2 mb-2 bg-[#15181D] rounded-xl p-1 flex justify-between">
                <DeleteButton />
                <UpdateButton />
            </div>
        </div>
    );
}