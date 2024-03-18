import { useState } from 'react'
import ArticlesList from './ArticlesList';
import './App.css'

function App() {
 const [articles, setArticles] = useState([]);



  return (
    <>
      <ArticlesList/>
    </>
  )
}

export default App
