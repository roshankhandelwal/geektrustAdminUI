export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

export interface SearchObj {
    pageNum? : number;
    rowsCount? : number;
    searchTerm? : string
}