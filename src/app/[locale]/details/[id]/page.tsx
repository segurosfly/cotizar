'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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

interface PassengerInfo {
  name: string;
  age: number;
  document?: string;
}

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  address?: string;
}

interface ContactEmergency {
  name: string;
  phone: string;
  relationship: string;
}

interface InvoiceInfo {
  companyName?: string;
  taxId?: string;
  address?: string;
}

interface Voucher {
  id: string;
  type: string;
  amount: number;
  status: string;
}

interface AgeItem {
  age_id: number;
  number: number;
}

interface PassengerForm {
  name: string;
  lastName: string;
  birthDate: string;
  documentType: string;
  documentNumber: string;
  ageId?: number;
}

interface WizardStep1 {
  passengers?: PassengerInfo[];
  [key: string]: unknown;
}

interface WizardStep2 {
  email?: string;
  [key: string]: unknown;
}

interface WizardStep3 {
  selectedEmergencyContact?: ContactEmergency;
  [key: string]: unknown;
}

interface WizardStep4 {
  selectedInvoicePerson?: InvoiceInfo;
  [key: string]: unknown;
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
  email: string;
  phone: string;
  initial_date: Date;
  end_date: Date;
  countryOriginId: number;
  country_destinations: Country[];
  ages: number[];
  passengers_ages: number;
  productId: number;
  subproductId?: number;
  plan_id?: number;
  obs: string;
  resumen: string;
  quoterStep: number;
  quoterStatus: string;
  passengersInfo?: PassengerInfo[];
  vouchers?: Voucher[];
  contactInfo?: ContactInfo;
  contactNumber?: string;
  benefits?: Benefit[];
  contactEmergency?: ContactEmergency;
  invoiceInfo?: InvoiceInfo;
  countryOrigin: Country;
  // Datos estructurados por pasos del wizard
  step1?: WizardStep1;
  step2?: WizardStep2;
  step3?: WizardStep3;
  step4?: WizardStep4;
}

interface ValidationResponse {
  success: boolean;
  message: string;
  data?: {
    quoter: QuoterData;
    countries?: Country[];
    step1?: WizardStep1;
    step2?: WizardStep2;
    step3?: WizardStep3;
    step4?: WizardStep4;
  } | null;
  error?: string;
}

interface Country {
  id: number;
  name: string;
  code: string;
  flag: string;
  continent: string;
  indicative: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: {
    quoter: QuoterData;
    plans: Plan[];
    countries?: Country[];
  };
  error?: string;
}

