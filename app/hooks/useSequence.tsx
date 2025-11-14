import { useEffect, useState } from "react"

export const bootEvents = [
  "загрузка загрузочной ROM",
  "нашел ДИМУ RОМ - 256Kb",
  "[OK] szovjet blokk régió nyelv modul: magyar",
  "[OK] ROM 256Kb betöltve",
  "[OK] hálózat /dev/net",
  "[OK] floppy meghajtó /dev/fd0",
  "[OK] nyomtató /dev/lp0",
  "[OK] merevlemez /dev/hd0",
  "[OK] titkosító biztonsági kulcs x29 csatlakozva",
  "Figyelem: megfigyelt kapcsolat",
  "Rendszer indul...",
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
