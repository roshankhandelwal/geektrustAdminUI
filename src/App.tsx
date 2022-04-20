import React, { useContext } from 'react';
import './App.scss';
import { Pagination } from './components/Pagination';
import { SearchInput } from './components/SearchInput';
import { SelectionDeleteBtn } from './components/SelectionDelete';
import { UserGrid } from './components/UserGrid';
import { UserContext } from './contexts/userContext';
import Link from './molecules/Link';


const builtWith = [
  {id: 'react', link: 'https://reactjs.org/', text: 'React'},
  {id: 'cra', link: 'https://create-react-app.dev/', text: 'CRA'},
  {id: 'tailwind', link: 'https://tailwindcss.com/', text: 'Tailwind CSS'},
  {id: 'reactIcons', link: 'https://react-icons.github.io/react-icons/', text: 'React Icons'},
  {id: 'flowbite', link: 'https://flowbite.com/', text: 'FlowBite'},
  {id: 'githubPages', link: 'https://pages.github.com/', text: 'Github Pages'}
]


function App() {
  const {idsForDeletion} = useContext(UserContext);

  return (
    <>
      <div className="bg-slate-50 text-center p-8 pb-12">
        <SearchInput></SearchInput>
        <UserGrid></UserGrid>
        <div className={`flex flex-row items-center mt-6 ${idsForDeletion.size > 0 ? 'justify-between' : 'justify-end' }`}>
          {idsForDeletion.size > 0 && <SelectionDeleteBtn idsCount={idsForDeletion.size}></SelectionDeleteBtn>}
          <Pagination></Pagination>
        </div>
      </div>
      <hr className="border-b-0 border-gray-400"/>
      <div className="bg-slate-100 text-center flex flex-col text-sm py-6">
        <div className="mb-2">Created with 
          {builtWith.map(credit => 
            <Link link={credit.link} text={credit.text} key={credit.id} />
          )}
        </div>
        <div>© 2022 <span className="font-medium">Roshan Khandelwal</span> <span>&lt;roshan.khandelwal@gmail.com&gt;</span></div>
      </div>
    </>
    
  );
}

export default App;
