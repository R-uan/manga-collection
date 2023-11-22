import { useState } from "react";
import { useReloadContext } from "../context/ReloadProvider";
import { MangaRequests } from "../../scripts/Requests";
import { useExpandMangaContext } from "../context/ExpandedMangaProvider";

export default function DeleteButton() {
    const [deletion, setDeletion] = useState(false);
    const { expandedData, setExpandedData } = useExpandMangaContext();
    const reload = useReloadContext();
    
    async function deleteRequest() {
        await MangaRequests.DeleteManga(expandedData!._id);
        setDeletion(false);
        setExpandedData(null);
        setTimeout(() => {
            reload!.reloadStatus == 0 ? reload!.setReloadStatus(1) : reload!.setReloadStatus(0); 
        }, 500);
    }
    
    if(deletion) { 
        return (
            <>
            <button onClick={() => setDeletion(true)} className="w-6/12 mr-1 text-center bg-[#a71919] rounded-lg hover:bg-[#7e1717]">
                DELETE
            </button>

            <div id="delete-modal-bg" className="absolute rounded-xl w-full h-full top-0 left-0 flex justify-center items-center bg-[#00000070]">
                <div className="bg-[#15181d] flex flex-col justify-center items-center w-80 h-36 rounded-lg">
                    <h1 className="mb-6 text-2xl text-center">Confirm Deletion</h1>
                    <span>
                        <button onClick={() => deleteRequest()} className="mr-7 bg-[#ff3131] w-[70px] h-[30px] rounded"><b>Delete</b></button>
                        <button onClick={() => setDeletion(false)} className="bg-[#505050] ml-7 w-[70px] h-[30px] rounded">Cancel</button>
                    </span>
                </div>
            </div>
        </>
        )
    }
    return (
        <>
            <button onClick={() => setDeletion(true)} className="w-6/12 mr-1 text-center bg-[#a71919] rounded-lg hover:bg-[#7e1717]">
                DELETE
            </button>
        </>
    )
}