import { ReactNode, createContext, useContext, useState } from "react";

interface ReloadValue {
    reloadStatus: number,
    setReloadStatus: React.Dispatch<React.SetStateAction<number>>;
}

const ReloadContext = createContext<ReloadValue | null>(null);

export default function ReloadProvider({ children } : { children: ReactNode }) {
    const [reloadStatus, setReloadStatus] = useState(0);
    return(
        <ReloadContext.Provider value={{reloadStatus, setReloadStatus}}>
            {children}
        </ReloadContext.Provider>
    )
}

export function useReloadContext() { 
    const expandMangaContext = useContext(ReloadContext);
    if(expandMangaContext === undefined) {
        throw new Error('reloadContext must be inside a ReloadProvider');
    }
    return expandMangaContext;
}