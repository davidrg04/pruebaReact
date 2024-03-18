import React, {useEffect,useState} from "react";
import { useQuery } from "react-query";


interface Launches{
    launch_id : string;
    provider : string;
}

interface Events{
    event_id : number;
    provider : string;
}


interface Articulo {
    id : number;
    title : string;
    url: string;
    image_url : string;
    news_site : string;
    summary : string;
    published_at : string;
    updated_at : string;
    featured : boolean;
    launches : Launches[];
    events : Events[];
}

interface RespuestaApi{
    count : number;
    next : string | null;
    previous : string | null;
    results : Articulo[];
}


const ArticlesList = () =>{
    const [url, setUrl] = useState<string>("https://api.spaceflightnewsapi.net/v4/articles/");
    const [searchValue, setSearchValue] = useState<string>('');
    const getArticles = async (): Promise<RespuestaApi> =>{
        const response = await fetch(url);

        if (response.status == 200) {
            return response.json();
        }else {
            throw new Error ("No se pudo acceder al contenido");
        }
        
    }

    const { data, status } = useQuery<RespuestaApi, Error>(['articles', url], getArticles);
    
    if (status === 'loading') {
        return(
            <div className="w-full h-screen flex justify-center items-center bg-sky-900">
                <h1 className="text-3xl text-white font-black">Cargando ...</h1>
            </div>
        )
    }

    if (status === 'error') {
        return <p className="mx-auto text-center">ERROR</p>
    }
    if (!data || status !== 'success') {
        return null;
    }

    function next (){
        if (data?.next) {
            setUrl(data.next);
        }
    }
    function prev (){
        if (data?.previous) {
            setUrl(data.previous);
        }
    }

    function changeSearch (e:React.ChangeEvent<HTMLInputElement>){
        setSearchValue(e.target.value)
    }
    function search (){
        const url:string = "https://api.spaceflightnewsapi.net/v4/articles/";
        setUrl(`${url}?title_contains=${searchValue}`);
    }
    return (
        <div className="w-full min-h-screen bg-sky-900 flex-col justify-center">
            <div className="flex justify-center items-center bg-sky-400">
                <h1 className="text-3xl text-white p-2 font-bold">LISTA DE ARTÍCULOS</h1>
            </div>
            <div>
                <form className="max-w-md mx-auto mt-2">   
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" value={searchValue} onChange={changeSearch} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-sky-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="China, Moon, Space X.." required />
                        <button type="submit" onClick={search} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-sky-500 dark:hover:bg-sky-600 dark:focus:ring-blue-800">Buscar</button>
                    </div>
                </form>
            </div>
            <div className="mt-2">
                <div className="flex mx-auto justify-center">
                    <a href="#" onClick={prev} className="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-white bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-white dark:bg-sky-400 dark:border-sky-400 dark:text-white dark:hover:bg-sky-500 dark:hover:text-white">
                        <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                        </svg>
                        Anterior
                    </a>
                    <a href="#" onClick={next} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-white dark:bg-sky-400 dark:border-sky-400 dark:text-white dark:hover:bg-sky-500 dark:hover:text-white">
                        Siguiente
                        <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                </div>
            </div>
            <div className="mx-auto w-4/5 border-4 border-sky-400 rounded-lg bg-sky-300 flex flex-col mt-4 shadow-lg">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4">
                {data.results.map((article) => (
                    <div key={article.url} className="bg-white p-1 rounded-lg shadow-lg hover:shadow-2xl hover:cursor-pointer">
                        <img src={article.image_url} alt={article.title} className="w-full h-32 object-cover rounded-md"/>
                        <h2 className="text-sm font-bold mt-2">{article.title}</h2>
                    </div>
                ))}
                
                </div>
            </div>
        </div>
    )
    
}

export default ArticlesList;