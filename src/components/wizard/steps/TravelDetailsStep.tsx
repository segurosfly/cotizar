import React from 'react';

// Props para el componente
type TravelDetailsStepProps = {
  data: {
    destination: string;
    startDate: string;
    endDate: string;
    travelers: number;
    purpose: string;
  };
  updateData: (data: Partial<TravelDetailsStepProps['data']>) => void;
  nextStep: () => void;
  prevStep: () => void;
};

const TravelDetailsStep: React.FC<TravelDetailsStepProps> = ({ nextStep, prevStep }) => {
  // Esta función se llamará cuando se envíe el formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Detalles del Viaje</h2>
      <p className="text-gray-600 mb-6">
        Proporciona los detalles de tu viaje para personalizar tu cotización.
      </p>
      
      {/* Aquí irá el formulario con los campos de detalles del viaje */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Componente vacío por ahora - se implementará en el futuro */}
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <p className="text-gray-500">Componente de Detalles del Viaje - En construcción</p>
        </div>
        
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={prevStep}
            className="border border-purple-600 text-purple-600 px-6 py-2 rounded-md hover:bg-purple-50 transition-colors"
          >
            Anterior
          </button>
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

export default TravelDetailsStep;
