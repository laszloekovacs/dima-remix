const LoginPage = () => {
	return (
		<div className="min-h-screen bg-black text-green-500 flex items-center justify-center p-6 font-mono">
			<div className="w-full max-w-xl border border-green-700 p-6">
				{/* Fejléc */}
				<div className="text-sm mb-4">
					<h1 className="text-6xl mb-2">Д.И.М.А 3850</h1>
					<p>Департамент Исследований и Мобильного Архива</p>
					<p>távoli adat központ terminál</p>
				</div>

				{/* Bejelentkezés */}
				<div className="mb-6">
					<label htmlFor="passcode" className="block text-sm mb-2">
						Belépőkód megadása:
					</label>
					<input
						type="password"
						id="passcode"
						className="w-full bg-black border border-green-500 text-green-500 px-3 py-2 font-[Share_Tech_Mono] focus:outline-none focus:ring-2 focus:ring-green-700"
						placeholder="••••••••"
					/>
					<p className="text-xs mt-2">Hátralévő próbálkozások: 3</p>
				</div>

				{/* Lábjegyzet */}
				<div className="text-xs my-6 border-t border-green-700 pt-4 space-y-1">
					<p>1985 Technológiai Fejlesztési Minisztérium, SZU.</p>
					<p>
						Dokumentum szám: 3850-12A | Kiadva: 1985. október 29. | Archív kód:
						STK-17/URZ
					</p>
					<p>"A hűség az intelligencia legmagasabb formája." — X Igazgatóság</p>
				</div>
			</div>
		</div>
	)
}

export default LoginPage
