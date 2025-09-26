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
    <main className="p-8">
      <div className="mb-4">
        <Link href="/libros">
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            ← Volver a la lista
          </button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6">Detalle del Libro</h1>
      <div className="flex justify-center">
        <DetalleBook {...libro} />
      </div>
    </main>
  );
}   