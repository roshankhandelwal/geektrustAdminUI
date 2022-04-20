import React, { useContext, useEffect, useState } from "react"

import { UserContext } from "../contexts/userContext";
import EditRow from "../molecules/EditRow";
import Loader from "../molecules/Loader";
import { ViewRow } from "../molecules/ViewRow";
import { getUsersList } from "../services/userService";


export function UserGrid() {
    const {initialLoad, visibleUserList, selectForDeletion, idsForDeletion} = useContext(UserContext);
    const [areAllentriesSelected, setAllEntriesSelected] = useState(false);
    const [rowEdit, setRowEdit] = useState('-1');

    const [loader, setLoader] = useState(true);

    useEffect(() => {
        setAllEntriesSelected(visibleUserList.every(user => idsForDeletion.has(user.id)));
    }, [visibleUserList, idsForDeletion])

    useEffect(() => {
        const fetchInitialData = async () => {
            console.log('Fetching Initial Data');

            const data = await getUsersList();
            initialLoad(data);
            
            setLoader(false);
        } 

        fetchInitialData();
    }, []);
    
    return (
        <>
            {
                !loader && 
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-4 min-h-[580px]">
                        <thead className="text-xs text-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-lg">
                                    {/* <span className="cursor-pointer"><MdOutlineCheckBoxOutlineBlank /></span> */}
                                    { rowEdit === '-1' && 
                                        <input type="checkbox" className="w-4 h-4 bg-gray-50 rounded border border-gray-600 focus:ring-1 focus:ring-sky-300 cursor-pointer"
                                            onChange = {e => selectForDeletion([...visibleUserList.map(user => user.id)], e.target.checked)}
                                            checked = {areAllentriesSelected}
                                        ></input>
                                    }
                                </th>
                                <th scope="col" className="px-6 py-3 grow">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="align-top">
                            {visibleUserList.length > 0 && 
                                visibleUserList.map((user, index) => {
                                    return (
                                        <React.Fragment key={user.id}>
                                            {user.id !== rowEdit && 
                                                <ViewRow index={index} listLength={visibleUserList.length} user={user} setForEdit={setRowEdit}></ViewRow> 
                                            }
                                            {user.id === rowEdit && 
                                            <EditRow index={index} listLength={visibleUserList.length} user={user} setForEdit={setRowEdit}></EditRow>
                                            }
                                        </React.Fragment>
                                    )
                                })
                            }
                        </tbody>
                    </table>
            }
            {
                loader && <Loader />
            }
        </>
    )
}