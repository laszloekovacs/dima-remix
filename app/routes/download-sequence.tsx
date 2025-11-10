import { useNavigate } from "react-router"
import { useCountdownTimer } from "~/hooks/useCountdownTimer"

export default function DownloadSqeuence() {
  const navigate = useNavigate()

  // check if target date is not set
  if (null == localStorage.getItem("download.targetDate")) {
    // load sequence length from settings if set or default
    const duration = localStorage.getItem("settings.downloadDuration") || 5000

    // create a date that is (duration) away in the future

    // store it in local storage
    localStorage.setItem("download.targetDate", duration.toString())
  }

  const handleCompletion = () => {
    // send a beep to server

    // set completion on localstorage
    localStorage.setItem("download.complete", "true")

    // go to completion screen
    navigate("/download-complete")
  }

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
