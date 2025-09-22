// src/components/Card.tsx
import React from 'react';
import Image from 'next/image';


interface CardProps {
  id: number;
  name: string;
  birthDate: string;
  description: string;
  image: string;
  onEdit?: () => void;
  onDelete?: (id: number) => void;
}


const Card = ({id, name, birthDate, description, image, onEdit, onDelete }: CardProps) => {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden max-w-sm">
      {}
      <Image
        src={image}
        alt={`Imagen para ${name}`}
        width={300} // Usamos dimensiones genéricas para el layout
        height={100}
        className="rounded-t-xl object-cover w-full h-60"
      />
      <div className="p-4">
       <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-600 text-sm">{birthDate}</p>
        <p className="text-sm mt-2">{description}</p>
        
        {/* Botones de acción */}
        <div className="flex justify-between mt-4 gap-2">
          <button 
            className="flex-1 bg-blue-500 text-white font-medium py-2 px-4 rounded-md text-sm"
            onClick={() => {
              if (onEdit) {
                onEdit();
              } else {
                // Función para actualizar (sin implementar aún)
                console.log('Actualizar autor:', name);
              }
            }}
          >
            Actualizar
          </button>
          
          <button 
            className="flex-1 bg-red-500 text-white font-medium py-2 px-4 rounded-md text-sm"
            onClick={() => {
              if (onDelete) {
                if (window.confirm(`¿Estás seguro de que deseas eliminar al autor "${name}"?`)) {
                  onDelete(id);
                }
              } else {
                // Función para eliminar (sin implementar aún)
                console.log('Eliminar autor:', name);
              }
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;