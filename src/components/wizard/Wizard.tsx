'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Importaciones dinámicas para los componentes de pasos
const PersonalInfoStep = dynamic(() => import('./steps/PersonalInfoStep'));
const TravelDetailsStep = dynamic(() => import('./steps/TravelDetailsStep'));
const CoverageSelectionStep = dynamic(() => import('./steps/CoverageSelectionStep'));
const SummaryStep = dynamic(() => import('./steps/SummaryStep'));

// Definir los tipos para los datos del wizard
export type WizardData = {
  // Datos personales
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    age: number;
    country: string;
  };
  // Detalles del viaje
  travelDetails: {
    destination: string;
    startDate: string;
    endDate: string;
    travelers: number;
    purpose: string;
  };
  // Selección de coberturas
  coverageSelection: {
    planType: string;
    medicalCoverage: boolean;
    luggageCoverage: boolean;
    tripCancellation: boolean;
    extremeSports: boolean;
    covid19Coverage: boolean;
  };
  // Resumen y confirmación
  summary: {
    totalPrice: number;
    quotationId: string;
    agreedToTerms: boolean;
  };
};

// Datos iniciales vacíos
const initialData: WizardData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    age: 0,
    country: '',
  },
  travelDetails: {
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    purpose: '',
  },
  coverageSelection: {
    planType: '',
    medicalCoverage: true,
    luggageCoverage: false,
    tripCancellation: false,
    extremeSports: false,
    covid19Coverage: true,
  },
  summary: {
    totalPrice: 0,
    quotationId: '',
    agreedToTerms: false,
  },
};

const Wizard: React.FC = () => {
  // Estado para el paso actual y los datos del formulario
  const [currentStep, setCurrentStep] = useState(0);
  const [wizardData, setWizardData] = useState<WizardData>(initialData);
  
  // Función para actualizar los datos del wizard
  const updateWizardData = (section: keyof WizardData, data: Partial<WizardData[keyof WizardData]>) => {
    setWizardData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data
      }
    }));
  };
  
  // Función para avanzar al siguiente paso
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  // Función para retroceder al paso anterior
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Renderizar el paso actual
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoStep 
            data={wizardData.personalInfo} 
            updateData={(data) => updateWizardData('personalInfo', data)} 
            nextStep={nextStep} 
          />
        );
      case 1:
        return (
          <TravelDetailsStep 
            data={wizardData.travelDetails} 
            updateData={(data) => updateWizardData('travelDetails', data)} 
            nextStep={nextStep} 
            prevStep={prevStep} 
          />
        );
      case 2:
        return (
          <CoverageSelectionStep 
            data={wizardData.coverageSelection} 
            updateData={(data) => updateWizardData('coverageSelection', data)} 
            nextStep={nextStep} 
            prevStep={prevStep} 
          />
        );
      case 3:
        return (
          <SummaryStep 
            data={wizardData} 
            updateData={(data) => updateWizardData('summary', data)} 
            prevStep={prevStep} 
            submitForm={() => console.log('Form submitted', wizardData)} 
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      {/* Indicador de progreso */}
      <div className="mb-8">
        <div className="flex justify-between">
          {['Información Personal', 'Detalles del Viaje', 'Coberturas', 'Resumen'].map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center ${index <= currentStep ? 'text-purple-600' : 'text-gray-400'}`}
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  index < currentStep ? 'bg-purple-600 text-white' : 
                  index === currentStep ? 'border-2 border-purple-600 text-purple-600' : 
                  'border-2 border-gray-300 text-gray-400'
                }`}
              >
                {index < currentStep ? '✓' : index + 1}
              </div>
              <span className="text-sm hidden md:block">{step}</span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full rounded"></div>
          <div 
            className="absolute top-0 left-0 h-1 bg-purple-600 rounded transition-all duration-300" 
            style={{ width: `${(currentStep / 3) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Contenido del paso actual */}
      <div className="mt-6">
        {renderStep()}
      </div>
    </div>
  );
};

export default Wizard;
