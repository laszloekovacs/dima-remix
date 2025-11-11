import { Temporal } from "@js-temporal/polyfill"
import { useCallback, useEffect, useRef, useState } from "react"

// Remaining time with temporal
type DurationLike = Parameters<typeof Temporal.Duration.from>[0]

export const useCountdown = (duration: DurationLike, callback: () => void) => {
  const animRef = useRef<number | null>(null)
  const targetRef = useRef<Temporal.Instant>(
    Temporal.Now.instant().add(duration),
  )
  const [remainingTime, setRemainingTime] = useState<Temporal.Duration | null>(
    null,
  )

  const update = useCallback(() => {
    const now = Temporal.Now.instant()
    const remaining = now.until(targetRef.current)

    // Store in state so we can return it from the hook
    setRemainingTime(remaining)

    // If time is up, run callback, stop animation
    if (remaining.total("seconds") <= 0) {
      callback?.()
      if (animRef.current !== null) {
        cancelAnimationFrame(animRef.current)
        animRef.current = null
      }

      // Dont run another animation frame
      return
    }

    // Continue animation
    animRef.current = requestAnimationFrame(update)
  }, [callback])

  // Only needed to kick off animation chain or stopping it on unmount
  useEffect(() => {
    animRef.current = requestAnimationFrame(update)

    return () => {
      if (animRef.current !== null) {
        cancelAnimationFrame(animRef.current)
      }
    }
  }, [update])

  return remainingTime
}

export function formatStopwatch(duration: Temporal.Duration): string {
  // Pad hours,mins,seconds
  const hours = duration.hours.toString().padStart(2, "0")
  const minutes = duration.minutes.toString().padStart(2, "0")
  const seconds = duration.seconds.toString().padStart(2, "0")

  // Convert nanoseconds to centiseconds (0–59 range)
  const fractionalSeconds = duration.nanoseconds / 1e9
  const centiseconds = Math.floor(fractionalSeconds * 100) % 60
  const cs = centiseconds.toString().padStart(2, "0")

  return `${hours}.${minutes}.${seconds}.${cs}`
}
