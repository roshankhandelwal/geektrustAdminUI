import React, { createContext, ReactElement, ReactNode, useReducer } from "react";
import { User } from "../models/user";

type State = {
    searchTerm: string;
    pageNum: number;
    countPerPage: number;
    idsForDeletion: Set<string>;
    initialData: Array<User>;
    usersList: Array<User>;
    visibleUserList: Array<User>;
}

const initialState = {
    searchTerm: '',
    pageNum: 1,
    countPerPage: 10,
    idsForDeletion: new Set<string>(),
    initialData: [] as Array<User>,
    usersList: [] as Array<User>,
    visibleUserList: [] as Array<User>,
    // usersList: [...initialData],
    // visibleUserList: [...initialData].slice(0, 10),
    initialLoad: (userList: Array<User>) => {},
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

    let initialData = [];

    switch(action.type) {
        case 'INITIAL_LOAD':
            return {
                ...state,
                initialData: payload,
                usersList: [...payload],
                visibleUserList: [...payload].slice(0, 10),
            }
        case 'SEARCH_CHANGED':
            const usersList = payload !== '' ? filterUserList([...state.initialData], payload) : [...state.initialData];
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
                visibleUserList: [...state.usersList].slice(startingRecord, startingRecord + state.countPerPage),
            }
        case 'DELETE_SELECTED':
            // Need to change initialData, and whatever page you are on - get the full 10 records & set it on visibleUserList

            initialData = state.initialData.filter(user => payload ? payload !== user.id : !state.idsForDeletion.has(user.id));
            modifiedUsersList = state.usersList.filter(user => payload ? payload !== user.id : !state.idsForDeletion.has(user.id));

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
                idsForDeletion: payload ? state.idsForDeletion : new Set(),
                initialData: initialData,
                usersList: modifiedUsersList,
                visibleUserList: visibleUserList
            }
        case 'SELECT_FOR_DELETION':

            const idsForDeletion = new Set([...Array.from(state.idsForDeletion)]);
            if (payload.isChecked) {
                payload.userIds.forEach((userId: string) => {
                    idsForDeletion.add(userId);
                })
            } else {
                payload.userIds.forEach((userId: string) => {
                    idsForDeletion.delete(userId);
                })
            }

            return {
                ...state, 
                idsForDeletion: idsForDeletion
            }
        case 'USER_EDITED':
            initialData = state.initialData.map(user => payload.id === user.id ? payload : user);
            modifiedUsersList = state.usersList.map(user => payload.id === user.id ? payload : user);

            return {
                ...state, 
                initialData: initialData,
                usersList: modifiedUsersList,
                visibleUserList: [...modifiedUsersList].slice(startingRecord, startingRecord + state.countPerPage)
            }
        default:
            return state;
    }
}


function filterUserList(userList: Array<User>, searchTerm: string) {
    searchTerm = searchTerm.toLocaleLowerCase();

    return userList.filter(user => {
        return user.name?.toLocaleLowerCase().includes(searchTerm) 
            || user.email?.toLocaleLowerCase().includes(searchTerm) 
            || user.role?.toLocaleLowerCase().includes(searchTerm)
    });
}


function useDataManager() {
    const [state, dispatch] = useReducer(reducer, initialState);

    function initialLoad(userList: Array<User>) {
        dispatch({
            type: 'INITIAL_LOAD',
            payload: userList
        });
    }

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

    return {state, initialLoad, searchUserList, changePage, deleteUsers, selectForDeletion, userEditCompleted};
}



const UsersContextProvider= ({ children }: {children: ReactNode}): ReactElement => {
    const {state, initialLoad, searchUserList, changePage, deleteUsers, selectForDeletion, userEditCompleted} = useDataManager();

    
    
    const provider = { 
        ...state,
        initialLoad,  
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