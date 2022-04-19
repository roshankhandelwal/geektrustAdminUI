import React, { createContext, ReactElement, ReactNode, useReducer } from "react";
import { User } from "../models/user";

let initialData = [
    {
        "id": "1",
        "name": "Aaron Miles",
        "email": "aaron@mailinator.com",
        "role": "member"
    },
    {
        "id": "2",
        "name": "Aishwarya Naik",
        "email": "aishwarya@mailinator.com",
        "role": "member"
    },
    {
        "id": "3",
        "name": "Arvind Kumar",
        "email": "arvind@mailinator.com",
        "role": "admin"
    },
    {
        "id": "4",
        "name": "Caterina Binotto",
        "email": "caterina@mailinator.com",
        "role": "member"
    },
    {
        "id": "5",
        "name": "Chetan Kumar",
        "email": "chetan@mailinator.com",
        "role": "member"
    },
    {
        "id": "6",
        "name": "Jim McClain",
        "email": "jim@mailinator.com",
        "role": "member"
    },
    {
        "id": "7",
        "name": "Mahaveer Singh",
        "email": "mahaveer@mailinator.com",
        "role": "member"
    },
    {
        "id": "8",
        "name": "Rahul Jain",
        "email": "rahul@mailinator.com",
        "role": "admin"
    },
    {
        "id": "9",
        "name": "Rizan Khan",
        "email": "rizan@mailinator.com",
        "role": "member"
    },
    {
        "id": "10",
        "name": "Sarah Potter",
        "email": "sarah@mailinator.com",
        "role": "admin"
    },
    {
        "id": "11",
        "name": "Keshav Muddaiah",
        "email": "keshav@mailinator.com",
        "role": "member"
    },
    {
        "id": "12",
        "name": "Nita Ramesh",
        "email": "nita@mailinator.com",
        "role": "member"
    },
    {
        "id": "13",
        "name": "Julia Hunstman",
        "email": "julia@mailinator.com",
        "role": "member"
    },
    {
        "id": "14",
        "name": "Juan Alonso",
        "email": "juan@mailinator.com",
        "role": "admin"
    },
    {
        "id": "15",
        "name": "Gabriel Montoya",
        "email": "gabriel@mailinator.com",
        "role": "admin"
    },
    {
        "id": "16",
        "name": "Beatrice Iglesias",
        "email": "beatrice@mailinator.com",
        "role": "admin"
    },
    {
        "id": "17",
        "name": "Sarah Symms",
        "email": "sarah.s@mailinator.com",
        "role": "admin"
    },
    {
        "id": "18",
        "name": "Patrick Pinheiro",
        "email": "patrick@mailinator.com",
        "role": "admin"
    },
    {
        "id": "19",
        "name": "Anand Patel",
        "email": "anand@mailinator.com",
        "role": "member"
    },
    {
        "id": "20",
        "name": "Kishore Kalburgi",
        "email": "kishore@mailinator.com",
        "role": "member"
    },
    {
        "id": "21",
        "name": "Rebecca Norris",
        "email": "rebecca@mailinator.com",
        "role": "member"
    },
    {
        "id": "22",
        "name": "Özgür Başak",
        "email": "ozgur@mailinator.com",
        "role": "member"
    },
    {
        "id": "23",
        "name": "Robin Andersen",
        "email": "robin@mailinator.com",
        "role": "member"
    },
    {
        "id": "24",
        "name": "Nandini Kumar",
        "email": "nandini@mailinator.com",
        "role": "member"
    },
    {
        "id": "25",
        "name": "Nikita Smith",
        "email": "nikita@mailinator.com",
        "role": "member"
    },
    {
        "id": "26",
        "name": "Colton Doe",
        "email": "colton@mailinator.com",
        "role": "member"
    },
    {
        "id": "27",
        "name": "Alain Senna",
        "email": "alain@mailinator.com",
        "role": "member"
    },
    {
        "id": "28",
        "name": "Ashwin Jain",
        "email": "ashwin@mailinator.com",
        "role": "member"
    },
    {
        "id": "29",
        "name": "Seema Bhatt",
        "email": "seema@mailinator.com",
        "role": "member"
    },
    {
        "id": "30",
        "name": "Kayla Scarpinski",
        "email": "kayla@mailinator.com",
        "role": "member"
    },
    {
        "id": "31",
        "name": "Ajay Ghosh",
        "email": "ajay@mailinator.com",
        "role": "member"
    },
    {
        "id": "32",
        "name": "Chris Lindberg",
        "email": "chris@mailinator.com",
        "role": "member"
    },
    {
        "id": "33",
        "name": "Christina Mourujärvi",
        "email": "christina@mailinator.com",
        "role": "member"
    },
    {
        "id": "34",
        "name": "Mikhail Bill",
        "email": "mikhail@mailinator.com",
        "role": "member"
    },
    {
        "id": "35",
        "name": "Eino Göregen",
        "email": "eino@mailinator.com",
        "role": "member"
    },
    {
        "id": "36",
        "name": "Zachariah Johansson",
        "email": "zacharaiah@mailinator.com",
        "role": "member"
    },
    {
        "id": "37",
        "name": "Aimaan Mohammed",
        "email": "aimaan@mailinator.com",
        "role": "admin"
    },
    {
        "id": "38",
        "name": "Aika Tsunoda",
        "email": "aika@mailinator.com",
        "role": "member"
    },
    {
        "id": "39",
        "name": "Kimiko Minamoto",
        "email": "kimiko@mailinator.com",
        "role": "member"
    },
    {
        "id": "40",
        "name": "Alyona Baginskaite",
        "email": "alyona@mailinator.com",
        "role": "member"
    },
    {
        "id": "41",
        "name": "Anirudh Mukherjee",
        "email": "anirudh@mailinator.com",
        "role": "member"
    },
    {
        "id": "42",
        "name": "Alyona Gov",
        "email": "alyonagov@mailinator.com",
        "role": "member"
    },
    {
        "id": "43",
        "name": "Robin Singh",
        "email": "robin@mailinator.com",
        "role": "member"
    },
    {
        "id": "44",
        "name": "Vijay Vasudevan",
        "email": "vijayv@mailinator.com",
        "role": "member"
    },
    {
        "id": "45",
        "name": "Steve Smith",
        "email": "steve@mailinator.com",
        "role": "member"
    },
    {
        "id": "46",
        "name": "Anirudh Banerjee",
        "email": "anirudhb@mailinator.com",
        "role": "member"
    }
]

