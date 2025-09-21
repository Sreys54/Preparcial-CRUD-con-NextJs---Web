'use client';

import { useState } from 'react';

export default function MyForm() {
  // Estados individuales para cada campo
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log(name, birthDate, description, image);
    
    try {
      // Envío al backend real
      const response = await fetch('http://127.0.0.1:8080/api/authors', {
        method: 'POST',
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
        const newAuthor = await response.json();
        console.log('Autor creado:', newAuthor);
        setMessage('¡Autor creado con éxito!');
        
        // Limpiar el formulario
        setName('');
        setBirthDate('');
        setDescription('');
        setImage('');
        
      } else {
        const errorData = await response.json();
        setMessage(`Error al crear el autor: ${errorData.message || 'Error desconocido'}`);
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
      
      <button 
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-6 transition-colors"
      >
        Crear Autor
      </button>
      
      {message && <p>{message}</p>}
    </form>
  );
}