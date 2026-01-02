import type React from "react";

const AuthorCard: React.FC = () => {
	return (
		<div className="bg-neon-purple border-2 border-black shadow-hard p-6 relative overflow-hidden group">
			{/* Decoración de fondo */}
			<div className="absolute -top-6 -right-6 w-24 h-24 bg-white opacity-20 rounded-full transition-transform group-hover:scale-150" />
			<div className="absolute bottom-4 right-4 text-9xl text-black opacity-5 font-black transform rotate-12 pointer-events-none">
				?
			</div>

			<div className="relative z-10">
				<div className="flex justify-between items-start mb-2">
					<h3 className="text-[10px] font-black uppercase bg-black text-white px-2 py-1 transform -rotate-2 inline-block shadow-sm">
						Architected By
					</h3>
					<div className="flex gap-1">
						<div className="w-2 h-2 bg-black rounded-full animate-pulse" />
						<div className="w-2 h-2 bg-black rounded-full animate-pulse delay-75" />
						<div className="w-2 h-2 bg-black rounded-full animate-pulse delay-150" />
					</div>
				</div>

				<h2 className="text-6xl font-display font-black uppercase text-white mb-0 tracking-tighter leading-none">
					Andres
				</h2>
				<h2 className="text-6xl font-display font-black uppercase text-black mb-1 tracking-tighter leading-none">
					Parra
				</h2>

				<a
					href="https://github.com/Andeveling"
					target="_blank"
					rel="noopener noreferrer"
					className="text-xs font-mono font-bold text-white hover:text-black transition-colors mb-6 block"
				>
					@Andeveling
				</a>

				<div className="flex flex-wrap gap-3 mb-6">
					<a
						href="https://github.com/Andeveling"
						target="_blank"
						rel="noopener noreferrer"
						className="brutal-btn bg-white w-10 h-10 flex items-center justify-center text-xl hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
						title="GitHub"
					>
						<i className="fa-brands fa-github" />
					</a>
					<a
						href="https://www.linkedin.com/in/andrespsanchez/"
						target="_blank"
						rel="noopener noreferrer"
						className="brutal-btn bg-neon-blue text-white w-10 h-10 flex items-center justify-center text-xl hover:bg-black transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
						title="LinkedIn"
					>
						<i className="fa-brands fa-linkedin-in" />
					</a>
					<a
						href="https://twitter.com/andeveling"
						target="_blank"
						rel="noopener noreferrer"
						className="brutal-btn bg-black text-white w-10 h-10 flex items-center justify-center text-xl hover:bg-white hover:text-black transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
						title="X (Twitter)"
					>
						<i className="fa-brands fa-x-twitter" />
					</a>
				</div>

				<div className="pt-4 border-t-2 border-black border-dashed">
					<a
						href="https://github.com/Andeveling/salary-2026"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center justify-between group/repo bg-white border-2 border-black p-2 hover:bg-neon-green transition-colors shadow-hard-sm"
					>
						<div className="flex items-center gap-2">
							<i className="fa-solid fa-code-branch text-sm" />
							<span className="text-[10px] font-black uppercase">
								Salary_2026 Repo
							</span>
						</div>
						<i className="fa-solid fa-arrow-right text-xs transform group-hover/repo:translate-x-1 transition-transform" />
					</a>
				</div>
			</div>
		</div>
	);
};

export default AuthorCard;
