// File: BootSequenceHU.jsx
import React, { useEffect, useRef } from "react"
import gsap from "gsap"

const bootLines = [
	"[  OK  ] ROM betöltése...",
	"[  OK  ] Kernel modulok betöltése...",
	"[  OK  ] /dev/sda1 csatolása...",
	"[  OK  ] Hálózati interfészek aktiválása...",
	"[  OK  ] D.I.M.A 3850 csomópont kézfogás elindítva...",
	"[  OK  ] Távoli hozzáférés engedélyezve",
	"...",
	"Keretrendszer csatlakoztatása folyamatban...",
]

const BootSequenceHU = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const headerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const lines = containerRef.current?.querySelectorAll(".boot-line")
		if (!lines) return

		gsap.set(lines, { opacity: 0 })

		lines.forEach((line, i) => {
			gsap.to(line, {
				opacity: 1,
				delay: i * 1.2,
				duration: 0,
				ease: "none",
			})
		})

		// Blinking header animation
		gsap.to(headerRef.current, {
			opacity: 0,
			repeat: -1,
			yoyo: true,
			duration: 0.6,
			ease: "power1.inOut",
		})
	}, [])

	return (
		<div className="bg-black text-green-500 p-6 min-h-screen font-mono">
			{/* red star */}
			<div className="flex justify-center p-2">
				<img
					src="./assets/hammer-and-sickle.png"
					alt="redstar"
					className="h-12"
				/>
			</div>

			{/* Blinking header */}
			<div
				ref={headerRef}
				className="text-center text-sm mb-4 bg-green-500 text-black"
			>
				Rendszerindítás folyamatban...
			</div>

			{/* Boot log */}
			<div ref={containerRef}>
				{bootLines.map((text, i) => (
					<p key={i} className="boot-line text-sm">
						{text}
					</p>
				))}
			</div>
		</div>
	)
}

export default BootSequenceHU
