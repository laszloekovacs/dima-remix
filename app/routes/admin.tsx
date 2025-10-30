export default function TapeSelectionScreen() {
	return (
		<div>
			<h1>Beállítások</h1>
			<button className="border p-1" type="button">
				mentés
			</button>

			{/* login page */}
			<div>
				<p>login oldal jelszó</p>
				<input type="string" name="passcode" value="elozo" />
			</div>

			{/* copy sequene */}
			<div>
				<p>másolás oldal. másolás időhossza</p>
				<input type="time" />
			</div>
		</div>
	)
}
