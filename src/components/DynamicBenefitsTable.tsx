import React from 'react';

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

interface DynamicBenefitsTableProps {
  plans: Plan[];
}

const CheckIcon = () => (
  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
  </svg>
);

const XIcon = () => (
  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
  </svg>
);

const DynamicBenefitsTable: React.FC<DynamicBenefitsTableProps> = ({ plans }) => {
  // Obtener todos los beneficios únicos de todos los planes
  const allBenefits = React.useMemo(() => {
    const benefitsMap = new Map<number, Benefit>();
    
    plans.forEach(plan => {
      plan.benefits.forEach(benefit => {
        if (!benefitsMap.has(benefit.id)) {
          benefitsMap.set(benefit.id, benefit);
        }
      });
    });
    
    return Array.from(benefitsMap.values()).sort((a, b) => {
      // Ordenar por grupo de beneficios primero, luego por nombre
      const groupA = a.benefitsGroup?.benefitsGroupName || '';
      const groupB = b.benefitsGroup?.benefitsGroupName || '';
      
      if (groupA !== groupB) {
        return groupA.localeCompare(groupB);
      }
      
      return a.benefitsName.localeCompare(b.benefitsName);
    });
  }, [plans]);

  // Función para verificar si un plan tiene un beneficio específico
  const planHasBenefit = (plan: Plan, benefitId: number): { hasBenefit: boolean; value?: string } => {
    const benefit = plan.benefits.find(b => b.id === benefitId);
    return {
      hasBenefit: !!benefit,
      value: benefit?.planbenefits_value || undefined
    };
  };

  // Agrupar beneficios por grupo
  const groupedBenefits = React.useMemo(() => {
    const groups = new Map<string, Benefit[]>();
    
    allBenefits.forEach(benefit => {
      const groupName = benefit.benefitsGroup?.benefitsGroupName || 'Sin Grupo';
      if (!groups.has(groupName)) {
        groups.set(groupName, []);
      }
      groups.get(groupName)!.push(benefit);
    });
    
    return Array.from(groups.entries());
  }, [allBenefits]);

  if (plans.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden mt-12">
        <div className="p-6">
          <h3 className="text-2xl font-bold text-purple-600 mb-6">Comparación de Beneficios</h3>
          <p className="text-gray-500">No hay planes disponibles para comparar.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mt-12">
      <div className="p-6">
        <h3 className="text-2xl font-bold text-purple-600 mb-6">Comparación de Beneficios</h3>
        
        {/* Table Header */}
        <div 
          className="grid gap-4 py-4 border-b-2 border-gray-200"
          style={{ gridTemplateColumns: `1fr repeat(${plans.length}, 1fr)` }}
        >
          <div className="font-semibold text-gray-700">Beneficio</div>
          {plans.map(plan => (
            <div key={plan.id} className="text-center font-semibold text-gray-700">
              {plan.planName}
            </div>
          ))}
        </div>
        
        {/* Benefit Rows grouped by category */}
        {groupedBenefits.map(([groupName, benefits]) => (
          <div key={groupName}>
            {/* Group Header */}
            <div className="bg-gray-50 py-2 px-4 mt-4 mb-2">
              <h4 className="font-semibold text-gray-800">{groupName}</h4>
            </div>
            
            {/* Benefits in this group */}
            {benefits.map(benefit => (
              <div 
                key={benefit.id} 
                className="grid gap-4 py-4 border-b border-gray-200"
                style={{ gridTemplateColumns: `1fr repeat(${plans.length}, 1fr)` }}
              >
                <div className="flex items-center">
                  <div>
                    <span className="font-medium text-gray-800">{benefit.benefitsName}</span>
                    {benefit.benefitsObs && (
                      <p className="text-sm text-gray-500 mt-1">{benefit.benefitsObs}</p>
                    )}
                  </div>
                </div>
                
                {plans.map(plan => {
                  const { hasBenefit, value } = planHasBenefit(plan, benefit.id);
                  return (
                    <div key={`${plan.id}-${benefit.id}`} className="flex items-center justify-center">
                      {hasBenefit ? (
                        <div className="text-center">
                          {value ? (
                            <span className="text-sm font-medium text-gray-800">{value}</span>
                          ) : (
                            <CheckIcon />
                          )}
                        </div>
                      ) : (
                        <XIcon />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicBenefitsTable;