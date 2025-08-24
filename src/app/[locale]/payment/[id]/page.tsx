'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';

export default function PaymentPage() {
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);
  const [validId, setValidId] = useState(false);
  const [quoterData, setQuoterData] = useState<any>(null);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const validateId = async () => {
      try {
        // Validar que el ID existe y cumple con los requisitos para payment
        const backendApi = process.env.NEXT_PUBLIC_REACT_BACKEND_API || 'http://localhost:3000/external/landing';
        const response = await fetch(`${backendApi}/payment/${id}`);
        
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            setValidId(true);
            setQuoterData(result.data.quoter);
          } else {
            // Si no cumple con los requisitos, mostrar 404
            notFound();
          }
        } else {
          notFound();
        }
      } catch (error) {
        notFound();
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      validateId();
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se implementará la lógica de pago
    console.log('Payment data:', paymentData);
    // Redirigir a la página de completado
    window.location.href = `/completed/${id}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Validando...</p>
        </div>
      </div>
    );
  }

  if (!validId) {
    notFound();
    return null;
  }
return (
  <>
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Información de Pago</h1>
          <p className="text-gray-600 mb-8">Orden ID: {id}</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulario de Pago */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Información de Contacto</h2>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={paymentData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="tu@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={paymentData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+1234567890"
                    />
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Información de Tarjeta</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre en la Tarjeta *
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        required
                        value={paymentData.cardName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nombre Completo"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        Número de Tarjeta *
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        required
                        value={paymentData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha de Vencimiento *
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        required
                        value={paymentData.expiryDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        required
                        value={paymentData.cvv}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-6 border-t">
                  <button 
                    type="button"
                    onClick={() => window.history.back()}
                    className="px-4 py-2 border rounded-md hover:opacity-90 transition-colors"
                    style={{ color: '#0A9CD9', borderColor: '#0A9CD9' }}
                  >
                    Volver
                  </button>
                  
                  <button 
                    type="submit"
                    className="px-6 py-2 text-white rounded-md hover:opacity-90 transition-colors"
                    style={{ backgroundColor: '#123550' }}
                  >
                    Procesar Pago
                  </button>
                </div>
              </form>
            </div>
        
          {/* Resumen de Compra */}
          <div className="lg:col-span-1">
            {quoterData && (
              <div className="bg-blue-50 rounded-lg p-6 sticky top-8">
                <h2 className="text-lg font-semibold text-blue-900 mb-4">Resumen del Viaje</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-blue-200">
                    <span className="text-sm text-blue-700">Viaje:</span>
                    <span className="font-medium text-blue-900">
                      {quoterData.countryOrigin?.name || 'Origen'} → {' '}
                      {quoterData.country_destinations && Array.isArray(quoterData.country_destinations) 
                        ? quoterData.country_destinations.map((dest: any) => dest.name || dest).slice(0, 2).join(', ')
                        : 'Destino'
                      }
                      {quoterData.country_destinations && quoterData.country_destinations.length > 2 && 
                        ` +${quoterData.country_destinations.length - 2} más`
                      }
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-blue-200">
                    <span className="text-sm text-blue-700">Fechas:</span>
                    <span className="font-medium text-blue-900 text-right">
                      {new Date(quoterData.initial_date).toLocaleDateString('es-ES', { 
                        day: '2-digit', 
                        month: 'short' 
                      })} - {new Date(quoterData.end_date).toLocaleDateString('es-ES', { 
                        day: '2-digit', 
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-blue-200">
                    <span className="text-sm text-blue-700">Pasajeros:</span>
                    <span className="font-medium text-blue-900">
                      {Array.isArray(quoterData.passengers_ages) 
                        ? `${quoterData.passengers_ages.length} persona${quoterData.passengers_ages.length > 1 ? 's' : ''}`
                        : quoterData.passengers_ages || '1 persona'
                      }
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-blue-700">Duración:</span>
                    <span className="font-medium text-blue-900">
                      {Math.ceil((new Date(quoterData.end_date).getTime() - new Date(quoterData.initial_date).getTime()) / (1000 * 60 * 60 * 24))} días
                    </span>
                  </div>
                  
                  {quoterData.resumen && (
                    <div className="mt-4 p-3 bg-blue-100 rounded-md">
                      <p className="text-xs text-blue-800 font-medium mb-1">Notas del viaje:</p>
                      <p className="text-sm text-blue-900">{quoterData.resumen}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>  
    </div>
  </>
);
};
