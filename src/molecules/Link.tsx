const Link : React.FC<{link: string, text: string}> = ({link, text}) => {
    return <a className="cursor-pointer ml-3 text-sm text-sky-600 antialiased underline hover:text-sky-800" 
        href={link} target="_blank" rel="noreferrer">{text}</a>
}

export default Link;