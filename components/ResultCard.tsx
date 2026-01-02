import React from 'react';

interface ResultCardProps {
    title: string;
    icon: string;
    themeColor: 'nomina' | 'honorarios';
    netMonthly: string;
    details: Array<{ label: string; value: string; isDeduction?: boolean; isBonus?: boolean }>;
    annualTotal: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, icon, themeColor, netMonthly, details, annualTotal }) => {
    // Brutalist theme logic
    const isNomina = themeColor === 'nomina';
    const mainColor = isNomina ? 'bg-neon-blue' : 'bg-neon-yellow';
    const textColor = isNomina ? 'text-white' : 'text-black';
    
    return (
        <div className="bg-white border-2 border-black shadow-hard flex flex-col h-full relative">
            {/* Header Badge style */}
            <div className={`${mainColor} border-b-2 border-black px-6 py-4 flex justify-between items-center ${textColor}`}>
                <h3 className="font-display font-black text-xl tracking-tighter uppercase">{title}</h3>
                <i className={`fa-solid ${icon} text-2xl`}></i>
            </div>
            
            <div className="p-6 flex-grow space-y-6">
                <div className="text-center pb-6 border-b-2 border-black border-dashed">
                    <span className="text-xs font-bold uppercase bg-black text-white px-2 py-1">Neto Mensual</span>
                    <div className="text-4xl font-black mt-4 font-mono tracking-tight">{netMonthly}</div>
                </div>

                <div className="space-y-3 font-mono text-sm">
                    {details.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center group hover:bg-slate-100 p-1 transition-colors">
                            <span className={`${item.label.includes('Beneficios') ? 'font-bold underline' : 'font-bold text-gray-600'}`}>
                                {item.label}
                            </span>
                            <span className={`font-bold ${
                                item.isDeduction ? 'text-red-600' : 
                                item.isBonus ? 'text-green-600' : 
                                item.label.includes('INCLUIDOS') ? 'bg-neon-green text-black px-1' : 
                                item.label.includes('COSTO') ? 'bg-red-500 text-white px-1' : 'text-black'
                            }`}>
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gray-100 p-4 border-t-2 border-black">
                <div className="flex justify-between items-center">
                    <span className="text-xs font-black uppercase">Ingreso Real Anual</span>
                    <span className="text-xl font-black font-mono text-right border-b-4 border-black leading-none">{annualTotal}</span>
                </div>
            </div>
        </div>
    );
};

export default ResultCard;