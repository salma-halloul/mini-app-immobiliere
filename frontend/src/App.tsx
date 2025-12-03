import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import ItemList from './pages/ItemList';
import ItemDetail from './pages/ItemDetail';
import ItemEdit from './pages/ItemEdit';

function App() {
  return (
    <BrowserRouter>
      <>
        <header className="app-header">
          <div className="header-content">
            <Link to="/" className="app-logo">
              <span className="logo-icon">🏠</span>
              <h1 className="app-title">Immobilier Moderne</h1>
            </Link>
            <nav className="header-nav">
              <Link to="/" className="btn btn-secondary btn-sm">
                🏘️ Tous les biens
              </Link>
              <Link to="/create" className="btn btn-primary btn-sm">
                ➕ Nouveau bien
              </Link>
            </nav>
          </div>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/items/:id" element={<ItemDetail />} />
            <Route path="/edit/:id" element={<ItemEdit />} />
            <Route path="/create" element={<ItemEdit />} />
          </Routes>
        </main>
      </>
    </BrowserRouter>
  )
}

export default App