type State = {
    searchTerm: string;
    pageNum: number;
    countPerPage: number;
    idsForDeletion: Array<string>;
    usersList: Array<User>;
    visibleUserList: Array<User>;
}

const initialState = {
    searchTerm: '',
    pageNum: 1,
    countPerPage: 10,
    idsForDeletion: new Array(),
    usersList: [...initialData],
    visibleUserList: [...initialData].slice(0, 10),
    searchUserList: (searchTerm: string) => {},
    changePage: (pageNum: number) => {},
    deleteUsers: (userId?: string) => {},
    selectForDeletion: (userIds: Array<string>, isChecked: boolean) => {},
    userEditCompleted: (user: User) => {}
};

export const UserContext = createContext(initialState);

function reducer(state: State, action: any) : State {
    const payload = action.payload;

    let startingRecord = 0;
    let modifiedUsersList = [];

    switch(action.type) {
        case 'SEARCH_CHANGED':
            const usersList = payload !== '' ? filterUserList(payload) : [...initialData];
            // console.log(usersList);

            return {...state, 
                searchTerm: payload,
                pageNum: 1,
                usersList: usersList,
                visibleUserList: [...usersList].slice(0, 10)
            }
        case 'PAGE_CHANGED':
            startingRecord = (payload - 1) * 10;
            return {...state, 
                pageNum: payload,
                visibleUserList: [...state.usersList].slice(startingRecord, startingRecord + state.countPerPage)
            }
        case 'DELETE_SELECTED':
            // Need to change initialData, and whatever page you are on - get the full 10 records & set it on visibleUserList

            initialData = initialData.filter(user => payload ? payload !== user.id : !state.idsForDeletion.includes(user.id));
            modifiedUsersList = state.usersList.filter(user => payload ? payload !== user.id : !state.idsForDeletion.includes(user.id));

            startingRecord = (state.pageNum - 1) * 10;
            let pageNum = state.pageNum;

            let visibleUserList = [...modifiedUsersList].slice(startingRecord, startingRecord + state.countPerPage);

            // This would be when all the records on the last page are deleted
            if (visibleUserList.length === 0 && state.pageNum > 1) {
                pageNum = state.pageNum - 1;
                startingRecord = (state.pageNum - 2) * 10;
                visibleUserList = [...modifiedUsersList].slice(startingRecord, startingRecord + state.countPerPage);
            }

            return {...state, 
                pageNum,
                idsForDeletion: payload ? state.idsForDeletion : [],
                usersList: modifiedUsersList,
                visibleUserList: visibleUserList
            }
        case 'SELECT_FOR_DELETION':
            const idsForDeletion =  payload.isChecked ? 
                [...state.idsForDeletion, ...payload.userIds as Array<string>] : 
                state.idsForDeletion.filter(id => !payload.userIds.includes(id))

            return {
                ...state, 
                idsForDeletion: idsForDeletion
            }
        case 'USER_EDITED':
            initialData = initialData.map(user => payload.id === user.id ? payload : user);
            modifiedUsersList = state.usersList.map(user => payload.id === user.id ? payload : user);

            return {
                ...state, 
                usersList: modifiedUsersList,
                visibleUserList: [...modifiedUsersList].slice(startingRecord, startingRecord + state.countPerPage)
            }
        default:
            return state;
    }
}


