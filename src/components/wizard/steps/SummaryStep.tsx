import React from 'react';
import { WizardData } from '../Wizard';

// Props para el componente
type SummaryStepProps = {
  data: WizardData;
  updateData: (data: Partial<WizardData['summary']>) => void;
  prevStep: () => void;
  submitForm: () => void;
};

const SummaryStep: React.FC<SummaryStepProps> = ({ data, updateData, prevStep, submitForm }) => {
  // Esta función se llamará cuando se envíe el formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Resumen de Cotización</h2>
      <p className="text-gray-600 mb-6">
        Revisa los detalles de tu cotización antes de confirmar.
      </p>
      
      {/* Aquí irá el resumen de la cotización */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Componente vacío por ahora - se implementará en el futuro */}
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <p className="text-gray-500">Componente de Resumen - En construcción</p>
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
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Confirmar Cotización
          </button>
        </div>
      </form>
    </div>
  );
};

export default SummaryStep;
