import SystemLayout from "app/components/system-layout"
import { useCallback, useMemo } from "react"
import { formatStopwatch, useCountdown } from "~/hooks/useCountdown"
///import { useCountdownTimer } from "~/hooks/useCountdownTimer"
import useSlideshow from "~/hooks/useSlideshow"

export default function TestingRoute(): React.ReactNode {
  const phrases = useMemo(() => ["hello", "world", "wide", "web"], [])
  const slide = useSlideshow(phrases, 1000)

  const report = useCallback(() => console.log("done"), [])

  const stopwatch = useCountdown({ seconds: 8 }, report)

  return (
    <div>
      <SystemLayout
        heading={
          <div className="warning-stripes background-animation">
            предупреждение, нарушение
          </div>
        }
        main={
          <div>
            <div>
              <img src="https://www.picsum.dev/400/300" alt="temp" />
            </div>
            <p className="blink-slow">very cool</p>
            <p>{slide}</p>
          </div>
        }
        commandLine={<div></div>}
      />
      <span>{stopwatch && formatStopwatch(stopwatch).asString}</span>
    </div>
  )
}
