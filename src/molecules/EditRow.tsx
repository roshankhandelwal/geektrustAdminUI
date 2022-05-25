import { useContext, useRef, useState } from "react";
import { MdClose, MdCheck } from "react-icons/md";
import { UserContext } from "../contexts/userContext";
import { User } from "../models/user";
import EditInput from "./EditInput";

const EditRow : React.FC<{index: number, listLength: number, user: User, setForEdit: (userId: string) => void}> = ({index, listLength, user, setForEdit}) => {
    const {userEditCompleted} = useContext(UserContext);

    // const [userModifed, setUserModified] = useState(user);
    const userModified = useRef(user);

    function changeUserDetails(property: string, value: string) {
        userModified.current = {...userModified.current, [property]: value};
        // setUserModified(user => ({...user, [property]: value}));
        // console.log(userModifed);
    }

    function persistEditChanges() {
        userEditCompleted(userModified.current);
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

export default EditRow;