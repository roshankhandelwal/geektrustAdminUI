import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/userContext";


const useDebounce = (fn: () => void, time: number) => {
    useEffect(() => {
        const timer = setTimeout(fn, time);

        return () => clearTimeout(timer);
    }, [fn, time])
}


export function SearchInput() {
    
    const { searchUserList } = useContext(UserContext);
    const [ searchTerm, setSearchTerm ] = useState('');
    
    useDebounce(() => { 
        searchUserList(searchTerm) 
    }, 500);

    return (
        <input type="text" id="searchBox" 
            value = {searchTerm}
            placeholder="Search by name, email or role"
            className="block p-2 w-full text-gray-900 rounded-md border border-gray-300 text-sm focus:outline-0 focus:border-gray-700" 
            onChange= {e => setSearchTerm(e.target.value)}
        />
    )
}