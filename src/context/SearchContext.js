import { createContext } from "react";

export const SearchContext = createContext(null)

export default function SearchContextProvider ({children, value}) {
    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    )
}