import { Temporal } from "@js-temporal/polyfill"
import { useCallback, useEffect, useRef, useState } from "react"

type DurationLike = Parameters<typeof Temporal.Duration.from>[0]

export const useCountdownTimer = (
  duration: DurationLike,
  callback?: () => void,
) => {
  const animRef = useRef<number | null>(null)
  const targetRef = useRef<Temporal.Instant>(
    Temporal.Now.instant().add(Temporal.Duration.from(duration)),
  )
  const callbackRef = useRef(callback)
  const [remaining, setRemaining] = useState<Temporal.Duration>(() =>
    Temporal.Now.instant().until(targetRef.current),
  )

  // Keep callback ref fresh
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const update = useCallback(() => {
    const now = Temporal.Now.instant()
    const newRemaining = now.until(targetRef.current)

    // ✅ Always update ref for latest value
    // But only update state if time meaningfully changed (e.g. xx unit changed)
    const prevMs = remaining.total({ unit: "millisecond" })
    const newMs = newRemaining.total({ unit: "millisecond" })

    // 🚀 Optimization: Only re-render when the `xx` (1/60s) unit changes
    // Since you format to :xx (0–59), re-render every ~16.67ms is unnecessary.
    // Round to nearest 1/60th of a second (≈16.67ms) for smoother but efficient updates.
    const tickSizeMs = 1000 / 60 // ~16.6667
    const prevTick = Math.floor(prevMs / tickSizeMs)
    const newTick = Math.floor(newMs / tickSizeMs)

    if (newTick !== prevTick) {
      // Clamp to zero to avoid negative rendering
      setRemaining(newMs <= 0 ? Temporal.Duration.from({}) : newRemaining)
    }

    // Handle expiry
    if (newMs <= 0) {
      if (animRef.current !== null) {
        cancelAnimationFrame(animRef.current)
        animRef.current = null
      }
      setRemaining(Temporal.Duration.from({})) // ensure zero
      callbackRef.current?.()
      return
    }

    animRef.current = requestAnimationFrame(update)
  }, [remaining]) // depend on remaining to capture tick changes

  // Reset & start on duration change
  useEffect(() => {
    const newTarget = Temporal.Now.instant().add(
      Temporal.Duration.from(duration),
    )
    targetRef.current = newTarget

    // Reset state and kick off animation
    const newRemaining = Temporal.Now.instant().until(newTarget)
    setRemaining(newRemaining)

    if (animRef.current !== null) {
      cancelAnimationFrame(animRef.current)
    }
    animRef.current = requestAnimationFrame(update)

    return () => {
      if (animRef.current !== null) {
        cancelAnimationFrame(animRef.current)
        animRef.current = null
      }
    }
  }, [duration, update])

  return remaining
}
