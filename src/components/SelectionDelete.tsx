import { useContext } from "react"
import { UserContext } from "../contexts/userContext"

export const SelectionDeleteBtn : React.FC<{idsCount: number}> = ({idsCount}) => {
    const {deleteUsers} = useContext(UserContext);

    return (
        <button type="button" className="text-white bg-red-400 hover:bg-red-600 focus:outline-none focus:ring-1 focus:ring-red-300 rounded-lg text-sm px-4 py-2 text-center" onClick={e => deleteUsers()}>
            Delete Selected ( {idsCount} )
        </button>
    )
}