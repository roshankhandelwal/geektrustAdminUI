import React, { useContext } from 'react';
import './App.scss';
import { Pagination } from './components/Pagination';
import { SearchInput } from './components/SearchInput';
import { SelectionDeleteBtn } from './components/SelectionDelete';
import { UserGrid } from './components/UserGrid';
import { UserContext } from './contexts/userContext';

function App() {
  const {idsForDeletion} = useContext(UserContext);
  
  return (
    <div className="bg-slate-50 text-center p-8">
      <SearchInput></SearchInput>
      <UserGrid></UserGrid>
      <div className={`flex flex-row items-center mt-6 ${idsForDeletion.size > 0 ? 'justify-between' : 'justify-end' }`}>
        {idsForDeletion.size > 0 && <SelectionDeleteBtn idsCount={idsForDeletion.size}></SelectionDeleteBtn>}
        <Pagination></Pagination>
      </div>
    </div>
  );
}

export default App;
