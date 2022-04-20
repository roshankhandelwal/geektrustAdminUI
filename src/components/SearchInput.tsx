import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

export function SearchInput() {
    
    const {searchTerm, searchUserList} = useContext(UserContext);

    return (
        <input type="text" id="searchBox" 
            value = {searchTerm}
            placeholder="Search by name, email or role"
            className="block p-2 w-full text-gray-900 rounded-md border border-gray-300 text-sm focus:outline-0 focus:border-gray-700" 
            onChange= {e => searchUserList(e.target.value)}
        />
    )
}