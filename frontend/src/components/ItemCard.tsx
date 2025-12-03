import React from 'react';
import type { Item } from '../types/item';

interface ItemCardProps {
  item: Item;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onView, onEdit, onDelete }) => (
  <div className="item-card">
    <div className="item-image-container">
      <img src={item.image} alt={item.title} className="item-image" />
      <div className="item-badge">
        {item.surface} m²
      </div>
    </div>
    <div className="item-content">
      <h3 className="item-title">{item.title}</h3>
      <div className="item-info">
        <div className="item-info-row">
          <span className="info-icon">📍</span>
          <span>{item.city}</span>
        </div>
        <div className="item-info-row">
          <span className="info-icon">📐</span>
          <span>{item.surface} m²</span>
        </div>
      </div>
      <div className="item-price">
        {item.price.toLocaleString('fr-FR')} €
      </div>
      <div className="item-actions">
        <div className="item-actions-top">
          <button className="btn btn-secondary btn-sm" onClick={() => onEdit(item.id)}>
            ✏️ Modifier
          </button>
          <button 
            className="btn btn-danger btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${item.title}" ?`)) {
                onDelete(item.id);
              }
            }}
            title="Supprimer ce bien"
          >
            🗑️ Supprimer
          </button>
        </div>
        <button className="btn btn-primary btn-sm btn-full" onClick={() => onView(item.id)}>
          👁️ Voir détails
        </button>
      </div>
    </div>
  </div>
);

export default ItemCard;
