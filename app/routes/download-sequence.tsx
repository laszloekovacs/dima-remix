import { useNavigate } from "react-router"
import { useCountdownTimer } from "~/hooks/useCountdownTimer"
import { Temporal } from "@js-temporal/polyfill"

export default function DownloadSqeuence() {
  const navigate = useNavigate()

  // check if target date is not set
  if (null == localStorage.getItem("download.targetDate")) {
    // create a time set 2 minutes in the future
    const target = Temporal.Now.plainTimeISO().add({ minutes: 2 })
    console.log(target)

    // store it in local storage
    localStorage.setItem("download.targetDate", target.toString())
  }

  const handleCompletion = () => {
    // send a beep to server

    // clear the target time set in ls
    localStorage.removeItem("download.targetDate")

    // go to completion screen
    navigate("/download-complete")
  }

  const [timeleft, sixtieths] = useCountdownTimer({
    targetDate: new Date(),
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
