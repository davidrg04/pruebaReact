import { Link } from "react-router-dom";

interface ArticleCardInterface {
    id: number
    title : string;
    url : string;
    image_url : string
}

const ArticleCard: React.FC<ArticleCardInterface> = ({title, url, image_url, id}) => {

    return(
        <>
            <Link to={`/article/${encodeURIComponent(id)}`}>
                <div key={url} className="bg-white min-h-56 p-1 rounded-lg shadow-lg hover:shadow-2xl hover:cursor-pointer">
                    <img src={image_url} alt={title} className="w-full h-32 object-cover rounded-md"/>
                    <h2 className="text-sm font-bold mt-2">{title}</h2>
                </div>
            </Link>
        </>
        
        
    )
}

export default ArticleCard;