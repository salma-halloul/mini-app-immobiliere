import React, { useEffect, useState } from 'react';
import { getItem } from '../services/itemService';
import type { Item } from '../types/item';
import { useParams, useNavigate, Link } from 'react-router-dom';

const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      setLoading(true);
      getItem(id)
        .then(setItem)
        .catch(() => setError('Bien non trouvé'))
        .finally(() => setLoading(false));
    }
  }, [id]);

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
        <Link to="/" className="btn btn-primary">
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="error">
        <span>Bien non trouvé</span>
        <Link to="/" className="btn btn-primary">
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="item-detail-container">
      <div className="detail-card">
        <div className="detail-image-container">
          <img src={item.image} alt={item.title} className="detail-image" />
        </div>
        <div className="detail-content">
          <h2 className="detail-title">{item.title}</h2>
          
          <div className="detail-info-grid">
            <div className="detail-info-item">
              <span className="detail-info-label">📍 Ville</span>
              <span className="detail-info-value">{item.city}</span>
            </div>
            <div className="detail-info-item">
              <span className="detail-info-label">💰 Prix</span>
              <span className="detail-info-value price">
                {item.price.toLocaleString('fr-FR')} €
              </span>
            </div>
            <div className="detail-info-item">
              <span className="detail-info-label">📐 Surface</span>
              <span className="detail-info-value">{item.surface} m²</span>
            </div>
            <div className="detail-info-item">
              <span className="detail-info-label">💵 Prix au m²</span>
              <span className="detail-info-value">
                {Math.round(item.price / item.surface).toLocaleString('fr-FR')} €
              </span>
            </div>
          </div>
          
          <div className="detail-actions">
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => navigate(`/edit/${item.id}`)}
            >
              ✏️ Modifier ce bien
            </button>
            <Link to="/" className="btn btn-secondary btn-lg">
              ← Retour à la liste
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
