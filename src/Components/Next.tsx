export interface PaginatorProps {
    setUrl: (url: string) => void;
    url : string | null;
}
const NextPaginator: React.FC<PaginatorProps> = ({setUrl, url}) => {
    function next (){
        if (url) {
            setUrl(url);
        }
    }
    return (
        <a href="#" onClick={next} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-white dark:bg-sky-400 dark:border-sky-400 dark:text-white dark:hover:bg-sky-500 dark:hover:text-white">
            Siguiente
            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    )
}

export default NextPaginator;