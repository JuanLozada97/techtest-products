import React, { useEffect, useMemo, useState } from "react";
import './index.css'; // Tailwind entry

// Simple React CRUD app for Products with Tailwind CSS
// Works against your API endpoints at VITE_API_BASE (default: http://localhost:5132)

type Product = {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  createdAt: string;
};

export default function ProductsApp() {
  const baseUrl = useMemo(
    () => (import.meta as any)?.env?.VITE_API_BASE ?? "http://localhost:5132",
    []
  );
  const api = useMemo(() => `${baseUrl.replace(/\/$/, "")}/api/products`, [baseUrl]);

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const resetForm = () => {
    setEditing(null);
    setName("");
    setDescription("");
    setPrice("");
  };

  const openCreate = () => {
    resetForm();
    setIsOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setName(p.name);
    setDescription(p.description ?? "");
    setPrice(String(p.price));
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    resetForm();
  };

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(api);
      if (!res.ok) throw new Error(`GET failed: ${res.status}`);
      const data = (await res.json()) as Product[];
      setProducts(data);
    } catch (e: any) {
      setError(e?.message ?? "Error loading products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function saveProduct(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const body = {
      name: name.trim(),
      description: description.trim() || null,
      price: parseFloat(price),
    };

    if (!body.name || isNaN(body.price)) {
      setError("Nombre y precio válidos son requeridos");
      return;
    }

    try {
      const method = editing ? "PUT" : "POST";
      const url = editing ? `${api}/${editing.id}` : api;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`${method} failed: ${res.status}`);
      closeModal();
      await load();
    } catch (e: any) {
      setError(e?.message ?? "Error saving product");
    }
  }

  async function deleteProduct(p: Product) {
    if (!confirm(`Eliminar \"${p.name}\"?`)) return;
    setError(null);
    try {
      const res = await fetch(`${api}/${p.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`DELETE failed: ${res.status}`);
      await load();
    } catch (e: any) {
      setError(e?.message ?? "Error deleting product");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="text-sm text-gray-600">Base URL: <code>{api}</code></p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={load}
              className="px-3 py-2 rounded-xl border shadow-sm hover:shadow bg-white"
              disabled={loading}
            >
              {loading ? "Cargando…" : "Refrescar"}
            </button>
            <button
              onClick={openCreate}
              className="px-3 py-2 rounded-xl border shadow-sm hover:shadow bg-black text-white"
            >
              Nuevo
            </button>
          </div>
        </header>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-red-800">
            {error}
          </div>
        )}

        <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="text-left px-4 py-2">ID</th>
                <th className="text-left px-4 py-2">Nombre</th>
                <th className="text-left px-4 py-2">Descripción</th>
                <th className="text-left px-4 py-2">Precio</th>
                <th className="text-left px-4 py-2">Creado</th>
                <th className="text-right px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-500" colSpan={6}>
                    {loading ? "Cargando…" : "Sin productos"}
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="px-4 py-2">{p.id}</td>
                    <td className="px-4 py-2 font-medium">{p.name}</td>
                    <td className="px-4 py-2 text-gray-700">{p.description ?? "—"}</td>
                    <td className="px-4 py-2">${p.price.toFixed(2)}</td>
                    <td className="px-4 py-2 text-gray-600">
                      {new Date(p.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => deleteProduct(p)}
                          className="px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50 text-red-600"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {isOpen && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
              <div className="flex items-center justify-between px-5 py-4 border-b">
                <h2 className="text-lg font-semibold">
                  {editing ? "Editar producto" : "Nuevo producto"}
                </h2>
                <button onClick={closeModal} className="text-gray-500 hover:text-black">✕</button>
              </div>

              <form onSubmit={saveProduct} className="p-5 space-y-3">
                <div>
                  <label className="block text-sm mb-1">Nombre</label>
                  <input
                    className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre del producto"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Descripción</label>
                  <textarea
                    className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descripción (opcional)"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Precio</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={closeModal} className="px-4 py-2 rounded-xl border bg-white">
                    Cancelar
                  </button>
                  <button type="submit" className="px-4 py-2 rounded-xl border bg-black text-white">
                    {editing ? "Guardar" : "Crear"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
