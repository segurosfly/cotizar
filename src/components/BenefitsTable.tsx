import React from 'react';

interface BenefitRowProps {
  title: string;
  description?: string;
  basic: string | React.ReactNode;
  standard: string | React.ReactNode;
  premium: string | React.ReactNode;
  ultra?: string | React.ReactNode;
  isNew?: boolean;
  isFree?: boolean;
}

const BenefitRow: React.FC<BenefitRowProps> = ({ 
  title, 
  description, 
  basic, 
  standard, 
  premium, 
  ultra, 
  isNew, 
  isFree 
}) => {
  return (
    <div className="grid grid-cols-5 py-4 border-b border-gray-200">
      <div className="col-span-1 flex items-center">
        <div>
          <div className="flex items-center">
            <span className="font-medium text-gray-800">{title}</span>
            {isNew && (
              <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                Nuevo
              </span>
            )}
            {isFree && (
              <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded">
                Gratis
              </span>
            )}
          </div>
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>
        {description && (
          <div className="ml-2">
            <button className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
        )}
      </div>
      <div className="col-span-1 flex items-center justify-center">{basic}</div>
      <div className="col-span-1 flex items-center justify-center">{standard}</div>
      <div className="col-span-1 flex items-center justify-center">{premium}</div>
      {ultra && <div className="col-span-1 flex items-center justify-center">{ultra}</div>}
    </div>
  );
};

const CheckIcon = () => (
  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
  </svg>
);

const BenefitsTable: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mt-12">
      <div className="p-6">
        <h3 className="text-2xl font-bold text-purple-600 mb-6">Para ti</h3>
        
        {/* Table Header */}
        <div className="grid grid-cols-5 py-4 border-b-2 border-gray-200">
          <div className="col-span-1 font-semibold text-gray-700">Beneficio</div>
          <div className="col-span-1 text-center font-semibold text-gray-700">Plan Básico</div>
          <div className="col-span-1 text-center font-semibold text-gray-700">Plan Estándar</div>
          <div className="col-span-1 text-center font-semibold text-gray-700">Plan Premium</div>
          <div className="col-span-1 text-center font-semibold text-gray-700">Plan Ultra</div>
        </div>
        
        {/* Benefit Rows */}
        <BenefitRow
          title="Asistencia Médica por accidente"
          basic="EUR 10.000"
          standard="EUR 30.000"
          premium="EUR 50.000"
          ultra="EUR 100.000"
        />
        
        <BenefitRow
          title="Asistencia Médica por enfermedad"
          description="(Incluye COVID-19)"
          basic="EUR 10.000"
          standard="EUR 30.000"
          premium="EUR 50.000"
          ultra="EUR 100.000"
          isNew={true}
        />
        
        <BenefitRow
          title="Enfermedades Crónicas o iniciadas antes del viaje"
          basic="USD 1.000"
          standard="USD 1.000"
          premium="USD 2.000"
          ultra="USD 3.000"
          isFree={true}
        />
        
        <BenefitRow
          title="Medicamentos recetados"
          basic="USD 700"
          standard="USD 1.500"
          premium="USD 2.500"
          ultra="USD 2.500"
        />
        
        <BenefitRow
          title="Días complementarios de Hospitalización/Internación"
          basic="8 días"
          standard="8 días"
          premium="8 días"
          ultra="8 días"
        />
        
        <BenefitRow
          title="Cobertura para Embarazadas"
          description="(Hasta semana 32)"
          basic={<CheckIcon />}
          standard={<CheckIcon />}
          premium={<CheckIcon />}
          ultra={<CheckIcon />}
          isFree={true}
        />
        
        <BenefitRow
          title="Repatriación de Restos Mortales"
          basic={<CheckIcon />}
          standard={<CheckIcon />}
          premium={<CheckIcon />}
          ultra={<CheckIcon />}
        />
      </div>
    </div>
  );
};

export default BenefitsTable;
