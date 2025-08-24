import React from 'react';
import Wizard from '@/components/wizard/Wizard';

export default function WizardPage() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Cotiza tu <span className="text-purple-600">Seguro de Viaje</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Completa los siguientes pasos para obtener una cotización personalizada para tu próximo viaje.
          </p>
        </div>
        
        <Wizard />
        
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            ¿Necesitas ayuda? Contáctanos al <span className="text-purple-600">+1 (234) 567-8900</span> o por email a <span className="text-purple-600">soporte@vsi.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}
