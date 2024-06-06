import { createContext, useState } from "react";

export const AttedanceContext = createContext()

export function AttendanceProvider({ children }) {
    const [selecteddepartment, setselecteddepartment] = useState(null);
    const [selectedsemester, setselectedsemester] = useState(null);
    const [selectedsubject, setselectedsubject] = useState(null);


    return (
        <AttedanceContext.Provider value={{selecteddepartment, setselecteddepartment, selectedsubject, setselectedsubject, selectedsemester, setselectedsemester}}>
            {children}
        </AttedanceContext.Provider>
    )
} 