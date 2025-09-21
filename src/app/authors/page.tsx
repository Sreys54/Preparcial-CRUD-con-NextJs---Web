'use client';

import { useState, useEffect } from 'react';
import Card from '../components/Card';


type Author = {
  id: number;
  name: string;
  birthDate: string;
  description: string;
  image: string;
};

export default function HomePage() {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('http://127.0.0.1:8080/api/authors');
        if (!res.ok) throw new Error('Error en la API');
        const result = await res.json();
        setAuthors(result);
      } catch (error) {
        console.error('Error fetching authors:', error);
      } 
    }
    fetchData();
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Lista de Autores</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {authors.length > 0 ? (
        authors.map((author) => <Card key={author.id} {...author} />)
      ) : (
        <p>No se encontraron autores.</p>
      )}
    </div>
    </main>
  );
}