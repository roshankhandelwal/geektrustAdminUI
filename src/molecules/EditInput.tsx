import { useState, useEffect } from "react";

const EditInput : React.FC<{value: string, valueChanged: (text:string) => void}> = ({value, valueChanged}) => {
    const [inputValue, setInputValue] = useState('');

    const changeValue = (value: string) => {
        setInputValue(value);
        valueChanged(value);
    }

    useEffect(() => {
        setInputValue(value);
    }, [])

    return (
        <input type="text"
            className="block p-2 w-full text-gray-600 bg-gray-50 border-b border-gray-300 text-sm focus:outline-0 focus:border-b focus:border-gray-700 hover:border-gray-700" 
            value={inputValue}
            onChange={e => changeValue(e.target.value)}  
        />
    )
}

export default EditInput;