import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

export function SearchInput() {
    
    const {searchTerm, searchUserList} = useContext(UserContext);

    return (
        <input type="text" id="searchBox" 
            value = {searchTerm}
            placeholder="Search by name, email or role"
            className="block p-2 w-full text-gray-900 rounded-md border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500" 
            onChange= {e => searchUserList(e.target.value)}
        />
    )
}