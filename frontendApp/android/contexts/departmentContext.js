import { createContext, useState } from "react";

export const DepartmentContext = createContext()

export function DepartmentProvider({ children }) {
    const [departToDb, setdepartToDb] = useState([]);

    return (
        <DepartmentContext.Provider value={{departToDb, setdepartToDb}}>
            {children}
        </DepartmentContext.Provider>
    )
}