import React, { useState } from 'react';

interface LinkedInSectionProps {
    onAnalyze: (text: string) => void;
    isLoading: boolean;
}

// Mock function to simulate API fetch
const mockFetchLinkedInProfile = async (url: string): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Perfil Importado de LinkedIn:
            
Experiencia:
- Senior Full Stack Developer (5 años) en TechCorp. Stack: React, Node.js, AWS.
- Backend Developer (2 años) en StartUp Inc. Stack: Python, Django.

Educación:
- Ingeniería de Sistemas, Universidad Nacional.
- Certificación AWS Solutions Architect.

Habilidades:
- JavaScript, TypeScript, Python, SQL, Docker, Kubernetes.
`);
        }, 1500);
    });
};

const LinkedInSection: React.FC<LinkedInSectionProps> = ({ onAnalyze, isLoading }) => {
    const [profileText, setProfileText] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [importUrl, setImportUrl] = useState('');
    const [isImporting, setIsImporting] = useState(false);

    const handleSubmit = () => {
        if (profileText.trim().length > 20) {
            onAnalyze(profileText);
        }
    };

    const handleImport = async () => {
        if (!importUrl) return;
        setIsImporting(true);
        try {
            // Simulate API Call
            const data = await mockFetchLinkedInProfile(importUrl);
            setProfileText(data);
        } finally {
            setIsImporting(false);
        }
    };

    return (
        <div className="bg-white border-2 border-black shadow-hard p-6 mt-8">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between group"
            >
                <h3 className="text-lg font-black uppercase flex items-center gap-3">
                    <i className="fa-brands fa-linkedin text-3xl"></i>
                    IMPORTAR PERFIL
                </h3>
                <div className={`border-2 border-black p-1 transition-transform ${isOpen ? 'rotate-180 bg-black text-white' : 'bg-white text-black'}`}>
                    <i className="fa-solid fa-chevron-down"></i>
                </div>
            </button>

            {isOpen && (
                <div className="mt-6 animate-fadeIn space-y-6">
                    
                    {/* API Import Simulation Section */}
                    <div className="border-2 border-black bg-gray-50 p-4">
                        <label className="block text-xs font-bold uppercase mb-2">LinkedIn Profile URL (API Integration)</label>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                className="brutal-input w-full p-2 font-mono text-sm"
                                placeholder="https://linkedin.com/in/usuario"
                                value={importUrl}
                                onChange={(e) => setImportUrl(e.target.value)}
                            />
                            <button 
                                onClick={handleImport}
                                disabled={isImporting}
                                className="brutal-btn px-4 py-2 font-bold text-xs uppercase bg-neon-blue text-white disabled:opacity-50 disabled:shadow-none"
                            >
                                {isImporting ? 'Cargando...' : 'Importar'}
                            </button>
                        </div>
                        <p className="text-[10px] mt-1 text-gray-500 font-mono">* Simulación de integración API OAuth 2.0</p>
                    </div>

                    <div className="relative">
                        <div className="absolute -top-3 left-4 bg-white px-2 border-2 border-black text-[10px] font-bold uppercase">
                            Datos del Perfil
                        </div>
                        <textarea
                            className="w-full p-4 bg-white border-2 border-black text-xs font-mono text-slate-700 focus:outline-none focus:shadow-hard min-h-[150px]"
                            placeholder="O pega tu experiencia manualmente aquí..."
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
                            {isLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <i className="fa-solid fa-bolt"></i>}
                            ANALIZAR CON IA
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LinkedInSection;