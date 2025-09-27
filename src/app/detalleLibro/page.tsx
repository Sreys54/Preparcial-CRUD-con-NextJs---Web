'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import DetalleBook from '../components/detalleBook';

type Review = {
  id: number;
  name: string;
  source: string;
  description: string;
  book?: unknown;
};

type LibroDetalle = {
  id: number;
  titulo: string;
  isbn: string;
  fechaPublicacion: string;
  description: string;
  image: string;
  reviews: Review[];
};

export default function DetalleLibroPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [libro, setLibro] = useState<LibroDetalle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewName, setReviewName] = useState('');
  const [reviewSource, setReviewSource] = useState('');
  const [reviewDescription, setReviewDescription] = useState('');

  useEffect(() => {
    if (id) {
      fetchLibroDetalle(id);
    }
  }, [id]);

  async function fetchLibroDetalle(bookId: string) {
    try {
      setLoading(true);
      const res = await fetch(`http://127.0.0.1:8080/api/books/${bookId}`);
      if (!res.ok) throw new Error('Error al obtener el detalle del libro');
      const result = await res.json();
      console.log('API Response:', result); // Para debug
      setLibro(result);
    } catch (error) {
      console.error('Error fetching book detail:', error);
      setError('Error al cargar el detalle del libro');
    } finally {
      setLoading(false);
    }
  }

  async function addReview() {
    if (!id || !reviewName || !reviewSource || !reviewDescription) return;
    
    try {
      const res = await fetch(`http://127.0.0.1:8080/api/books/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: reviewName,
          source: reviewSource,
          description: reviewDescription
        })
      });
      
      if (res.ok) {
        setReviewName('');
        setReviewSource('');
        setReviewDescription('');
        fetchLibroDetalle(id); // Recargar datos
      }
    } catch (error) {
      console.error('Error adding review:', error);
    }
  }

  if (!id) {
    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-6">Error</h1>
        <p>No se proporcionó un ID de libro válido.</p>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-6">Cargando...</h1>
        <p>Obteniendo información del libro...</p>
      </main>
    );
  }

  if (error || !libro) {
    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-6">Error</h1>
        <p>{error || 'No se pudo cargar la información del libro.'}</p>
      </main>
    );
  }

  return (
    <main className="p-8 bg-black min-h-screen">
      <div className="mb-4">
        <Link href="/libros">
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            ← Volver a la lista
          </button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-white">Detalle del Libro</h1>
      <div className="flex justify-center">
        <DetalleBook {...libro} />
      </div>
      
      <div className="mt-8 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4 text-white">Agregar Review</h2>
        <div className="space-y-3">
          <input 
            type="text" 
            placeholder="Nombre" 
            value={reviewName}
            onChange={(e) => setReviewName(e.target.value)}
            className="w-full p-2 border rounded text-black bg-white"
          />
          <input 
            type="text" 
            placeholder="Source" 
            value={reviewSource}
            onChange={(e) => setReviewSource(e.target.value)}
            className="w-full p-2 border rounded text-black bg-white"
          />
          <textarea 
            placeholder="Description" 
            value={reviewDescription}
            onChange={(e) => setReviewDescription(e.target.value)}
            className="w-full p-2 border rounded text-black bg-white"
            rows={3}
          />
          <button 
            onClick={addReview}
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            Agregar Review
          </button>
        </div>
      </div>
    </main>
  );
}   