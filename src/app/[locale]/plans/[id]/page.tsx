'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import BenefitsTable from '@/components/BenefitsTable';
import DynamicBenefitsTable from '@/components/DynamicBenefitsTable';
import { useParams, notFound } from 'next/navigation';

interface Benefit {
  id: number;
  benefitsName: string;
  benefitsType: string;
  benefitsObs: string;
  benefitsStatus: number;
  planbenefits_value: string | null;
  benefitsGroup: {
    id: number;
    benefitsGroupName: string;
    obs: string;
  } | null;
}

interface Plan {
  id: number;
  planName: string;
  planDesc: string;
  planObs: string;
  productId: number;
  subproductId?: number;
  benefits: Benefit[];
}

interface QuoterData {
  id: string;
  productId: number;
  subproductId?: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: {
    quoter: QuoterData;
    plans: Plan[];
  };
  error?: string;
}

export default function PlansPage() {

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const triggerPoint = 300;
      setIsScrolled(scrollPosition > triggerPoint);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const params = useParams();
  const id = params.id as string;
  const locale = params.locale as string;
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingPlan, setUpdatingPlan] = useState(false);

  const handlePlanSelection = async (planId: number) => {
    if (updatingPlan) return;
    
    setUpdatingPlan(true);
    try {
      const backendApi = process.env.NEXT_PUBLIC_REACT_BACKEND_API || 'http://localhost:3000/external/quoterlanding';
      const response = await fetch(`${backendApi}/${id}/plan`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Origin': window.location.origin
        },
        body: JSON.stringify({ plan_id: planId })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update plan');
      }
      
      const result = await response.json();
      
      if (result.success) {
        // Redirigir a la página de details
        window.location.href = `/${locale}/details/${id}`;
      } else {
        throw new Error(result.message || 'Failed to update plan');
      }
    } catch (err) {
      console.error('Error updating plan:', err);
      alert('Error al seleccionar el plan. Por favor, intenta de nuevo.');
    } finally {
      setUpdatingPlan(false);
    }
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const backendApi = process.env.NEXT_PUBLIC_REACT_BACKEND_API || 'http://localhost:3000/external/landing';
        const response = await fetch(`${backendApi}/plans/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch plans');
        }
        
        const result: ApiResponse = await response.json();
        
        if (!result.success) {
          // Si el quoter no existe, mostrar 404
          notFound();
          return;
        }
        
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPlans();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando planes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!data || !data.success) {
    notFound();
    return null;
  }

  return (
    <>
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
      {data.data?.plans && data.data.plans.length > 0 ? (
        <>
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Planes de Seguro de Viaje</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Elige el plan que mejor se adapte a tus necesidades de viaje. Todos los planes incluyen asistencia 24/7.
            </p>
            
            {/* Título de Planes */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-purple-600">Planes para ti</h2>
            </div>
          </div>
          
          {/* Placeholder when cards are fixed */}
          {isScrolled && <div className="h-40 mb-8"></div>}
          
          {/* Pricing Cards */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-300 ${
            isScrolled 
              ? 'fixed top-4 left-1/2 transform -translate-x-1/2 z-40 bg-white shadow-lg rounded-lg p-4 w-11/12 max-w-6xl' 
              : ''
          }`}>
            {/* Basic Plan */}
            {data.data?.plans.map((plan) => (
              <div key={plan.id}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className={`${isScrolled ? 'p-4' : 'p-8'}`}>
                    <h3 className="text-purple-600 font-medium mb-2">{plan.planName}</h3>
                    <div className={`flex items-center justify-between mb-4 ${isScrolled ? 'flex-row' : 'sm:flex-col sm:items-start'}`}>
                      <div className="flex items-baseline">
                        <span className={`${isScrolled ? 'text-2xl' : 'text-4xl'} font-bold`}>$14.99</span>
                        {!isScrolled && <span className="text-gray-500 ml-2"></span>}
                      </div>
                      {isScrolled && (
                        <button 
                          onClick={() => handlePlanSelection(plan.id)} 
                          className="text-white px-3 py-1 rounded-md text-sm font-medium hover:opacity-90 transition-colors ml-2" 
                          style={{ backgroundColor: '#123550' }}
                          title=""
                        >
                          <span className="hidden sm:inline">Obtener</span>
                          <span className="sm:hidden">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                          </span>
                        </button>
                      )}
                    </div>
                    {!isScrolled && (
                      <p className="text-gray-600 mb-6">
                        {plan.planDesc}
                      </p>
                    )}
                    
                    {!isScrolled && (
                      <ul className="space-y-3 mb-8">
                        {plan.benefits.map((benefit) => (
                          <li key={benefit.id} className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span>{benefit.benefitsName} {benefit.planbenefits_value && `(${benefit.planbenefits_value})`}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {!isScrolled && (
                    <div className={`${isScrolled ? 'px-4 pb-4' : 'px-8 pb-8'}`}>
                      <button 
                        onClick={() => handlePlanSelection(plan.id)} 
                        className="block w-full text-white text-center py-3 rounded-md font-medium hover:opacity-90 transition-colors" 
                        style={{ backgroundColor: '#123550' }}
                        title="Obtener Plan Básico"
                      >
                        <span className="hidden sm:inline">Get You Free plan</span>
                        <span className="sm:hidden flex items-center justify-center">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                          </svg>
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

          </div>
          
          {/* Benefits Table */}
          <DynamicBenefitsTable plans={data.data?.plans || []} />
        </>
        ) : (
          <>
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No hay planes disponibles</h2>
              <p className="text-gray-600">No se encontraron planes para este cotizador.</p>
            </div>
          </>
          )}
      </div>
    </div>
    </>
  );
}