// src/components/Card.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


interface CardProps {
    id: number;
  titulo: string;
  fechaPublicacion: string;
  description: string;
  image: string;
}


const Card = ({id, titulo, fechaPublicacion, description, image }: CardProps) => {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden max-w-sm">
      {}
      <Image
        src={image}
        alt={`Imagen para ${titulo}`}
        width={300} // Usamos dimensiones genéricas para el layout
        height={100}
        className="rounded-t-xl object-cover w-full h-60"
      />
      <div className="p-4">
       <h2 className="text-xl font-bold text-white">{titulo}</h2>
        <p className="text-white text-sm font-medium">{fechaPublicacion}</p>
        <p className="text-white text-sm mt-2 leading-relaxed">{description}</p>
        <div className="mt-4">
          <Link href={`/detalleLibro?id=${id}`}>
            <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md">
              Detalle
            </button>
          </Link>
        </div>
        </div>
    </div>
  );
};

export default Card;