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
  lines: number,
  onDone?: () => void,
  onFinishedEvent?: (index: number) => void,
  delay: number = 800,
  variance: number = 200,
) => {
  const [index, setIndex] = useState(0)

  // start the timeout that increases the index, run callback when done
  useEffect(() => {
    // short circuit if out of index or 0 array
    if (index >= lines || lines <= 0) {
      onDone?.()
      console.log("sequence done!")
      return
    }

    const timer = setTimeout(
      () => {
        setIndex((i) => {
          onFinishedEvent?.(i)
          const next = i + 1

          if (lines == next) {
            onDone?.()
          }
          return next
        })
      },
      delay + Math.random() * variance,
    )

    return () => clearTimeout(timer)
  }, [index, lines, onDone, onFinishedEvent, delay, variance])

  return index
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
