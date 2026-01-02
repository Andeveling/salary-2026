import React, { useState } from 'react';

interface LinkedInSectionProps {
    onAnalyze: (text: string, type: 'linkedin' | 'github') => void;
    isLoading: boolean;
}

const LinkedInSection: React.FC<LinkedInSectionProps> = ({ onAnalyze, isLoading }) => {
    const [activeTab, setActiveTab] = useState<'linkedin' | 'github'>('linkedin');
    const [profileText, setProfileText] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = () => {
        if (profileText.trim().length > 20) {
            onAnalyze(profileText, activeTab);
        }
    };

    const placeholders = {
        linkedin: "Ejemplo: \n\nAcerca de:\nDesarrollador Senior con 6 años de experiencia en arquitectura de microservicios...\n\nExperiencia:\n- Tech Lead en Startup X (2023-Presente): Lideré migración a AWS...",
        github: "Ejemplo (Pega tu README.md principal aquí):\n\n# Portfolio de Juan Dev\n\n## Proyectos Destacados\n1. E-commerce API: Node.js + GraphQL.\n2. Open Source Contrib: Corrección de bugs en biblioteca React-Query..."
    };

    const tooltips = {
        linkedin: "Ve a tu perfil de LinkedIn > 'Más' > 'Guardar en PDF' o simplemente selecciona y copia todo el texto de tu sección 'Acerca de', 'Experiencia' y 'Educación'. Entre más detalles técnicos, mejor la estimación.",
        github: "Copia el contenido de tu README.md personal (el que sale en tu perfil) o la descripción de tus repositorios más importantes. La IA buscará calidad de código, complejidad de proyectos y stack tecnológico."
    };

    return (
        <div className="bg-white border-2 border-black shadow-hard p-6 mt-8">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between group"
            >
                <h3 className="text-lg font-black uppercase flex items-center gap-3">
                    <i className="fa-solid fa-id-card text-3xl"></i>
                    ANALIZADOR DE PERFIL 360°
                </h3>
                <div className={`border-2 border-black p-1 transition-transform ${isOpen ? 'rotate-180 bg-black text-white' : 'bg-white text-black'}`}>
                    <i className="fa-solid fa-chevron-down"></i>
                </div>
            </button>

            {isOpen && (
                <div className="mt-6 animate-fadeIn space-y-6">
                    
                    {/* Tabs */}
                    <div className="flex gap-4 border-b-2 border-black pb-1">
                        <button 
                            onClick={() => { setActiveTab('linkedin'); setProfileText(''); }}
                            className={`flex items-center gap-2 px-4 py-2 font-black uppercase text-xs transition-all
                                ${activeTab === 'linkedin' 
                                    ? 'bg-neon-blue text-white border-2 border-black transform -translate-y-1 shadow-hard-sm' 
                                    : 'text-gray-500 hover:text-black'}`}
                        >
                            <i className="fa-brands fa-linkedin text-lg"></i> LinkedIn
                        </button>
                        <button 
                            onClick={() => { setActiveTab('github'); setProfileText(''); }}
                            className={`flex items-center gap-2 px-4 py-2 font-black uppercase text-xs transition-all
                                ${activeTab === 'github' 
                                    ? 'bg-black text-white border-2 border-gray-800 transform -translate-y-1 shadow-hard-sm' 
                                    : 'text-gray-500 hover:text-black'}`}
                        >
                            <i className="fa-brands fa-github text-lg"></i> GitHub
                        </button>
                    </div>

                    <div className="relative">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-xs font-bold uppercase block">
                                {activeTab === 'linkedin' ? 'Pega tu Info Profesional' : 'Pega tu README / Proyectos'}
                            </label>
                            
                            {/* Tooltip Component */}
                            <div className="relative tooltip-container cursor-help">
                                <div className="bg-neon-yellow border-2 border-black rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">
                                    ?
                                </div>
                                <div className="tooltip-text absolute right-0 bottom-full mb-2 w-64 bg-black text-white text-[10px] p-3 border-2 border-neon-green shadow-hard z-10 font-mono">
                                    {tooltips[activeTab]}
                                    <div className="absolute bottom-[-6px] right-2 w-3 h-3 bg-black border-r-2 border-b-2 border-neon-green transform rotate-45"></div>
                                </div>
                            </div>
                        </div>

                        <textarea
                            className="w-full p-4 bg-white border-2 border-black text-xs font-mono text-slate-700 focus:outline-none focus:shadow-hard min-h-[200px]"
                            placeholder={placeholders[activeTab]}
                            value={profileText}
                            onChange={(e) => setProfileText(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading || profileText.length < 20}
                            className={`brutal-btn px-6 py-3 text-sm font-black uppercase flex items-center gap-3
                                ${isLoading || profileText.length < 20 
                                    ? 'bg-gray-300 cursor-not-allowed shadow-none border-gray-400' 
                                    : 'bg-neon-green hover:bg-lime-400'}`}
                        >
                            {isLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <i className="fa-solid fa-wand-magic-sparkles"></i>}
                            {activeTab === 'linkedin' ? 'Auditar Perfil LinkedIn' : 'Auditar GitHub Repo'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LinkedInSection;