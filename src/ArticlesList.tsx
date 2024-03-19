import React, {useState} from "react";
import { useQuery } from "react-query";
import Header from "./Components/Header";
import SearchInput from "./Components/SearchInput";
import NextPaginator from "./Components/Next";
import PrevPaginator from "./Components/Prev";
import ArticleCard from "./Components/ArticleCard";
export interface Launches{
    launch_id : string;
    provider : string;
}

export interface Events{
    event_id : number;
    provider : string;
}


export interface Articulo {
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

export interface RespuestaApi{
    count : number;
    next : string | null;
    previous : string | null;
    results : Articulo[];
}



const ArticlesList = () =>{
    const [url, setUrl] = useState<string>("https://api.spaceflightnewsapi.net/v4/articles/");
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
        return(
            <div className="w-full h-screen flex flex-col justify-center items-center bg-sky-900">
                <h1 className="text-3xl text-white font-black">ERROR</h1>
                <h2 className="text-2xl text-white font-black">EN ESTOS MOMENTOS NO PODEMOS ACCEDER A LOS DATOS</h2>
            </div>
        ) 
    }
    if (!data || status !== 'success') {
        return null;
    }
    if (data && data.results.length === 0) {
        return(
            <div className="w-full min-h-screen bg-sky-900">
                <Header/>
                <SearchInput setUrl={setUrl}/>
                <h1 className="text-3xl text-white flex justify-center mt-10">No se encontraron artículos</h1>
            </div>
        );
    }
    return (
        <div className="w-full min-h-screen bg-sky-900">
            <Header/>
            <SearchInput setUrl={setUrl}/>
                <div className="flex gap-2 mx-auto mt-2 justify-center">
                    <PrevPaginator setUrl={setUrl} url={data?.previous}/>
                    <NextPaginator setUrl={setUrl} url={data?.next}/>
                </div>
            <div className="mx-auto w-4/5 border-4 border-sky-400 rounded-lg bg-sky-300 flex flex-col mt-4 shadow-lg">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4">
                {data.results.map((article) => (
                    <ArticleCard title={article.title} url={article.url} image_url={article.image_url} id={article.id}/>
                ))}
                </div>
            </div>
        </div>
    )
    
}

export default ArticlesList;