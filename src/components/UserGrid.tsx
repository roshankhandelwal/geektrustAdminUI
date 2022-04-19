import React, { useContext, useEffect, useState } from "react"

import { FaRegEdit } from "react-icons/fa";
import { FiTrash } from 'react-icons/fi';
import { MdClose, MdCheck } from 'react-icons/md';
import { UserContext } from "../contexts/userContext";
import { User } from "../models/user";


const ViewRow : React.FC<{index: number, listLength: number, user: User, setForEdit: (userId: string) => void}> = 
    ({index, listLength, user, setForEdit}) => {

    const {deleteUsers, selectForDeletion, idsForDeletion} = useContext(UserContext);

    return (
        <tr className={`border-b ${index !== listLength - 1 ? 'h-[40px]' : ''} ${idsForDeletion.includes(user.id) ? 'bg-gray-200 border-white' : 'bg-white'}`}>
            <th scope="row" className="px-6 py-4 font-medium text-lg text-gray-500 whitespace-nowrap flex flex-row align-items">
                {/* <span className="cursor-pointer"><MdOutlineCheckBoxOutlineBlank /></span> */}
                <input type="checkbox" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-1 focus:ring-sky-300"
                    onChange = {e => selectForDeletion([user.id], e.target.checked)}
                    checked = {idsForDeletion.includes(user.id)}    
                ></input>
            </th>
            <td className="px-6 py-4">
                {user.name}
            </td>
            <td className="px-6 py-4">
                {user.email}
            </td>
            <td className="px-6 py-4 capitalize">
                {user.role}
            </td>
            <td className="px-6 py-4">
                <span className="cursor-pointer inline-block mr-4" onClick={e => setForEdit(user.id)}><FaRegEdit /></span>
                <span className="text-red-500 cursor-pointer inline-block" onClick={e => deleteUsers(user.id)}><FiTrash /></span>
            </td>
        </tr>
    )
}


const EditInput : React.FC<{value: string, valueChanged: (text:string) => void}> = ({value, valueChanged}) => {
    const [inputValue, setInputValue] = useState('');

    const changeValue = (value: string) => {
        setInputValue(value);
        valueChanged(value);
    }

    useEffect(() => {
        setInputValue(value);
    }, [])

    return (
        <input type="text"
            className="block p-2 w-full text-gray-600 bg-gray-50 border-b border-gray-300 text-sm focus:outline-0 focus:border-b focus:border-gray-700 hover:border-gray-700" 
            value={inputValue}
            onChange={e => changeValue(e.target.value)}  
        />
    )
}


const EditRow : React.FC<{index: number, listLength: number, user: User, setForEdit: (userId: string) => void}> = ({index, listLength, user, setForEdit}) => {
    const {userEditCompleted} = useContext(UserContext);

    const [userModifed, setUserModified] = useState(user);

    function changeUserDetails(property: string, value: string) {
        setUserModified(user => ({...user, [property]: value}));
        // console.log(userModifed);
    }

    function persistEditChanges() {
        userEditCompleted(userModifed);
        setForEdit('-1');
    }

    return (
        <tr className={`border-b ${index !== listLength - 1 ? 'h-[40px]' : ''}`}>
            <th scope="row" className="px-6 py-4 font-medium text-lg text-gray-500 whitespace-nowrap flex flex-row align-items">

            </th>
            <td className="px-6 py-4">
                <EditInput value={user.name} valueChanged={(text: string) => changeUserDetails('name', text)}></EditInput>
            </td>
            <td className="px-6 py-4">
                <EditInput value={user.email} valueChanged={(text: string) => changeUserDetails('email', text)}></EditInput>
            </td>
            <td className="px-6 py-4 capitalize">
                <EditInput value={user.role} valueChanged={(text: string) => changeUserDetails('role', text)}></EditInput>
            </td>
            <td className="px-6 py-4 text-lg font-bold">
                <span className="cursor-pointer inline-block mr-4" onClick={e => setForEdit('-1')}><MdClose /></span>
                <span className="text-green-500 cursor-pointer inline-block" onClick={e => persistEditChanges()}><MdCheck /></span>
            </td>
        </tr>
    )
}


export function UserGrid() {
    const {visibleUserList, selectForDeletion, idsForDeletion} = useContext(UserContext);
    const [areAllentriesSelected, setAllEntriesSelected] = useState(false);
    const [rowEdit, setRowEdit] = useState('-1');

    useEffect(() => {
        setAllEntriesSelected(visibleUserList.every(user => idsForDeletion.includes(user.id)));
    }, [visibleUserList, idsForDeletion])
    
    return (
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
    )
}