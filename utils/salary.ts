export const SMMLV_2026 = 1750905;
export const AUX_TRANSP_2026 = 249095;
export const UVT_2026 = 52374;

export enum ArlLevel {
    I = 0.00522,
    II = 0.01044,
    III = 0.02436
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
        pensionRate: 0.04
    },
    prestacion: {
        ibcRate: 0.40,
        healthRate: 0.125,
        pensionRate: 0.16,
        arlRate: ArlLevel.I
    }
};

export interface CalculationResult {
    nomina: {
        netMonthly: number;
        salud: number;
        pension: number;
        fsp: number;
        prima: number;
        cesantias: number;
        interesesCesantias: number;
        totalAnnual: number;
        auxTransp: number;
    };
    prestacion: {
        netMonthly: number;
        salud: number;
        pension: number;
        arl: number;
        fsp: number;
        reteFuente: number;
        totalAnnual: number;
        ibcBase: number;
    };
    targetHonorario: number;
}

export const formatCurrency = (num: number) => {
    return '$' + Math.floor(num).toLocaleString('es-CO');
};

export const calculateSalary = (amount: number, options: CalculatorOptions): CalculationResult => {
    // --- ESCENARIO NÓMINA ---
    const auxTransp = (amount <= (2 * SMMLV_2026)) ? AUX_TRANSP_2026 : 0;
    const saluteNom = amount * options.nomina.healthRate;
    const pensionNom = amount * options.nomina.pensionRate;
    
    // FSP is strictly regulated, but we'll keep the simplified logic or allow future config
    const fspNom = (amount > (4 * SMMLV_2026)) ? (amount * 0.01) : 0; 
    
    const netMonthlyNom = amount - saluteNom - pensionNom - fspNom + auxTransp;
    
    const primaAnual = amount + auxTransp; 
    const cesantiasAnual = amount + auxTransp; 
    const intCesAnual = cesantiasAnual * 0.12;
    
    const totalAnnualNom = (netMonthlyNom * 12) + primaAnual + cesantiasAnual + intCesAnual;

    // --- ESCENARIO PRESTACIÓN SERVICIOS ---
    // User can now customize the IBC base percentage (usually 40%, but some pay on 100% voluntarily)
    let ibc = amount * options.prestacion.ibcRate;
    
    // Legal limits
    if (ibc < SMMLV_2026) ibc = SMMLV_2026;
    if (ibc > (25 * SMMLV_2026)) ibc = 25 * SMMLV_2026;

    const salutePS = ibc * options.prestacion.healthRate;
    const pensionPS = ibc * options.prestacion.pensionRate;
    const arlPS = ibc * options.prestacion.arlRate;
    
    // FSP rules
    const fspPS = (ibc > (4 * SMMLV_2026)) ? (ibc * 0.01) : 0;
    
    const retePS = amount > (UVT_2026 * 2.5) ? amount * 0.10 : amount * 0.04; 

    const netMonthlyPS = amount - salutePS - pensionPS - arlPS - fspPS - retePS;
    const totalAnnualPS = netMonthlyPS * 12;

    // --- VERDICT ---
    // Factor to equal benefits (approx 1.51x is a standard rule of thumb in CO for equivalency)
    const targetHonorario = amount * 1.51;

    return {
        nomina: {
            netMonthly: netMonthlyNom,
            salud: saluteNom,
            pension: pensionNom,
            fsp: fspNom,
            prima: primaAnual,
            cesantias: cesantiasAnual,
            interesesCesantias: intCesAnual,
            totalAnnual: totalAnnualNom,
            auxTransp
        },
        prestacion: {
            netMonthly: netMonthlyPS,
            salud: salutePS,
            pension: pensionPS,
            arl: arlPS,
            fsp: fspPS,
            reteFuente: retePS,
            totalAnnual: totalAnnualPS,
            ibcBase: ibc
        },
        targetHonorario
    };
};