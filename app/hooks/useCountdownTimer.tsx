import { useEffect, useRef, useState } from "react"

function getRemainingTime(endTime: Date) {
  const now = Date.now()
  const totalMs = new Date(endTime).getTime() - now
  const clamped = Math.max(0, totalMs)
  return new Date(clamped)
}

export function useCountdownTimer({
  targetDate,
  onComplete,
}: {
  targetDate: Date
  onComplete?: () => void
}) {
  const [timeLeft, setTimeLeft] = useState(() => getRemainingTime(targetDate))
  const rafRef = useRef(0)

  useEffect(() => {
    const update = () => {
      const remaining = getRemainingTime(targetDate)
      setTimeLeft(remaining)

      // trigger callback when time goes to 0
      if (remaining.getTime() <= 0) {
        onComplete?.()
        return
      }

      // consecutive updates are called here
      rafRef.current = requestAnimationFrame(update)
    }

    // fire off first update in the chain of events
    rafRef.current = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafRef.current)
  }, [targetDate, onComplete])

  const sixtiethsRaw = Math.floor((timeLeft.getMilliseconds() / 1000) * 60) // 0–59

  // pad with zero if less than 9
  const sixtieths =
    sixtiethsRaw < 10 ? `0${sixtiethsRaw}` : sixtiethsRaw.toString()

  return [timeLeft, sixtieths] as const
}
