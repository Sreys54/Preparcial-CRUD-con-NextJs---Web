// src/app/crear/page.tsx
import Formulario from '../components/Formulario';

export default function CreateAuthorPage() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">Crear Autor</h1>
      <p className="mt-4">Completa el formulario para crear un nuevo autor.</p>
      
      <div className="mt-8">
        <Formulario />
      </div>
    </main>
  );
}