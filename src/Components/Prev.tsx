import { PaginatorProps } from "./Next";

const PrevPaginator: React.FC<PaginatorProps> = ({setUrl, url}) => {
    function prev (){
        if (url) {
            setUrl(url);
        }
    }
    return (
        <a href="#" onClick={prev} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-white dark:bg-sky-400 dark:border-sky-400 dark:text-white dark:hover:bg-sky-500 dark:hover:text-white">
            <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
            </svg>
            Anterior
        </a>
    )
}

export default PrevPaginator;