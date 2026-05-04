import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import ProductForm from '../components/ProductForm';

interface Props {
  user: User | null;
}

type Dress = {
  id: number;
  name: string;
  color: string;
  size: string;
  price: number;
  brand: string;
  description: string;
};

export default function ProductListView({ user }: Props) {
  const [products, setProducts] = useState<Dress[]>([]);
  const [editing, setEditing] = useState<Dress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from('dresses')
      .select('*')
      .order('id', { ascending: false });

    if (error) setError(error.message);
    else setProducts(data ?? []);

    setLoading(false);
  }

  async function handleAdd(data: Partial<Dress>) {
    if (!user) return;

    const { error } = await supabase
      .from('dresses')
      .insert([{ ...data, user_id: user.id }]);

    if (error) {
      alert(error.message);
      return;
    }

    setShowForm(false);
    fetchProducts();
  }

  async function handleEdit(data: Partial<Dress>) {
    if (!editing) return;

    const { error } = await supabase
      .from('dresses')
      .update(data)
      .eq('id', editing.id);

    if (error) {
      alert(error.message);
      return;
    }

    setEditing(null);
    fetchProducts();
  }

  async function handleDelete(id: number) {
    if (!window.confirm('Delete this item? This cannot be undone.')) return;

    const { error } = await supabase
      .from('dresses')
      .delete()
      .eq('id', id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchProducts();
  }

  if (loading) return <p>Loading dresses...</p>;
  if (error) return <p className="error">Failed to load: {error}</p>;

  if (showForm || editing) {
    return (
      <ProductForm
        product={editing}
        onSave={editing ? handleEdit : handleAdd}
        onCancel={() => {
          setShowForm(false);
          setEditing(null);
        }}
      />
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <h1 style={{ flex: 1 }}>Dress Closet</h1>

        {user && (
          <button className="primary" onClick={() => setShowForm(true)}>
            + Add New
          </button>
        )}
      </div>

      {products.length === 0 ? (
        <p style={{ color: 'var(--muted)' }}>
          No dresses yet. {user ? 'Click Add New to create one.' : 'Sign in to add dresses.'}
        </p>
      ) : (
        products.map((p) => (
          <div key={p.id} className="card">
            <h3>{p.name}</h3>
            <p>Brand: {p.brand}</p>
            <p>Color: {p.color}</p>
            <p>Size: {p.size}</p>
            <p>Price: ${p.price}</p>
            <p>{p.description}</p>

            <p>Item #{p.id}</p>

            {user && (
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button onClick={() => setEditing(p)}>Edit</button>
                <button className="danger" onClick={() => handleDelete(p.id)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}