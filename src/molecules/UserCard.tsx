import { useContext } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { UserContext } from "../contexts/userContext";
import { User } from "../models/user";

export const UserCard : React.FC<{index: number, listLength: number, user: User, setForEdit: (userId: string) => void}> = 
({index, listLength, user, setForEdit}) => {

    const {deleteUsers, selectForDeletion, idsForDeletion} = useContext(UserContext);

    return (
        <div className={`w-full px-6 py-6 ${idsForDeletion.has(user.id) ? 'bg-gray-200 border-white' : 'bg-white border-gray-200 border'}`}
            onClick = {e => selectForDeletion([user.id], !idsForDeletion.has(user.id))}>
            <div>
                <label>Name : </label>
                <span>{user.name}</span>
            </div>
            <div>
                <label>Email : </label>
                <span>{user.email}</span>
            </div>
            <div>
                <label>Role : </label>
                <span>{user.role}</span>
            </div>
            <div>
                <span className="cursor-pointer inline-block mr-4" onClick={e => setForEdit(user.id)}><FaRegEdit /></span>
                <span className="text-red-500 cursor-pointer inline-block" onClick={e => deleteUsers(user.id)}><FiTrash /></span>
            </div>
        </div>
    )
}