import { Link } from "react-router-dom";

function Header (){
    return(
        <Link to={`/`}>
            <div className="flex justify-center items-center bg-sky-400">
                <h1 className="text-3xl text-white p-2 font-bold hover:text-sky-900 hover:cursor-pointer hover:underline">LISTA DE ARTÍCULOS</h1>
            </div>
        </Link>
        
    )
}

export default Header;