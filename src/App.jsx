
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './components/Home.page'
import SuperHeroesPage from './components/SuperHeroes.page'
import RQSuperHeroesPage from './components/RQSuperHeroes.page'
import RQSuperHeroPage from './components/RQSuperHero.page'

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/super-heroes">Super Heroes</Link>
          </li>
          <li>
            <Link to="/rq-super-heroes">React Query Super Heroes</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/super-heroes" element={<SuperHeroesPage />} />
        <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
        <Route path="/rq-super-hero/:heroId" element={<RQSuperHeroPage />} />
      </Routes>
    </div>
  );
}

export default App
