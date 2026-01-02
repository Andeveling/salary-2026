// Archivo de configuración centralizado para parámetros de salario 2026
// Modifica estos valores según tus necesidades o contexto legal

export const SMMLV_2026 = 1_750_905;
export const AUX_TRANSP_2026 = 249095;
export const UVT_2026 = 52_374;

export enum ArlLevel {
	I = 0.00522,
	II = 0.01044,
	III = 0.02436,
}

export interface CalculatorOptions {
	nomina: {
		healthRate: number; // e.g., 0.04
		pensionRate: number; // e.g., 0.04
	};
	prestacion: {
		ibcRate: number; // e.g., 0.40
		healthRate: number; // e.g., 0.125
		pensionRate: number; // e.g., 0.16
		arlRate: number; // from Enum or custom
	};
}

export const defaultOptions: CalculatorOptions = {
	nomina: {
		healthRate: 0.04,
		pensionRate: 0.04,
	},
	prestacion: {
		ibcRate: 0.4,
		healthRate: 0.125,
		pensionRate: 0.16,
		arlRate: ArlLevel.I,
	},
};
