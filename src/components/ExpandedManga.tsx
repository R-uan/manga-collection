import DeleteButton from "./CRUD/DeleteManga";
import { useExpandMangaContext } from "./context/ExpandedMangaProvider";
import MangaCover from "./MangaCover";
import MangaInfo from "./MangaInfo";
import UpdateButton from "./CRUD/UpdateManga";
import gif from "../assets/ezgif.com-gif-maker_3.gif"

export default function ExpandedManga() {
    const { expandedData } = useExpandMangaContext();
    if(!expandedData) return (
        <div className=" bg-[#0f1114] w-[710px] h-[414px] m-2 flex flex-col content-center rounded-xl static flex-wrap justify-center items-middle">
            <img src={gif} alt="" className="w-36 h-36" />
        </div>
    ); 
    return(
        <div className=" bg-[#0f1114] w-[710px] h-fit m-2 flex flex-col content-center rounded-xl static">
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