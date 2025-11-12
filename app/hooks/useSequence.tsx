import { useEffect, useState } from "react"

export const bootEvents = [
  "загрузка загрузочной ROM",
  "------------------------",
  "нашел ДИМУ RОМ",
  "szovjet blokk régió nyelv modul: magyar",
  "ROM 256Kb betöltve",
  "система мониторинга энергопотребления",
  "hálózat /dev/net",
  "floppy meghajtó /dev/fd0",
  "nyomtató /dev/lp0",
  "merevlemez /dev/hd0",
  "titkosító biztonsági kulcs x29 csatlakozva",
  "dima protokoll hitelesítve titkosító kulcsal",
  "--- figyelem: megfigyelt kapcsolat ---",
  "hálózat hitelesítve: x29 laboratórium",
]

// sequence with randomized stagger
export const useSequence = (
  lines: string[],
  onDone?: () => void,
  onFinishedEvent?: (line: string, index: number) => void,
  delay: number = 800,
  variance: number = 200,
) => {
  const [index, setIndex] = useState(0)

  // start the timeout that increases the index, run callback when done
  useEffect(() => {
    // short circuit if out of index or 0 array
    if (index >= lines.length) {
      if (index === 0 && lines.length === 0) {
        onDone?.()
        console.log("out of bounds or no sequence lines to draw!")
      }
      return
    }

    const timer = setTimeout(
      () => {
        setIndex((i) => {
          onFinishedEvent?.(lines[i], i)
          const next = i + 1

          if (lines.length == next) {
            onDone?.()
          }
          return next
        })
      },
      delay + Math.random() * variance,
    )

    return () => clearTimeout(timer)
  }, [index, lines, onDone, onFinishedEvent, delay, variance])

  return (
    <div>
      {lines.slice(0, index).map((line, i) => (
        <div key={`${i}-${line}`}>{line}</div>
      ))}
    </div>
  )
}

export const oldbootLines = [
  "[  OK  ] ROM betöltése...",
  "[  OK  ] Kernel modulok betöltése...",
  "[  OK  ] /dev/sda1 csatolása...",
  "[  OK  ] Hálózati interfészek aktiválása...",
  "[  OK  ] D.I.M.A 3850 csomópont kézfogás elindítva...",
  "[  OK  ] Távoli hozzáférés engedélyezve",
  "...",
  "Keretrendszer csatlakoztatása folyamatban...",
]
