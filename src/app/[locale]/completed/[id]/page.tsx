'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';

export default function CompletedPage() {
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);
  const [validId, setValidId] = useState(false);

  useEffect(() => {
    const validateId = async () => {
      try {
        // Validar que el ID existe en el backend
        const backendApi = process.env.NEXT_PUBLIC_REACT_BACKEND_API || 'http://localhost:3000/external/landing';
        const response = await fetch(`${backendApi}/loadquoter/${id}`);
        
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            setValidId(true);
          } else {
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          {/* Icono de éxito */}
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
            <svg 
              className="h-12 w-12 text-green-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">¡Pago Completado!</h1>
          <p className="text-lg text-gray-600 mb-6">
            Tu pago ha sido procesado exitosamente.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Detalles de la Transacción</h2>
            <div className="space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">ID del Cotizador:</span>
                <span className="font-medium">{id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fecha de Procesamiento:</span>
                <span className="font-medium">{new Date().toLocaleDateString('es-ES')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hora:</span>
                <span className="font-medium">{new Date().toLocaleTimeString('es-ES')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estado:</span>
                <span className="font-medium text-green-600">Completado</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">¿Qué sigue?</h3>
            <p className="text-blue-700 mb-4">
              Recibirás un email de confirmación con todos los detalles de tu póliza en los próximos minutos.
            </p>
            <ul className="text-left text-blue-700 space-y-1">
              <li>• Revisa tu bandeja de entrada y spam</li>
              <li>• Guarda el email de confirmación</li>
              <li>• Contacta a nuestro equipo si tienes preguntas</li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 text-white rounded-md hover:opacity-90 transition-colors"
              style={{ backgroundColor: '#0A9CD9' }}
            >
              Volver al Inicio
            </button>
            
            <button 
              onClick={() => window.print()}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Imprimir Confirmación
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t text-sm text-gray-500">
            <p>Si tienes alguna pregunta, contacta a nuestro equipo de soporte.</p>
            <p className="mt-1">Email: soporte@vsi.com | Teléfono: +1 (555) 123-4567</p>
          </div>
        </div>
      </div>
    </div>
  );
}