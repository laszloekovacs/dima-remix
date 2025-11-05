import SystemLayout from "app/components/system-layout"
import TapeStatusIndiactor from "~/components/tape-status"
import { useCountdownTimer } from "~/hooks/useCountdownTimer"

const target: Date = new Date(Date.now() + 30 * 60 * 1000)

export default function TestingRoute(): React.ReactNode {
  const timeleft = useCountdownTimer({ targetDate: target })
  const sixtieths = Math.floor((timeleft.getMilliseconds() / 1000) * 60) // 0–59

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
          </div>
        }
        commandLine={
          <div>
            <span>{timeleft.toUTCString()}</span>
            <span>ms: {sixtieths}</span>
          </div>
        }
      />
    </div>
  )
}
