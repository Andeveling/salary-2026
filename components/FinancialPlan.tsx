import type React from "react";
import { useState } from "react";
import {
	INVESTMENT_CATEGORIES,
	RISK_PROFILES,
	type RiskProfile,
} from "../config/finance";
import { formatCurrency } from "../utils/salary";

interface FinancialPlanProps {
	netIncome: number;
}

const FinancialPlan: React.FC<FinancialPlanProps> = ({ netIncome }) => {
	const [savingsRate, setSavingsRate] = useState(0.2); // 20% default
	const [riskProfile, setRiskProfile] = useState<RiskProfile>("moderado");

	const savingsAmount = netIncome * savingsRate;
	const distribution = RISK_PROFILES[riskProfile];

	return (
		<div className="bg-white border-2 border-black shadow-hard p-6 md:p-8 relative overflow-hidden">
			{/* Header Section */}
			<div className="relative z-10 mb-8">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
					<div>
						<h2 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tighter">
							Plan de <span className="bg-black text-white px-2">Gestión</span>{" "}
							Financiera
						</h2>
						<p className="text-sm font-bold mt-2 border-l-4 border-neon-green pl-3">
							Estrategia basada en "Tu Verdadero Portafolio"
						</p>
					</div>
					<div className="bg-bg-grid border-2 border-black p-3 shadow-hard-sm transform -rotate-1">
						<span className="block text-[10px] font-black uppercase mb-1">
							Capacidad de Ahorro Mensual
						</span>
						<div className="text-3xl font-black font-mono">
							{formatCurrency(savingsAmount)}
						</div>
					</div>
				</div>

				{/* Controls */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 border-2 border-black border-dashed">
					{/* Savings Rate Slider */}
					<div>
						<label
							htmlFor="savings-rate"
							className="flex justify-between text-xs font-black uppercase mb-2"
						>
							<span>% Ahorro del Ingreso</span>
							<span className="bg-black text-white px-2">
								{Math.round(savingsRate * 100)}%
							</span>
						</label>
						<input
							id="savings-rate"
							type="range"
							min="0.05"
							max="0.8"
							step="0.05"
							value={savingsRate}
							onChange={(e) => setSavingsRate(Number(e.target.value))}
							className="range-slider"
						/>
						<p className="text-[10px] mt-2 font-bold text-gray-600">
							Destinas {Math.round(savingsRate * 100)}% de {formatCurrency(netIncome)}
						</p>
					</div>

					{/* Risk Profile Selector */}
					<div>
						<label
							htmlFor="risk-profile"
							className="block text-xs font-black uppercase mb-2"
						>
							Perfil de Inversionista
						</label>
						<div className="flex gap-2">
							{(Object.keys(RISK_PROFILES) as RiskProfile[]).map((profile) => (
								<button
									key={profile}
									type="button"
									onClick={() => setRiskProfile(profile)}
									className={`flex-1 py-2 text-[10px] font-black uppercase border-2 border-black transition-all
                                        ${
																					riskProfile === profile
																						? "bg-black text-white shadow-hard-sm transform -translate-y-1"
																						: "bg-white hover:bg-gray-100"
																				}`}
								>
									{profile}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Bento Grid Distribution */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
				{Object.entries(INVESTMENT_CATEGORIES).map(([key, category]) => {
					const percentage =
						distribution[key as keyof typeof distribution];
					const amount = savingsAmount * percentage;

					return (
						<div
							key={key}
							className={`border-2 border-black shadow-hard flex flex-col h-full transition-transform hover:-translate-y-1 hover:shadow-hard-lg bg-white`}
						>
							{/* Header */}
							<div
								className={`${category.color} border-b-2 border-black p-3 flex justify-between items-center`}
							>
								<span className="font-black uppercase text-sm">
									{category.label}
								</span>
								<i className={`fa-solid ${category.icon} text-lg opacity-80`} />
							</div>

							{/* Content */}
							<div className="p-4 grow flex flex-col justify-between gap-4">
								<div>
									<div className="flex items-baseline gap-2 mb-1">
										<span className="text-2xl font-black font-mono">
											{Math.round(percentage * 100)}%
										</span>
										<span className="text-xs font-bold text-gray-500">
											del ahorro
										</span>
									</div>
									<div className="text-xl font-black border-b-2 border-black border-dashed pb-2 mb-3">
										{formatCurrency(amount)}
									</div>
									<p className="text-[10px] font-bold leading-tight mb-3">
										{category.description}
									</p>
								</div>

								{/* Examples / Tactics */}
								<div className="bg-bg-grid border border-black p-2">
									<span className="block text-[9px] font-black uppercase mb-1 text-gray-500">
										Instrumentos:
									</span>
									<ul className="text-[10px] font-mono list-disc list-inside">
										{category.examples.map((ex) => (
											<li key={ex} className="truncate">
												{ex}
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			{/* Background Decoration */}
			<div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gray-100 rounded-full border-2 border-black opacity-50 z-0 pointer-events-none" />
			<div className="absolute top-10 left-10 w-4 h-4 bg-black z-0 pointer-events-none" />
			<div className="absolute top-12 left-14 w-2 h-2 bg-black z-0 pointer-events-none" />
		</div>
	);
};

export default FinancialPlan;