function filterUserList(searchTerm: string) {
    searchTerm = searchTerm.toLocaleLowerCase();

    return [...initialData].filter(user => {
        return user.name?.toLocaleLowerCase().includes(searchTerm) 
            || user.email?.toLocaleLowerCase().includes(searchTerm) 
            || user.role?.toLocaleLowerCase().includes(searchTerm)
    });
}


function useDataManager() {
    const [state, dispatch] = useReducer(reducer, initialState);

    function searchUserList(searchTerm: string) {
        dispatch({
            type: 'SEARCH_CHANGED',
            payload: searchTerm
        });
    }

    function changePage(pageNum: number) {
        dispatch({
            type: 'PAGE_CHANGED',
            payload: pageNum
        });
    }

    function deleteUsers(userid?: string) {
        dispatch({
            type: 'DELETE_SELECTED',
            payload: userid
        });
    }

    function selectForDeletion(userIds: Array<string>, isChecked: boolean) {
        dispatch({
            type: 'SELECT_FOR_DELETION',
            payload: {userIds, isChecked}
        });
    }

    function userEditCompleted(user: User) {
        dispatch({
            type: 'USER_EDITED',
            payload: user
        });
    }

    return {state, searchUserList, changePage, deleteUsers, selectForDeletion, userEditCompleted};
}



const UsersContextProvider= ({ children }: {children: ReactNode}): ReactElement => {
    const {state, searchUserList, changePage, deleteUsers, selectForDeletion, userEditCompleted} = useDataManager();
    
    const provider = { 
        ...state,  
        searchUserList, 
        changePage,
        deleteUsers,
        selectForDeletion,
        userEditCompleted
    }; 

    return (
        <UserContext.Provider value={provider}>
            {children}
        </UserContext.Provider>
    )
}

export default UsersContextProvider;