// src/components/Card.tsx
import React from 'react';
import Image from 'next/image';


interface CardProps {
  name: string;
  birthDate: string;
  description: string;
  image: string;
}


const Card = ({name, birthDate, description, image }: CardProps) => {
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
      </div>
    </div>
  );
};

export default Card;