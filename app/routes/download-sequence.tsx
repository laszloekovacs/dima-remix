import { useNavigate } from "react-router"
import { useCountdownTimer } from "~/hooks/useCountdownTimer"

export default function DownloadSqeuence() {
  const navigate = useNavigate()

  const [timeleft, sixtieths] = useCountdownTimer({
    targetDate: new Date("2025.11.11"),
    onComplete: () => navigate("/download-complete"),
  })

  return (
    <div className="p-8">
      <div className="warning-stripes background-animation p-4 grid place-content-center">
        <div className="bg-black p-4">
          <p className="text-amber-700 text-center">
            Adatok betöltése szalagról
          </p>
        </div>
      </div>
      <div className="text-6xl text-amber-700">
        <p>Hátralévő idő:</p>
        <p>
          {timeleft.toTimeString()}:{sixtieths}
        </p>
      </div>
    </div>
  )
}
