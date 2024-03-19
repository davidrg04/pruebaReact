import { useParams } from 'react-router-dom';
import { Articulo } from './ArticlesList';
import { useQuery } from "react-query";
import Header from './Components/Header';

const ArticleDetail = () => {
    const { articleId } = useParams<{ articleId: string }>();
    const id = articleId ?? '';
    const getArticles = async (): Promise<Articulo> =>{
        const response = await fetch(`https://api.spaceflightnewsapi.net/v4/articles/${encodeURIComponent(id)}`);

        if (response.status == 200) {
            return response.json();
        }else {
            throw new Error ("No se pudo acceder al contenido");
        }
        
    }

    const { data, status } = useQuery<Articulo, Error>(['articles', `https://api.spaceflightnewsapi.net/v4/articles/${encodeURIComponent(id)}`], getArticles);
    
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
                <h2 className="text-2xl text-white font-black">EN ESTOS MOMENTOS NO PODEMOS OBTENER LA INFORMACIÓN</h2>
            </div>
        ) 
    }
    if (!data || status !== 'success') {
        return null;
    }
    if (!data) {
        return(
            <div className="w-full min-h-screen bg-sky-900">
                <h1 className="text-3xl text-white flex justify-center mt-10">No se puede acceder al artículo.</h1>
            </div>
        );
    }

    function formatDate(date: string):string {
        const date2 = new Date(date);
        const day = `0${date2.getDate()}`.slice(-2); 
        const month = `0${date2.getMonth() + 1}`.slice(-2); 
        const year = date2.getFullYear();
        return `${day}/${month}/${year}`;
    }

    function getSummary(): JSX.Element | string {
        const summary = data?.summary ?? '';
        if (summary != "") {
            return summary;
        }else{
            return(
                <span className='text-xl font-bold'>No disponemos de información sobre esta noticia</span>
            );
        }
    }

    return(
        <>
            
            <div className='w-full h-screen bg-sky-900 flex flex-col'>
            <Header/>
                <div className='mt-7 rounded-xl border-4 border-sky-500 w-3/5 bg-sky-50 p-6 self-center flex flex-col gap-5 items-center'>
                    <h1 className='text-2xl font-bold'>{data.title}</h1>
                    <div>
                        <h3 className='font-medium'>Públicado {formatDate(data.published_at)}</h3>
                        <h3 className='font-medium'>Actualizado {formatDate(data.updated_at)}</h3>
                    </div>
                    
                    <div className='rounded-md'>
                        <img src={data.image_url} alt={data.title} className='rounded-md h-60'/>
                    </div>
                    <div>
                        <h2 className='text-2xl font-bold'>Información : </h2>
                        <p className='font-medium'>{getSummary()}</p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ArticleDetail;