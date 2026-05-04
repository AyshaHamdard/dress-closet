import { useState } from 'react';
import type { Product } from '../types';

interface Props {
  product: Product | null;
  onSave: (data: Partial<Product>) => void;
  onCancel: () => void;
}

export default function ProductForm({ product, onSave, onCancel }: Props) {
  const [name, setName] = useState(product?.name ?? '');
  const [brand, setBrand] = useState(product?.brand ?? '');
  const [color, setColor] = useState(product?.color ?? '');
  const [size, setSize] = useState(product?.size ?? '');
  const [price, setPrice] = useState(product?.price ?? '');
  const [description, setDescription] = useState(product?.description ?? '');

  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // basic validation
    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    onSave({
      name,
      brand,
      color,
      size,
      price: Number(price),
      description,
    });
  }

  return (
    <div>
      <h2>{product ? 'Edit Dress' : 'Add New Dress'}</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} style={{ maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 10 }}>

        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Brand
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </label>

        <label>
          Color
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>

        <label>
          Size
          <input
            type="text"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </label>

        <label>
          Price
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button className="primary" type="submit">
            {product ? 'Save Changes' : 'Add Dress'}
          </button>

          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}