export default function PlanDetailsPage() {
  const params = useParams();
  const quoterId = params.id as string;
  const planId = params.planId as string;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [quoterData, setQuoterData] = useState<QuoterData | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const locale = params.locale as string;
  const [showBenefitsModal, setShowBenefitsModal] = useState(false);
  
  // Estados para el wizard
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    step1: { passengers: [] as Array<{name: string, lastName: string, birthDate: string, documentType: string, documentNumber: string, ageId?: number}> },
    step2: { 
      email: '', 
      selectedPassenger: '', 
      otherFirstName: '', 
      otherLastName: '',
      countryId: '',
      phoneNumber: ''
    },
    step3: { 
      selectedEmergencyContact: '',
      otherFirstName: '',
      otherLastName: '',
      otherEmail: '',
      emergencyCountryId: '',
      emergencyPhoneNumber: ''
    },
    step4: { 
      selectedInvoicePerson: '',
      personType: '',
      otherFirstName: '',
      otherLastName: '',
      companyName: '',
      taxId: '',
      address: ''
    }
  });
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Funciones para el wizard
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.step1.passengers.length > 0 && formData.step1.passengers.every(p => 
          p.name !== '' && p.lastName !== '' && p.birthDate !== '' && p.documentType !== '' && p.documentNumber !== ''
        );
      case 2:
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = emailRegex.test(formData.step2.email);
        const isPassengerSelected = formData.step2.selectedPassenger !== '';
        const isOtherFieldsValid = formData.step2.selectedPassenger === '0' 
          ? formData.step2.otherFirstName !== '' && formData.step2.otherLastName !== ''
          : true;
        const isContactValid = formData.step2.countryId !== '' && formData.step2.phoneNumber !== '';
        return isEmailValid && isPassengerSelected && isOtherFieldsValid && isContactValid;
      case 3:
        const isEmergencyContactSelected = formData.step3.selectedEmergencyContact !== '';
        const isOtherEmergencyFieldsValid = formData.step3.selectedEmergencyContact === '0' 
          ? formData.step3.otherFirstName !== '' && formData.step3.otherLastName !== '' && 
            formData.step3.otherEmail !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.step3.otherEmail)
          : true;
        const isEmergencyContactValid = formData.step3.emergencyCountryId !== '' && formData.step3.emergencyPhoneNumber !== '';
        return isEmergencyContactSelected && isOtherEmergencyFieldsValid && isEmergencyContactValid;
      case 4:
        const isInvoicePersonSelected = formData.step4.selectedInvoicePerson !== '';
        const isOtherInvoiceFieldsValid = formData.step4.selectedInvoicePerson === '0' 
          ? formData.step4.personType !== '' && 
            (formData.step4.personType === 'natural' 
              ? formData.step4.otherFirstName !== '' && formData.step4.otherLastName !== '' && formData.step4.address !== ''
              : formData.step4.companyName !== '' && formData.step4.taxId !== '' && formData.step4.address !== '')
          : true;
        return isInvoicePersonSelected && isOtherInvoiceFieldsValid;
      default:
        return false;
    }
  };

  const handleStepComplete = (step: number) => {
    if (validateStep(step) && !completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      handleStepComplete(currentStep);
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    }
  };



  const handleSubmit = async () => {
    const completeFormData = {
      step1: formData.step1,
      step2: formData.step2,
      step3: formData.step3,
      step4: formData.step4
    };
    
    console.log('Complete form data:', JSON.stringify(completeFormData, null, 2));
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_REACT_BACKEND_API}/details/${quoterId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeFormData)
      });

      const result = await response.json();
      
      if (result.success) {
        alert('¡Datos enviados exitosamente!');
        console.log('Formulario completado y enviado:', result.message);
        // Redirigir a la página de pago
        window.location.href = `/${params.locale}/payment/${quoterId}`;
      } else {
        alert('Error al enviar los datos. Por favor, inténtalo de nuevo.');
        console.error('Error:', result.message);
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      alert('Error de conexión al enviar los datos.');
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (step: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [step]: {
        ...prev[step as keyof typeof prev],
        [field]: value
      }
    }));
  };



  const updatePassengerData = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const newPassengers = [...prev.step1.passengers];
      newPassengers[index] = {
        ...newPassengers[index],
        [field]: value
      };
      return {
        ...prev,
        step1: {
          ...prev.step1,
          passengers: newPassengers
        }
      };
    });
  };

  const initializePassengers = (agesData?: AgeItem[]) => {
    if (!agesData || !Array.isArray(agesData)) {
      return;
    }

    const passengers: PassengerForm[] = [];
    
    // Iterar sobre cada elemento del array ages
    agesData.forEach((ageItem) => {
      const { age_id, number } = ageItem;
      
      // Crear 'number' cantidad de formularios para este age_id
      for (let i = 0; i < number; i++) {
        let birthDate = '';
        
        // Calcular fecha de nacimiento aproximada basada en age_id
        if (age_id && typeof age_id === 'number') {
          const currentYear = new Date().getFullYear();
          const birthYear = currentYear - age_id;
          birthDate = `${birthYear}-01-01`; // Fecha aproximada
        }
        
        passengers.push({
          name: '',
          lastName: '',
          birthDate,
          documentType: '',
          documentNumber: '',
          ageId: age_id // Guardar el age_id para referencia
        });
      }
    });
    
    setFormData(prev => ({
      ...prev,
      step1: {
        ...prev.step1,
        passengers
      }
    }));
  };

  // Inicializar pasajeros basado en los datos del quoter solo si no hay datos existentes
  useEffect(() => {
    if (quoterData?.ages && formData.step1.passengers.length === 0) {
      let agesArray = null;
      
      // Si ages es una cadena, parsearlo; si ya es un objeto/array, usarlo directamente
      if (typeof quoterData.ages === 'string') {
        try {
          agesArray = JSON.parse(quoterData.ages);
        } catch (error) {
          console.error('Error parsing ages:', error);
          agesArray = null;
        }
      } else {
        agesArray = quoterData.ages;
      }
      
      initializePassengers(agesArray);
    }
  }, [quoterData, formData.step1.passengers.length]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Primero validar que el quoter existe y obtener países
        const validationResponse = await fetch(`${process.env.NEXT_PUBLIC_REACT_BACKEND_API}/details/${quoterId}`);
        const validationResult: ValidationResponse = await validationResponse.json();
        
        if (!validationResult.success) {
          setError(validationResult.message || 'Quoter no encontrado');
          return;
        }
        
        // Establecer los datos del quoter desde la validación
        if (validationResult.data?.quoter) {
          setQuoterData(validationResult.data.quoter);
        }
        
        // Cargar países desde el endpoint de details
        if (validationResult.data?.countries) {
          setCountries(validationResult.data.countries);
        }

        // Cargar datos existentes de los pasos del wizard
        if (validationResult.data?.quoter) {
          const { step1, step2, step3, step4 } = validationResult.data.quoter;
          
          setFormData(prev => ({
            ...prev,
            step1: step1 ? { ...prev.step1, ...step1 as Partial<typeof prev.step1> } : prev.step1,
            step2: step2 ? { ...prev.step2, ...step2 as Partial<typeof prev.step2> } : prev.step2,
            step3: step3 ? { ...prev.step3, ...step3 as Partial<typeof prev.step3> } : prev.step3,
            step4: step4 ? { ...prev.step4, ...step4 as Partial<typeof prev.step4> } : prev.step4
          }));

          // Marcar pasos como completados si tienen datos
          const completed: number[] = [];
          if (step1 && step1.passengers && step1.passengers.length > 0) completed.push(1);
          if (step2 && step2.email) completed.push(2);
          if (step3 && step3.selectedEmergencyContact) completed.push(3);
          if (step4 && step4.selectedInvoicePerson) completed.push(4);
          
          setCompletedSteps(completed);
          
          console.log('Datos del wizard cargados:', { step1, step2, step3, step4 });
        }
        
        // Si la validación es exitosa, cargar los planes
        const plansResponse = await fetch(`${process.env.NEXT_PUBLIC_REACT_BACKEND_API}/plans/${quoterId}`);
        const plansResult: ApiResponse = await plansResponse.json();
        
        if (plansResult.success && plansResult.data) {
          setData(plansResult);
          
          // Buscar el plan específico por plan_id del quoter
          if (validationResult.data?.quoter?.plan_id) {
            const plan = plansResult.data.plans.find(p => p.id === validationResult.data!.quoter.plan_id);
            if (plan) {
              setSelectedPlan(plan);
            } else {
              setError('Plan seleccionado no encontrado');
            }
          } else {
            // Si no hay plan_id en el quoter, mostrar el primer plan disponible
            if (plansResult.data.plans.length > 0) {
              setSelectedPlan(plansResult.data.plans[0]);
            }
          }
        } else {
          setError(plansResult.error || 'Error al cargar los planes');
        }
      } catch (err) {
        setError('Error de conexión');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (quoterId) {
      fetchData();
    }
  }, [quoterId, planId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando detalles del plan...</p>
        </div>
      </div>
    );
  }

  if (error || !selectedPlan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error || 'Plan no encontrado'}</p>
          <Link 
            href={`/${locale}/plans/${quoterId}`} 
            className="text-white px-6 py-2 rounded-md hover:opacity-90 transition-colors"
            style={{ backgroundColor: '#0A9CD9' }}
          >
            Volver a Planes
          </Link>
        </div>
      </div>
    );
  }

  // Agrupar beneficios por categoría
  const groupedBenefits = selectedPlan.benefits.reduce((groups, benefit) => {
    const groupName = benefit.benefitsGroup?.benefitsGroupName || 'Otros Beneficios';
    if (!groups[groupName]) {
      groups[groupName] = [];
    }
    groups[groupName].push(benefit);
    return groups;
  }, {} as Record<string, Benefit[]>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link 
                href={`/${locale}/plans/${data?.data?.quoter.id}`} 
                className="hover:opacity-80 flex items-center mb-2"
                style={{ color: '#0A9CD9' }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Volver a Planes
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">{selectedPlan.planName}</h1>
              <p className="text-gray-600 mt-2">{selectedPlan.planDesc}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-purple-600">$14.99</div>
              <div className="text-gray-500">por mes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Plan Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Wizard de 4 pasos */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Completar Información</h2>
                
                {/* Indicador de pasos */}
                <div className="flex items-center justify-center mb-8">
                  {[1, 2, 3, 4].map((step, index) => (
                    <React.Fragment key={step}>
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                          completedSteps.includes(step) 
                            ? 'text-white' 
                            : currentStep === step 
                            ? 'text-white' 
                            : 'bg-gray-200 text-gray-600'
                        }`} style={{
                          backgroundColor: completedSteps.includes(step) ? '#F8B133' : currentStep === step ? '#F8B133' : undefined
                        }}>
                          {completedSteps.includes(step) ? '✓' : step}
                        </div>
                        <span className="text-xs text-gray-500 mt-2">
                          {step === 1 && 'Pasajeros'}
                          {step === 2 && 'Contacto'}
                          {step === 3 && 'Emergencia'}
                          {step === 4 && 'Facturación'}
                        </span>
                      </div>
                      {index < 3 && (
                        <div className={`flex-1 h-1 mx-4 ${
                          completedSteps.includes(step) ? 'bg-gray-200' : 'bg-gray-200'
                        }`} style={{
                          backgroundColor: completedSteps.includes(step) ? '#123550' : undefined
                        }}></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Contenido del paso actual */}
                <div className="min-h-[400px]">
                  {currentStep === 1 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Paso 1: Información de Pasajeros</h3>
                      <div className="space-y-6">
                        {formData.step1.passengers.map((passenger, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <h4 className="text-lg font-medium mb-4 text-gray-800">Pasajero {index + 1}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                                <input 
                                  type="text"
                                  placeholder="Nombre"
                                  value={passenger.name}
                                  onChange={(e) => updatePassengerData(index, 'name', e.target.value)}
                                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Apellidos</label>
                                <input 
                                  type="text"
                                  placeholder="Apellidos"
                                  value={passenger.lastName}
                                  onChange={(e) => updatePassengerData(index, 'lastName', e.target.value)}
                                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Nacimiento</label>
                                <input 
                                  type="date"
                                  value={passenger.birthDate}
                                  onChange={(e) => updatePassengerData(index, 'birthDate', e.target.value)}
                                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Documento</label>
                                <select 
                                  value={passenger.documentType}
                                  onChange={(e) => updatePassengerData(index, 'documentType', e.target.value)}
                                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                >
                                  <option value="">Seleccionar...</option>
                                  <option value="CC">Cédula de Ciudadanía</option>
                                  <option value="CE">Cédula de Extranjería</option>
                                  <option value="TI">Tarjeta de Identidad</option>
                                  <option value="P">Pasaporte</option>
                                </select>
                              </div>
                              <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Número de Documento</label>
                                <input 
                                  type="text"
                                  placeholder="Número de documento"
                                  value={passenger.documentNumber}
                                  onChange={(e) => updatePassengerData(index, 'documentNumber', e.target.value)}
                                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        {formData.step1.passengers.length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            <p>Cargando información de pasajeros...</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">¿A dónde enviamos tus vouchers?</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Correo</label>
                          <input 
                            type="email"
                            placeholder="correo@ejemplo.com"
                            value={formData.step2.email}
                            onChange={(e) => updateFormData('step2', 'email', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar Pasajero</label>
                          <select 
                            value={formData.step2.selectedPassenger}
                            onChange={(e) => updateFormData('step2', 'selectedPassenger', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Seleccionar...</option>
                            {formData.step1.passengers.map((passenger, index) => (
                              <option key={index} value={`${passenger.ageId}@${index + 1}`}>
                                Pasajero {index + 1}
                              </option>
                            ))}
                            <option value="0">Otro</option>
                          </select>
                        </div>
                        {formData.step2.selectedPassenger === '0' && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Nombres</label>
                              <input 
                                type="text"
                                placeholder="Nombres"
                                value={formData.step2.otherFirstName}
                                onChange={(e) => updateFormData('step2', 'otherFirstName', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Apellidos</label>
                              <input 
                                type="text"
                                placeholder="Apellidos"
                                value={formData.step2.otherLastName}
                                onChange={(e) => updateFormData('step2', 'otherLastName', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </>
                        )}
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">¿A qué número podemos contactarte?</label>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">País</label>
                              <select 
                                value={formData.step2.countryId}
                                onChange={(e) => updateFormData('step2', 'countryId', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              >
                                <option value="">Seleccionar país...</option>
                                {countries.map((country) => (
                                  <option key={country.id} value={country.id}>
                                    {country.flag} {country.name} (+{country.indicative})
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-xs text-gray-500 mb-1">Número de teléfono</label>
                              <div className="flex">
                                <div className="flex items-center px-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                                  <span className="text-sm text-gray-600">
                                    {formData.step2.countryId && countries.find(c => c.id === parseInt(formData.step2.countryId)) 
                                      ? `+${countries.find(c => c.id === parseInt(formData.step2.countryId))?.indicative}` 
                                      : '+'
                                    }
                                  </span>
                                </div>
                                <input 
                                  type="tel"
                                  placeholder="Número de teléfono"
                                  value={formData.step2.phoneNumber}
                                  onChange={(e) => updateFormData('step2', 'phoneNumber', e.target.value)}
                                  className="flex-1 p-3 border border-gray-300 rounded-r-md focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Paso 3: ¿Quién será el contacto de emergencia?</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar contacto de emergencia</label>
                          <select 
                            value={formData.step3.selectedEmergencyContact}
                            onChange={(e) => updateFormData('step3', 'selectedEmergencyContact', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Seleccionar...</option>
                            {formData.step1.passengers.map((passenger, index) => (
                              <option key={index} value={`${passenger.ageId}@${index + 1}`}>
                                Pasajero {index + 1} - {passenger.name} {passenger.lastName}
                              </option>
                            ))}
                            <option value="0">Otro</option>
                          </select>
                        </div>

                        {formData.step3.selectedEmergencyContact === '0' && (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Nombres</label>
                                <input 
                                  type="text"
                                  placeholder="Nombres"
                                  value={formData.step3.otherFirstName}
                                  onChange={(e) => updateFormData('step3', 'otherFirstName', e.target.value)}
                                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Apellidos</label>
                                <input 
                                  type="text"
                                  placeholder="Apellidos"
                                  value={formData.step3.otherLastName}
                                  onChange={(e) => updateFormData('step3', 'otherLastName', e.target.value)}
                                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
                              <input 
                                type="email"
                                placeholder="correo@ejemplo.com"
                                value={formData.step3.otherEmail}
                                onChange={(e) => updateFormData('step3', 'otherEmail', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </>
                        )}

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Número de teléfono</label>
                          <div className="flex space-x-2">
                            <select 
                              value={formData.step3.emergencyCountryId}
                              onChange={(e) => updateFormData('step3', 'emergencyCountryId', e.target.value)}
                              className="w-1/3 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">País</option>
                              {countries.map((country) => (
                                <option key={country.id} value={country.id}>
                                  {country.flag} +{country.indicative} {country.name}
                                </option>
                              ))}
                            </select>
                            <input 
                              type="tel"
                              placeholder="Número de teléfono"
                              value={formData.step3.emergencyPhoneNumber}
                              onChange={(e) => updateFormData('step3', 'emergencyPhoneNumber', e.target.value)}
                              className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Paso 4: ¿A nombre de quién emitimos la factura?</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar persona para facturación</label>
                          <select 
                            value={formData.step4.selectedInvoicePerson}
                            onChange={(e) => updateFormData('step4', 'selectedInvoicePerson', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Seleccionar...</option>
                            {formData.step1.passengers.map((passenger, index) => (
                              <option key={index} value={`${passenger.ageId}@${index + 1}`}>
                                Pasajero {index + 1} - {passenger.name} {passenger.lastName}
                              </option>
                            ))}
                            <option value="0">Otro</option>
                          </select>
                        </div>

                        {formData.step4.selectedInvoicePerson === '0' && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de persona</label>
                              <div className="flex space-x-4">
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name="personType"
                                    value="natural"
                                    checked={formData.step4.personType === 'natural'}
                                    onChange={(e) => updateFormData('step4', 'personType', e.target.value)}
                                    className="mr-2"
                                  />
                                  Natural
                                </label>
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name="personType"
                                    value="juridica"
                                    checked={formData.step4.personType === 'juridica'}
                                    onChange={(e) => updateFormData('step4', 'personType', e.target.value)}
                                    className="mr-2"
                                  />
                                  Jurídica
                                </label>
                              </div>
                            </div>

                            {formData.step4.personType === 'natural' && (
                              <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombres</label>
                                    <input 
                                      type="text"
                                      placeholder="Nombres"
                                      value={formData.step4.otherFirstName}
                                      onChange={(e) => updateFormData('step4', 'otherFirstName', e.target.value)}
                                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Apellidos</label>
                                    <input 
                                      type="text"
                                      placeholder="Apellidos"
                                      value={formData.step4.otherLastName}
                                      onChange={(e) => updateFormData('step4', 'otherLastName', e.target.value)}
                                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                                  <input 
                                    type="text"
                                    placeholder="Dirección completa"
                                    value={formData.step4.address}
                                    onChange={(e) => updateFormData('step4', 'address', e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                  />
                                </div>
                              </>
                            )}

                            {formData.step4.personType === 'juridica' && (
                               <>
                                 <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-2">Razón social</label>
                                   <input 
                                     type="text"
                                     placeholder="Razón social de la empresa"
                                     value={formData.step4.companyName}
                                     onChange={(e) => updateFormData('step4', 'companyName', e.target.value)}
                                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                   />
                                 </div>
                                 <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-2">RUC/NIT</label>
                                   <input 
                                     type="text"
                                     placeholder="Número de identificación fiscal"
                                     value={formData.step4.taxId}
                                     onChange={(e) => updateFormData('step4', 'taxId', e.target.value)}
                                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                   />
                                 </div>
                                 <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                                   <input 
                                     type="text"
                                     placeholder="Dirección completa"
                                     value={formData.step4.address}
                                     onChange={(e) => updateFormData('step4', 'address', e.target.value)}
                                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                   />
                                 </div>
                               </>
                             )}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Términos y condiciones */}
                {currentStep === 4 && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-600">
                      Al hacer click en siguiente acepto los{' '}
                      <a 
                        href="#" 
                        className="text-blue-600 hover:text-blue-800 underline"
                        onClick={(e) => {
                          e.preventDefault();
                          // TODO: Abrir modal o página de términos y condiciones
                          alert('Aquí se mostrarían los Términos y Condiciones');
                        }}
                      >
                        Términos y Condiciones
                      </a>
                      {' '}del plan seleccionado.
                    </p>
                  </div>
                )}

                {/* Botones de navegación */}
                <div className="flex justify-between items-center mt-8">
                  <button 
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    className={`px-6 py-2 rounded-md font-medium ${
                      currentStep === 1 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-gray-500 text-white hover:bg-gray-600'
                    }`}
                  >
                    Anterior
                  </button>
                  
                  <div className="text-sm text-gray-500">
                    Paso {currentStep} de 4
                  </div>
                  
                  <button 
                    onClick={currentStep === 4 ? handleSubmit : handleNextStep}
                    disabled={!validateStep(currentStep)}
                    className={`px-6 py-2 rounded-md font-medium text-white ${
                      validateStep(currentStep) 
                        ? 'hover:opacity-90' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    style={{
                      backgroundColor: validateStep(currentStep) ? '#123550' : undefined
                    }}
                  >
                    {currentStep === 4 ? 'Proceder a pago' : 'Siguiente'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Resumen del Plan</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-medium">{selectedPlan.planName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Precio:</span>
                  <span className="font-bold text-purple-600">$14.99/mes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Beneficios:</span>
                  <span className="font-medium">{selectedPlan.benefits.length} incluidos</span>
                </div>
              </div>

              <div className="mb-6">
                <button 
                  onClick={() => setShowBenefitsModal(true)}
                  className="w-full text-white py-2 px-4 rounded-md font-medium hover:opacity-90 transition-colors flex items-center justify-center"
                  style={{ backgroundColor: '#123550' }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Ver Beneficios Incluidos
                </button>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <button className="w-full text-white py-3 px-4 rounded-md font-medium hover:opacity-90 transition-colors mb-3" style={{ backgroundColor: '#F8B133' }}>
                  Contratar Plan
                </button>
                <Link 
                  href={`/${locale}/plans/${data?.data?.quoter.id}`}
                  className="block w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-md font-medium hover:bg-gray-50 transition-colors text-center"
                >
                  Comparar Planes
                </Link>
              </div>

              {selectedPlan.planObs && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Información Adicional</h4>
                  <p className="text-blue-800 text-sm">{selectedPlan.planObs}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Beneficios */}
      {showBenefitsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Beneficios Incluidos</h2>
                <button 
                  onClick={() => setShowBenefitsModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              {Object.entries(groupedBenefits).map(([groupName, benefits]) => (
                <div key={groupName} className="mb-8">
                  <h3 className="text-lg font-semibold text-purple-600 mb-4 border-b border-gray-200 pb-2">
                    {groupName}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {benefits.map((benefit) => (
                      <div key={benefit.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          <svg className="w-6 h-6 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{benefit.benefitsName}</h4>
                          {benefit.planbenefits_value && (
                            <p className="text-purple-600 font-semibold mt-1">{benefit.planbenefits_value}</p>
                          )}
                          {benefit.benefitsObs && (
                            <p className="text-gray-600 text-sm mt-1">{benefit.benefitsObs}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="flex justify-end mt-6">
                <button 
                  onClick={() => setShowBenefitsModal(false)}
                  className="bg-gray-600 text-white py-2 px-6 rounded-md font-medium hover:bg-gray-700 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}