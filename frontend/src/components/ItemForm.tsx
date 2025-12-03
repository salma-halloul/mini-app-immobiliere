import React, { useState } from 'react';
import type { Item } from '../types/item';

interface ItemFormProps {
  initial?: Partial<Item>;
  onSubmit: (item: Omit<Item, 'id'>) => void;
  error?: string;
}

const ItemForm: React.FC<ItemFormProps> = ({ initial = {}, onSubmit, error }) => {
  const [form, setForm] = useState<Omit<Item, 'id'>>({
    image: initial.image || '',
    title: initial.title || '',
    city: initial.city || '',
    price: initial.price || 0,
    surface: initial.surface || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === 'price' || name === 'surface' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="image" className="form-label">🖼️ URL de l'image</label>
        <input
          id="image"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="https://exemple.com/image.jpg"
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="title" className="form-label">🏠 Titre du bien</label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Belle maison avec jardin"
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="city" className="form-label">📍 Ville</label>
        <input
          id="city"
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="Paris"
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="price" className="form-label">💰 Prix (€)</label>
        <input
          id="price"
          name="price"
          type="number"
          min="0"
          step="1000"
          value={form.price}
          onChange={handleChange}
          placeholder="250000"
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="surface" className="form-label">📐 Surface (m²)</label>
        <input
          id="surface"
          name="surface"
          type="number"
          min="0"
          step="1"
          value={form.surface}
          onChange={handleChange}
          placeholder="85"
          className="form-input"
          required
        />
      </div>

      {error && (
        <div className="form-error">
          ❌ {error}
        </div>
      )}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary btn-lg">
          ✅ Enregistrer
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-lg"
          onClick={() => window.history.back()}
        >
          ❌ Annuler
        </button>
      </div>
    </form>
  );
};

export default ItemForm;
