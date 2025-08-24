import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Esta función es requerida cuando se usa output: 'export' en next.config.ts
// Le dice a Next.js qué rutas dinámicas pre-renderizar durante la compilación
export function generateStaticParams() {
  return [
    { id: '223a10f5-6d87-4f49-b0de-ba73e097c1c4' },
    // Puedes añadir más IDs si necesitas pre-renderizar más páginas
  ];
}

// Tipo para los parámetros de la página
type QuotationPageProps = {
  params: {
    id: string;
  };
};

// Datos falsos para simular una cotización
const getFakeQuotationData = (id: string) => {
  return {
    id,
    planName: 'Plan Premium Internacional',
    price: 89.99,
    coverageAmount: 50000,
    startDate: '2025-06-15',
    endDate: '2025-06-30',
    destination: 'Europa',
    coverages: [
      { name: 'Asistencia médica', included: true },
      { name: 'Pérdida de equipaje', included: true },
      { name: 'Cancelación de viaje', included: true },
      { name: 'Deportes extremos', included: false },
      { name: 'COVID-19', included: true },
    ],
    travelerInfo: {
      name: 'Juan Pérez',
      age: 35,
      email: 'juan.perez@example.com',
      phone: '+1234567890',
    },
  };
};

export default function QuotationPage({ params }: QuotationPageProps) {
  const { id } = params;
  const quotation = getFakeQuotationData(id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Encabezado */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Cotización #{id.substring(0, 8)}</h1>
              <p className="text-sm opacity-80">Creada el {new Date().toLocaleDateString()}</p>
            </div>
            <div className="flex items-center">
              <div className="h-10 w-16 flex items-center justify-center mr-2">
                <Image src="/vsi-logo.png" alt="VSI Logo" width={40} height={40} />
              </div>
              <span className="font-bold text-xl">VSI</span>
            </div>
          </div>
        </div>

        {/* Detalles principales */}
        <div className="p-6 border-b">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Detalles del Plan</h2>
              <div className="space-y-2">
                <p className="text-gray-700"><span className="font-medium">Plan:</span> {quotation.planName}</p>
                <p className="text-gray-700"><span className="font-medium">Precio:</span> ${quotation.price} USD</p>
                <p className="text-gray-700"><span className="font-medium">Cobertura:</span> ${quotation.coverageAmount} USD</p>
                <p className="text-gray-700"><span className="font-medium">Destino:</span> {quotation.destination}</p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Fechas de Viaje</h2>
              <div className="space-y-2">
                <p className="text-gray-700"><span className="font-medium">Desde:</span> {quotation.startDate}</p>
                <p className="text-gray-700"><span className="font-medium">Hasta:</span> {quotation.endDate}</p>
                <p className="text-gray-700"><span className="font-medium">Duración:</span> 15 días</p>
              </div>
            </div>
          </div>
        </div>

        {/* Coberturas */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Coberturas Incluidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {quotation.coverages.map((coverage, index) => (
              <div key={index} className="flex items-center">
                <span className={`inline-block w-5 h-5 rounded-full mr-2 ${coverage.included ? 'bg-green-500' : 'bg-red-500'}`}>
                  {coverage.included ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </span>
                <span className="text-gray-700">{coverage.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Información del viajero */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Información del Viajero</h2>
          <div className="space-y-2">
            <p className="text-gray-700"><span className="font-medium">Nombre:</span> {quotation.travelerInfo.name}</p>
            <p className="text-gray-700"><span className="font-medium">Edad:</span> {quotation.travelerInfo.age} años</p>
            <p className="text-gray-700"><span className="font-medium">Email:</span> {quotation.travelerInfo.email}</p>
            <p className="text-gray-700"><span className="font-medium">Teléfono:</span> {quotation.travelerInfo.phone}</p>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="p-6 bg-gray-50 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/price" className="text-white px-6 py-3 rounded-md font-medium hover:opacity-90 transition-colors text-center" style={{ backgroundColor: '#0A9CD9' }}>
            Volver a Precios
          </Link>
          <button className="border border-purple-600 text-purple-600 px-6 py-3 rounded-md font-medium hover:bg-purple-50 transition-colors">
            Descargar PDF
          </button>
          <button className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition-colors">
            Comprar Ahora
          </button>
        </div>
      </div>
      
      {/* Wizard de Cotización */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Cotizador de Seguro</h2>
        <p className="text-gray-600 mb-6">
          Completa los siguientes pasos para personalizar tu cotización.
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
  );
}
