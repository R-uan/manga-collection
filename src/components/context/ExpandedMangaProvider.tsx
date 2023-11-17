import { ReactNode, createContext, useContext, useState } from "react";
import IManga from "../../scripts/interfaces/IManga";

interface ExpandMangaContextValue {
    expandedData: IManga | null,
    setExpandedData: React.Dispatch<React.SetStateAction<IManga | null>>;
}

const ExpandMangaContext = createContext<ExpandMangaContextValue | undefined>(undefined);

export default function ExpandMangaProvider({ children } : { children: ReactNode }) {
    const [expandedData, setExpandedData] = useState<IManga | null>(null);
    return(
        <ExpandMangaContext.Provider value={{expandedData, setExpandedData}}>
            {children}
        </ExpandMangaContext.Provider>
    )
}

export function useExpandMangaContext() { 
    const expandMangaContext = useContext(ExpandMangaContext);
    if(expandMangaContext === undefined) {
        throw new Error('useOnboardingContext must be inside a OnboardingProvider');
    }
    return expandMangaContext;
}