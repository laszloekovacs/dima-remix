import { Temporal } from "@js-temporal/polyfill"
import { useCallback, useEffect, useRef } from "react"

// Remaining time with temporal
type DurationLike = Parameters<typeof Temporal.Duration.from>[0]

export const useCountdown = (duration: DurationLike, callback?: () => void) => {
  const animRef = useRef<number | null>(null)
  const targetRef = useRef<Temporal.Instant>(
    Temporal.Now.instant().add(duration),
  )
  const remainingTimeRef = useRef<Temporal.Duration>(
    Temporal.Now.instant().until(targetRef.current),
  )

  const update = useCallback(() => {
    const now = Temporal.Now.instant()
    remainingTimeRef.current = now.until(targetRef.current)

    // If time is up, run callback, stop animation
    if (remainingTimeRef.current.total("seconds") <= 0) {
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
    //targetRef.current = Temporal.Now.instant().add(duration)
    animRef.current = requestAnimationFrame(update)

    console.log("changing")

    return () => {
      if (animRef.current !== null) {
        cancelAnimationFrame(animRef.current)
      }
    }
  }, [update])

  return remainingTimeRef.current
}

export function formatStopwatch(duration: Temporal.Duration) {
  // balance out units
  const balanced = duration.round({ largestUnit: "hour" })

  // Pad hours,mins,seconds
  const hours = balanced.hours.toString().padStart(2, "0")
  const minutes = balanced.minutes.toString().padStart(2, "0")
  const seconds = balanced.seconds.toString().padStart(2, "0")
  const ms = balanced.milliseconds

  // hexatrigintiseconds (apparently that is what it is called)
  const msInSecond = ms % 1000 // 0–999
  const hs = Math.floor((msInSecond * 60) / 1000)
    .toString()
    .padStart(2, "0") // 0–59

  return {
    asString: `${hours}:${minutes}:${seconds}:${hs}`,
    hours,
    minutes,
    seconds,
    hs,
  }
}
