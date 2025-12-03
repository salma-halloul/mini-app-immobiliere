import React, { useEffect, useState } from 'react';
import ItemForm from '../components/ItemForm';
import { createItem, getItem, updateItem } from '../services/itemService';
import type { Item } from '../types/item';
import { useNavigate, useParams, Link } from 'react-router-dom';

const ItemEdit: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [initial, setInitial] = useState<Partial<Item>>({});
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      getItem(id)
        .then(setInitial)
        .catch(() => setError('Bien non trouvé'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (item: Omit<Item, 'id'>) => {
    setError(''); // Réinitialiser l'erreur avant la soumission
    try {
      if (id) {
        await updateItem(id, item);
      } else {
        await createItem(item);
      }
      // Si on arrive ici, c'est que tout s'est bien passé
      navigate('/');
    } catch (e) {
      console.error('Erreur lors de l\'enregistrement:', e);
      setError('Erreur lors de l\'enregistrement');
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="item-edit-container">
      <div className="form-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <h2 className="form-title" style={{ margin: 0 }}>
            {id ? '✏️ Modifier un bien' : '➕ Créer un nouveau bien'}
          </h2>
          <Link to="/" className="btn btn-secondary btn-sm">
            ← Retour
          </Link>
        </div>
        <ItemForm initial={initial} onSubmit={handleSubmit} error={error} />
      </div>
    </div>
  );
};

export default ItemEdit;
