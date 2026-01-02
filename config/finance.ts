export type RiskProfile = "conservador" | "moderado" | "arriesgado";

export interface InvestmentCategory {
	id: "liquidez" | "rentaFija" | "crecimiento" | "oportunidades";
	label: string;
	description: string;
	examples: string[];
	color: string;
	icon: string;
}

export interface PortfolioDistribution {
	liquidez: number;
	rentaFija: number;
	crecimiento: number;
	oportunidades: number;
}

export const INVESTMENT_CATEGORIES: Record<string, InvestmentCategory> = {
	liquidez: {
		id: "liquidez",
		label: "Liquidez",
		description: "Dinero disponible para emergencias y gastos a corto plazo.",
		examples: ["Cajitas Nu/Lulo", "Fiducuentas", "Cuentas Ahorro Alto Rendimiento"],
		color: "bg-neon-blue",
		icon: "fa-hand-holding-dollar",
	},
	rentaFija: {
		id: "rentaFija",
		label: "Renta Fija",
		description: "Preservación de capital con rendimientos predecibles.",
		examples: ["CDTs", "Bonos", "Deuda Pública"],
		color: "bg-neon-yellow",
		icon: "fa-piggy-bank",
	},
	crecimiento: {
		id: "crecimiento",
		label: "Crecimiento",
		description: "Inversión a largo plazo para multiplicar el patrimonio.",
		examples: ["ETFs (VOO, QQQ)", "Acciones Globales", "Fondos Indexados"],
		color: "bg-neon-green",
		icon: "fa-chart-line",
	},
	oportunidades: {
		id: "oportunidades",
		label: "Oportunidades",
		description: "Alto riesgo / Alto retorno. Dinero que puedes permitirte perder.",
		examples: ["Bitcoin/Crypto", "Startups", "Trading", "Stocks Individuales"],
		color: "bg-neon-purple",
		icon: "fa-rocket",
	},
};

export const RISK_PROFILES: Record<RiskProfile, PortfolioDistribution> = {
	conservador: {
		liquidez: 0.4, // 40%
		rentaFija: 0.4, // 40%
		crecimiento: 0.15, // 15%
		oportunidades: 0.05, // 5%
	},
	moderado: {
		liquidez: 0.2, // 20%
		rentaFija: 0.3, // 30%
		crecimiento: 0.4, // 40%
		oportunidades: 0.1, // 10%
	},
	arriesgado: {
		liquidez: 0.1, // 10%
		rentaFija: 0.1, // 10%
		crecimiento: 0.6, // 60%
		oportunidades: 0.2, // 20%
	},
};

export const RISK_PROFILE_LABELS: Record<RiskProfile, string> = {
	conservador: "Conservador (Poco Riesgo)",
	moderado: "Moderado (Balanceado)",
	arriesgado: "Arriesgado (Crecimiento Agresivo)",
};
