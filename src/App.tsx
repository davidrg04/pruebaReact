import ArticlesList from './ArticlesList';
import ArticleDetail from './ArticleDetail';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {



  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="/article/:articleId" element={<ArticleDetail />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
