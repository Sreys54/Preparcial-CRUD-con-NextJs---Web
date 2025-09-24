'use client';

import { useState, useEffect } from 'react';
import CardBook from '../components/CardBook';

type Libro = {
    id: number;
  titulo: string;
  fechaPublicacion: string;
  description: string;
  image: string;
};

export default function ListaLibrosPage() {
    const [libros, setLibros] = useState<Libro[]>([]);
    useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await fetch('http://127.0.0.1:8080/api/books');
      if (!res.ok) throw new Error('Error en la API');
      const result = await res.json();
      setLibros(result);
    } catch (error) {
      console.error('Error fetching books:', error);
    } 
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Lista de Libros</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {libros.length > 0 ? (
            libros.map((libro) => (
              <CardBook
                key={libro.id} 
                {...libro} 
              />
            ))
          ) : (
            <p>No se encontraron libros.</p>
          )}
        </div>
      </main>
  );
}