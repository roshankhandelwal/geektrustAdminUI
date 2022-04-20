import React, { ReactNode, useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";

import {MdFirstPage, MdLastPage, MdChevronLeft, MdChevronRight} from 'react-icons/md';


interface PaginationBtnObj {
    value: number; 
    isEnabled?: boolean; 
    isActive?: boolean;
    children? : ReactNode;
    changePage: (pageNum: number) => void 
}

const PaginationButton : React.FC<PaginationBtnObj> = 
        ({value, isEnabled, isActive, children, changePage}) => {
    return (
        <div className={`rounded-full w-8 h-8 flex items-center justify-center mr-4 cursor-pointer
            ${isActive ? 'bg-white text-sky-500 border border-sky-500' : 
                isEnabled ? 'bg-sky-500 text-white' : 'bg-gray-200 text-gray-400 border border-gray-200 cursor-not-allowed'}`}
            onClick = {e => isEnabled && changePage(value)}
        >
            {children ? children : value}
        </div>
    )
}

export function Pagination() {
    const {pageNum, countPerPage, usersList, changePage} = useContext(UserContext);
    const [pageList, setPageList] = useState<Array<any>>([]);
    // console.log('Rerendering pagination');

    // const pageCount = useRef<number>();

    useEffect(() => {
        const pageCount = Math.ceil(usersList.length / countPerPage) ?? 0;
        // console.log(pageCount);

        if (pageCount === 0) {
            setPageList([]);

        } else {
            const btnList = [];
            btnList.push(<PaginationButton value={1} isEnabled={pageNum > 1} key="firstPage" changePage={changePage}><MdFirstPage/></PaginationButton>);
            btnList.push(<PaginationButton value={pageNum - 1} isEnabled={pageNum > 1} key="previousPage" changePage={changePage}><MdChevronLeft/></PaginationButton>);

            for (let i = 0; i < pageCount; i++) {
                btnList.push(<PaginationButton value={i+1} isEnabled={true} isActive={pageNum === (i + 1)} key={i} changePage={changePage}></PaginationButton>) 
            }

            btnList.push(<PaginationButton value={pageNum + 1} isEnabled={pageNum < pageCount} key="nextPage" changePage={changePage}><MdChevronRight/></PaginationButton>);
            btnList.push(<PaginationButton value={pageCount} isEnabled={pageNum < pageCount} key="lastPage" changePage={changePage}><MdLastPage/></PaginationButton>);
            
            setPageList(btnList);
        }
    }, [usersList, countPerPage, pageNum, changePage]);


    return (
        <>
            {pageList.length > 0 && 
                <div className="flex flex-row items-center gap-x-0.5">
                    {pageList.map(page => page)}
                </div>
            }
        </>
       
        
    )
}