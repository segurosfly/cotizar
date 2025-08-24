import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Wizard from '@/components/wizard/Wizard';

// ID de ejemplo para la demostración
const EXAMPLE_QUOTATION_ID = '223a10f5-6d87-4f49-b0de-ba73e097c1c4';

export default function QuotationIndexPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Cotizaciones de <span className="text-purple-600">Seguros de Viaje</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Accede a tus cotizaciones guardadas o crea una nueva para obtener el mejor seguro de viaje.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Acceder a una Cotización Existente</h2>
          <p className="text-gray-600 mb-6">
            Si ya tienes un código de cotización, puedes acceder directamente a ella utilizando el enlace de abajo:
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href={`/price/quotation/${EXAMPLE_QUOTATION_ID}`} 
              className="bg-purple-600 text-white px-6 py-3 rounded-md font-medium hover:bg-purple-700 transition-colors text-center"
            >
              Ver Cotización de Ejemplo
            </Link>
            <Link 
              href="/price" 
              className="border px-6 py-3 rounded-md font-medium hover:opacity-90 transition-colors text-center"
              style={{ borderColor: '#0A9CD9', color: '#0A9CD9' }}
            >
              Volver a Precios
            </Link>
          </div>
        </div>

        {/* Wizard de Cotización */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Crear una Nueva Cotización</h2>
          <p className="text-gray-600 mb-6">
            Completa los siguientes pasos para obtener una cotización personalizada según tus necesidades de viaje.
          </p>
          
          {/* Wizard temporal mientras se implementa el componente completo */}
          <div className="border-2 border-gray-200 rounded-lg p-6">
            <div className="mb-8">
              <div className="flex justify-between">
                {['Información Personal', 'Detalles del Viaje', 'Coberturas', 'Resumen'].map((step, index) => (
                  <div 
                    key={index} 
                    className={`flex flex-col items-center ${index === 0 ? 'text-purple-600' : 'text-gray-400'}`}
                  >
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        index === 0 ? 'border-2 border-purple-600 text-purple-600' : 
                        'border-2 border-gray-300 text-gray-400'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span className="text-sm hidden md:block">{step}</span>
                  </div>
                ))}
              </div>
              <div className="relative mt-2">
                <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full rounded"></div>
                <div 
                  className="absolute top-0 left-0 h-1 bg-purple-600 rounded transition-all duration-300" 
                  style={{ width: '25%' }}
                ></div>
              </div>
            </div>
            
            {/* Paso 1: Información Personal */}
            <div className="p-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Información Personal</h2>
              <p className="text-gray-600 mb-6">
                Por favor, proporciona tus datos personales para continuar con la cotización.
              </p>
              
              <div className="bg-gray-100 p-6 rounded-lg text-center">
                <p className="text-gray-500">Componente de Información Personal - En construcción</p>
              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
