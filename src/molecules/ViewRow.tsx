import { useContext } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { UserContext } from "../contexts/userContext";
import { User } from "../models/user";

export const ViewRow : React.FC<{index: number, listLength: number, user: User, setForEdit: (userId: string) => void}> = 
({index, listLength, user, setForEdit}) => {

    const {deleteUsers, selectForDeletion, idsForDeletion} = useContext(UserContext);

    return (
        <tr className={`border-b ${index !== listLength - 1 ? 'h-[40px]' : ''} ${idsForDeletion.has(user.id) ? 'bg-gray-200 border-white' : 'bg-white'}`}>
            <th scope="row" className="px-6 py-4 font-medium text-lg text-gray-500 whitespace-nowrap flex flex-row align-items">
                {/* <span className="cursor-pointer"><MdOutlineCheckBoxOutlineBlank /></span> */}
                <input type="checkbox" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-1 focus:ring-sky-300"
                    onChange = {e => selectForDeletion([user.id], e.target.checked)}
                    checked = {idsForDeletion.has(user.id)}    
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