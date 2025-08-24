'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import BenefitsTable from '@/components/BenefitsTable';

const HomePage = () => {
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

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
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
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className={`${isScrolled ? 'p-4' : 'p-8'}`}>
              <h3 className="text-purple-600 font-medium mb-2">Plan Básico</h3>
              <div className={`flex items-center justify-between mb-4 ${isScrolled ? 'flex-row' : 'sm:flex-col sm:items-start'}`}>
                <div className="flex items-baseline">
                  <span className={`${isScrolled ? 'text-2xl' : 'text-4xl'} font-bold`}>$14.99</span>
                  {!isScrolled && <span className="text-gray-500 ml-2">/ Por Viaje</span>}
                </div>
                {isScrolled && (
                  <Link href="/get-started" className="text-white px-3 py-1 rounded-md text-sm font-medium hover:opacity-90 transition-colors ml-2" style={{ backgroundColor: '#123550' }} title="Obtener Plan Básico">
                    <span className="hidden sm:inline">Obtener</span>
                    <span className="sm:hidden">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </span>
                  </Link>
                )}
              </div>
              {!isScrolled && (
                <p className="text-gray-600 mb-6">
                  There are many variations of passages of Lorem Ipsum available, but the majority
                </p>
              )}
              
              {!isScrolled && (
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>7 days free access</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Maximum of 5 collaborators</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Cloud backup 1GB</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Maximum 50 tasks per week</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Updates for 1 Year</span>
                  </li>
                </ul>
              )}
            </div>
            {!isScrolled && (
              <div className={`${isScrolled ? 'px-4 pb-4' : 'px-8 pb-8'}`}>
                <Link href="/get-started" className="block w-full bg-gray-800 text-white text-center py-3 rounded-md font-medium hover:bg-gray-700 transition-colors" title="Obtener Plan Básico">
                  <span className="hidden sm:inline">Get You Free plan</span>
                  <span className="sm:hidden flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </span>
                </Link>
              </div>
            )}
          </div>
          
          {/* Standard Plan */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className={`${isScrolled ? 'p-4' : 'p-8'}`}>
              <h3 className="text-purple-600 font-medium mb-2">Plan Estándar</h3>
              <div className={`flex items-center justify-between mb-4 ${isScrolled ? 'flex-row' : 'sm:flex-col sm:items-start'}`}>
                <div className="flex items-baseline">
                  <span className={`${isScrolled ? 'text-2xl' : 'text-4xl'} font-bold`}>$19.99</span>
                  {!isScrolled && <span className="text-gray-500 ml-2">/ Per Month</span>}
                </div>
                {isScrolled && (
                  <Link href="/get-started" className="bg-gray-800 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors ml-2" title="Obtener Plan Estándar">
                    <span className="hidden sm:inline">Obtener</span>
                    <span className="sm:hidden">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </span>
                  </Link>
                )}
              </div>
              {!isScrolled && (
                <p className="text-gray-600 mb-6">
                  There are many variations of passages of Lorem Ipsum available, but the majority
                </p>
              )}
              
              {!isScrolled && (
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>7 days free access</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Maximum of 5 collaborators</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Cloud backup 1GB</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Maximum 50 tasks per week</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Updates for 1 Year</span>
                  </li>
                </ul>
              )}
            </div>
            {!isScrolled && (
              <div className={`${isScrolled ? 'px-4 pb-4' : 'px-8 pb-8'}`}>
                <Link href="/get-started" className="block w-full text-white text-center py-3 rounded-md font-medium hover:opacity-90 transition-colors" style={{ backgroundColor: '#123550' }} title="Obtener Plan Estándar">
                  <span className="hidden sm:inline">Get You Free plan</span>
                  <span className="sm:hidden flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </span>
                </Link>
              </div>
            )}
          </div>
          
          {/* Premium Plan */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className={`${isScrolled ? 'p-4' : 'p-8'}`}>
              <h3 className="text-purple-600 font-medium mb-2">Plan Premium</h3>
              <div className={`flex items-center justify-between mb-4 ${isScrolled ? 'flex-row' : 'sm:flex-col sm:items-start'}`}>
                <div className="flex items-baseline">
                  <span className={`${isScrolled ? 'text-2xl' : 'text-4xl'} font-bold`}>$24.99</span>
                  {!isScrolled && <span className="text-gray-500 ml-2">/ Per Month</span>}
                </div>
                {isScrolled && (
                  <Link href="/get-started" className="bg-gray-800 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors ml-2" title="Obtener Plan Premium">
                    <span className="hidden sm:inline">Obtener</span>
                    <span className="sm:hidden">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </span>
                  </Link>
                )}
              </div>
              {!isScrolled && (
                <p className="text-gray-600 mb-6">
                  There are many variations of passages of Lorem Ipsum available, but the majority
                </p>
              )}
              
              {!isScrolled && (
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>7 days free access</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Maximum of 5 collaborators</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Cloud backup 1GB</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Maximum 50 tasks per week</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Updates for 1 Year</span>
                  </li>
                </ul>
              )}
            </div>
            {!isScrolled && (
              <div className={`${isScrolled ? 'px-4 pb-4' : 'px-8 pb-8'}`}>
                <Link href="/get-started" className="block w-full bg-gray-800 text-white text-center py-3 rounded-md font-medium hover:bg-gray-700 transition-colors" title="Obtener Plan Premium">
                  <span className="hidden sm:inline">Get You Free plan</span>
                  <span className="sm:hidden flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Benefits Table */}
        <BenefitsTable />
      </div>
    </div>
  );
};

export default HomePage;
