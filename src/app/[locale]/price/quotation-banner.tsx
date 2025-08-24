import React from 'react';
import Link from 'next/link';

// ID de ejemplo para la demostración
const EXAMPLE_QUOTATION_ID = '223a10f5-6d87-4f49-b0de-ba73e097c1c4';

const QuotationBanner = () => {
  return (
    <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg p-6 my-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">¿Listo para asegurar tu viaje?</h2>
        <p className="text-gray-700 mb-6">
          Accede a nuestra cotización personalizada y obtén el mejor seguro de viaje para tus necesidades.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href={`/price/quotation/${EXAMPLE_QUOTATION_ID}`} 
            className="bg-purple-600 text-white px-6 py-3 rounded-md font-medium hover:bg-purple-700 transition-colors text-center"
          >
            Ver Cotización Ejemplo
          </Link>
          <Link 
            href="/price/quotation" 
            className="border border-purple-600 text-purple-600 px-6 py-3 rounded-md font-medium hover:bg-purple-50 transition-colors text-center"
          >
            Todas las Cotizaciones
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuotationBanner;
