import React, { useEffect, useState, useMemo } from 'react';
import ItemCard from '../components/ItemCard';
import { getItems, deleteItem } from '../services/itemService';
import type { Item } from '../types/item';
import { useNavigate } from 'react-router-dom';

type SortOrder = 'none' | 'price-asc' | 'price-desc';

const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('none');
  const navigate = useNavigate();

  useEffect(() => {
    getItems()
      .then(setItems)
      .catch(() => setError('Erreur de chargement'))
      .finally(() => setLoading(false));
  }, []);

  const filteredAndSortedItems = useMemo(() => {
    let result = [...items];

    // Filtrage par recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.city.toLowerCase().includes(query)
      );
    }

    // Tri par prix
    if (sortOrder === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [items, searchQuery, sortOrder]);

  const handleView = (id: string) => navigate(`/items/${id}`);
  const handleEdit = (id: string) => navigate(`/edit/${id}`);
  
  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      setItems(items.filter(item => item.id !== id));
    } catch (err) {
      setError('Erreur lors de la suppression');
      setTimeout(() => setError(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <span>❌ {error}</span>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🏠</div>
        <h2 className="empty-state-title">Aucun bien pour le moment</h2>
        <p className="empty-state-description">
          Commencez par ajouter votre premier bien immobilier
        </p>
        <button 
          className="btn btn-primary btn-lg"
          onClick={() => navigate('/create')}
        >
          ➕ Ajouter un bien
        </button>
      </div>
    );
  }

  return (
    <div className="item-list-container">
      <div className="page-header">
        <h2 className="page-title">Nos Biens Immobiliers</h2>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
          {filteredAndSortedItems.length} bien{filteredAndSortedItems.length > 1 ? 's' : ''} disponible{filteredAndSortedItems.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="filters-container">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher par titre ou ville..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Effacer la recherche"
            >
              ✕
            </button>
          )}
        </div>

        <div className="sort-box">
          <span className="sort-label">📊 Trier par prix</span>
          <select
            className="sort-select-modern"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
          >
            <option value="none">Par défaut</option>
            <option value="price-asc">Prix croissant ↑</option>
            <option value="price-desc">Prix décroissant ↓</option>
          </select>
        </div>
      </div>

      {/* Résultats */}
      {filteredAndSortedItems.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h3 className="no-results-title">Aucun résultat trouvé</h3>
          <p className="no-results-description">
            Essayez avec d'autres termes de recherche
          </p>
          <button 
            className="btn btn-secondary"
            onClick={() => {
              setSearchQuery('');
              setSortOrder('none');
            }}
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="items-grid">
          {filteredAndSortedItems.map(item => (
            <ItemCard key={item.id} item={item} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemList;
