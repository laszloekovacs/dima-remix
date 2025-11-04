import SystemLayout from "app/components/system-layout"
import TapeStatusIndiactor from "~/components/tape-status"

export default function TestingRoute(): React.ReactNode {
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
            <div className="terminalify">
              <img src="https://www.picsum.dev/400/300" alt="temp" />
            </div>
            <p className="blink-slow">very cool</p>
          </div>
        }
        commandLine={<div>commands</div>}
      />
    </div>
  )
}
