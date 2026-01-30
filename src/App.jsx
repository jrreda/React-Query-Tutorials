
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './components/Home.page'
import SuperHeroesPage from './components/SuperHeroes.page'
import RQSuperHeroesPage from './components/RQSuperHeroes.page'
import RQSuperHeroPage from './components/RQSuperHero.page'
import ParallelQueriesPage from './components/ParallelQueries.page'
import DependantQueriesPage from './components/DependantQueries.page'

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
          <li>
            <Link to="/parallel-queries">Parallel Queries</Link>
          </li>
          <li>
            <Link to="/dependant-queries">Dependant Queries</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/super-heroes" element={<SuperHeroesPage />} />
        <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
        <Route path="/rq-super-hero/:heroId" element={<RQSuperHeroPage />} />
        <Route path="/parallel-queries" element={<ParallelQueriesPage />} />
        <Route path="/dependant-queries" element={<DependantQueriesPage email="vishwas@example.com" />} />
      </Routes>
    </div>
  );
}

export default App
