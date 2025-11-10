import type { Temporal } from "@js-temporal/polyfill"

// remaining time with temporal
type DurationLike = Parameters<typeof Temporal.Duration.from>[0]

export const useCountdown = (
  duration: DurationLike,
  callback: () => void,
): void => {
  // implementation
}
