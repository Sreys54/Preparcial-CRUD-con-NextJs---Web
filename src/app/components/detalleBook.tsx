// src/components/Card.tsx
import React from 'react';
import Image from 'next/image';


type Review = {
  id: number;
  name: string;
  source: string;
  description: string;
  book?: unknown;
};

interface CardProps {
    id: number;
  titulo: string;
  isbn: string;
  fechaPublicacion: string;
  description: string;
  image: string;
  reviews: Review[];
}


const Card = ({id, titulo, isbn, fechaPublicacion, description, image, reviews }: CardProps) => {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden max-w-2xl">
      <Image
        src={image}
        alt={`Imagen para ${titulo}`}
        width={600}
        height={300}
        className="rounded-t-xl object-cover w-full h-80"
      />
      <div className="p-6">
        <div className="mb-4">
          <span className="text-sm text-gray-500">ID: {id}</span>
        </div>
        <h2 className="text-3xl font-bold mb-3">{titulo}</h2>
        <div className="space-y-2 mb-4">
          <p className="text-gray-700"><strong>Fecha de Publicación:</strong> {fechaPublicacion}</p>
          <p className="text-gray-700"><strong>ISBN:</strong> {isbn}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Descripción:</h3>
          <p className="text-gray-800 leading-relaxed">{description}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Reviews:</h3>
          {reviews && reviews.length > 0 ? (
            <div className="space-y-3">
              {reviews.map((review) => (
                <div key={review.id} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{review.name}</h4>
                    <span className="text-sm text-gray-500">{review.source}</span>
                  </div>
                  <p className="text-gray-700 text-sm">{review.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No hay reviews disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;