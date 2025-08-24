import React from 'react';

// Props para el componente
type CoverageSelectionStepProps = {
  data: {
    planType: string;
    medicalCoverage: boolean;
    luggageCoverage: boolean;
    tripCancellation: boolean;
    extremeSports: boolean;
    covid19Coverage: boolean;
  };
  updateData: (data: Partial<CoverageSelectionStepProps['data']>) => void;
  nextStep: () => void;
  prevStep: () => void;
};

const CoverageSelectionStep: React.FC<CoverageSelectionStepProps> = ({ data, updateData, nextStep, prevStep }) => {
  // Esta función se llamará cuando se envíe el formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Selección de Coberturas</h2>
      <p className="text-gray-600 mb-6">
        Selecciona las coberturas que deseas incluir en tu seguro de viaje.
      </p>
      
      {/* Aquí irá el formulario con las opciones de cobertura */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Componente vacío por ahora - se implementará en el futuro */}
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <p className="text-gray-500">Componente de Selección de Coberturas - En construcción</p>
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

export default CoverageSelectionStep;
