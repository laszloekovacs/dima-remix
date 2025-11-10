import SystemLayout from "app/components/system-layout"
import { useMemo } from "react"
import { useCountdownTimer } from "~/hooks/useCountdownTimer"
import useSlideshow from "~/hooks/useSlideshow"

const target: Date = new Date(Date.now() + 30 * 60 * 1000)

export default function TestingRoute(): React.ReactNode {
  const [timeLeft, sixtieths] = useCountdownTimer({ targetDate: target })
  const phrases = useMemo(() => ["hello", "world", "wide", "web"], [])
  const slide = useSlideshow(phrases, 1000)
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
        commandLine={
          <div>
            <span>{timeLeft.toUTCString()}</span>
            <span>:{sixtieths.toString()}</span>
          </div>
        }
      />
    </div>
  )
}
