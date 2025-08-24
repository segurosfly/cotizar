import React from 'react';

// Props para el componente
type PersonalInfoStepProps = {
  data: {
    name: string;
    email: string;
    phone: string;
    age: number;
    country: string;
  };
  updateData: (data: Partial<PersonalInfoStepProps['data']>) => void;
  nextStep: () => void;
};

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ nextStep }) => {
  // Esta función se llamará cuando se envíe el formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Información Personal</h2>
      <p className="text-gray-600 mb-6">
        Por favor, proporciona tus datos personales para continuar con la cotización.
      </p>
      
      {/* Aquí irá el formulario con los campos de información personal */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Componente vacío por ahora - se implementará en el futuro */}
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <p className="text-gray-500">Componente de Información Personal - En construcción</p>
        </div>
        
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoStep;
