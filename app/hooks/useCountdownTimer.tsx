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

  const sixtieths = Math.floor((timeLeft.getMilliseconds() / 1000) * 60) // 0–59

  return [timeLeft, sixtieths] as const
}
