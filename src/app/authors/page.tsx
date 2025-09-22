'use client';

import { useState, useEffect } from 'react';
import Card from '../components/Card';
import Formulario from '../components/Formulario';

type Author = {
  id: number;
  name: string;
  birthDate: string;
  description: string;
  image: string;
};

export default function HomePage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleEditAuthor = (author: Author) => {
    setSelectedAuthor(author);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setSelectedAuthor(null);
    setIsEditing(false);
  };

  const handleUpdateSuccess = () => {
    setSelectedAuthor(null);
    setIsEditing(false);
    fetchData(); // Recargar la lista de autores
  };

  const handleDeleteAuthor = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        console.log('Autor eliminado con éxito');
        fetchData(); // Recargar la lista de autores
      } else {
        const errorData = await response.json();
        console.error(`Error al eliminar el autor: ${errorData.message || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión. Verifica que el servidor esté funcionando.');
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Lista de Autores</h1>
      
      {isEditing && selectedAuthor ? (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Editar Autor</h2>
          <Formulario 
            author={selectedAuthor}
            isEditing={true}
            onSuccess={handleUpdateSuccess}
            onCancel={handleCancelEdit}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {authors.length > 0 ? (
            authors.map((author) => (
              <Card 
                key={author.id} 
                {...author} 
                onEdit={() => handleEditAuthor(author)}
                onDelete={handleDeleteAuthor}
              />
            ))
          ) : (
            <p>No se encontraron autores.</p>
          )}
        </div>
      )}
    </main>
  );
}