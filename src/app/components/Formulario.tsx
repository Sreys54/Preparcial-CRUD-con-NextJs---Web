'use client';

import { useState, useEffect } from 'react';

type Author = {
  id?: number;
  name: string;
  birthDate: string;
  description: string;
  image: string;
};

interface FormularioProps {
  author?: Author;
  isEditing?: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function MyForm({ author, isEditing = false, onSuccess, onCancel }: FormularioProps) {
  // Estados individuales para cada campo
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');

  // Efecto para cargar los datos del autor cuando se está editando
  useEffect(() => {
    if (isEditing && author) {
      setName(author.name);
      setBirthDate(author.birthDate);
      setDescription(author.description);
      setImage(author.image);
    }
  }, [isEditing, author]);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log(name, birthDate, description, image);
    
    try {
      const url = isEditing && author?.id 
        ? `http://127.0.0.1:8080/api/authors/${author.id}`
        : 'http://127.0.0.1:8080/api/authors';
        
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          birthDate,
          description,
          image
        })
      });
      
      if (response.ok) {
        const resultAuthor = await response.json();
        console.log(isEditing ? 'Autor actualizado:' : 'Autor creado:', resultAuthor);
        setMessage(isEditing ? '¡Autor actualizado con éxito!' : '¡Autor creado con éxito!');
        
        // Limpiar el formulario si no estamos editando
        if (!isEditing) {
          setName('');
          setBirthDate('');
          setDescription('');
          setImage('');
        }
        
        // Llamar callback de éxito si existe
        if (onSuccess) {
          onSuccess();
        }
        
      } else {
        const errorData = await response.json();
        setMessage(`Error al ${isEditing ? 'actualizar' : 'crear'} el autor: ${errorData.message || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error de conexión. Verifica que el servidor esté funcionando.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre:</label>
        <input 
          type="text" 
          id="name"
          name="name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white border border-gray-300 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          required
        />
      </div>
      
      <div>
        <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento:</label>
        <input 
          type="date" 
          id="birthDate"
          name="birthDate" 
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="bg-white border border-gray-300 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          required
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descripción:</label>
        <textarea 
          id="description"
          name="description" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-white border border-gray-300 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-vertical text-black"
          required
        />
      </div>
      
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">URL de Imagen:</label>
        <input 
          type="url" 
          id="image"
          name="image" 
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="bg-white border border-gray-300 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          required
        />
      </div>
      
      <div className="flex gap-4">
        <button 
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-1 transition-colors"
        >
          {isEditing ? 'Actualizar Autor' : 'Crear Autor'}
        </button>
        
        {isEditing && onCancel && (
          <button 
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex-1 transition-colors"
          >
            Cancelar
          </button>
        )}
      </div>
      
      {message && <p>{message}</p>}
    </form>
  );
}