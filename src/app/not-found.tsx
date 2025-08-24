'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Icono de error 404 */}
        <div className="mx-auto flex items-center justify-center h-32 w-32 rounded-full bg-red-100">
          <svg 
            className="h-16 w-16 text-red-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
        </div>
        
        {/* Título y mensaje */}
        <div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Página no encontrada</h2>
          <p className="text-gray-600 mb-8">
            Lo sentimos, la página que estás buscando no existe o el ID proporcionado no es válido.
          </p>
        </div>
        
        {/* Información adicional */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">¿Qué puedes hacer?</h3>
          <ul className="text-left text-blue-700 space-y-2">
            <li>• Verifica que el ID del cotizador sea correcto</li>
            <li>• Regresa a la página principal</li>
            <li>• Contacta a nuestro equipo de soporte si el problema persiste</li>
          </ul>
        </div>
        
        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="px-6 py-3 text-white rounded-md hover:opacity-90 transition-colors text-center"
            style={{ backgroundColor: '#123550' }}
          >
            Volver al Inicio
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Página Anterior
          </button>
        </div>
        
        {/* Información de contacto */}
        <div className="mt-8 pt-6 border-t text-sm text-gray-500">
          <p>¿Necesitas ayuda?</p>
          <p className="mt-1">Email: soporte@vsi.com | Teléfono: +1 (555) 123-4567</p>
        </div>
      </div>
    </div>
  );
}