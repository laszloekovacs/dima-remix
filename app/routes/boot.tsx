import { useNavigate } from "react-router"
import { bootEvents, useSequence } from "~/hooks/useSequence"

export default function BootSequence() {
  const navigate = useNavigate()

  const handleDone = () => {
    setTimeout(() => {
      navigate("/tapedetails")
    }, 2000)
  }

  const index = useSequence(bootEvents.length, handleDone, () => {}, 100, 600)

  return (
    <div className="flex min-h-screen justify-center align-middle bg-amber-950 text-amber-500">
      <div className="h-screen[50%]  w-[80ch] p-8 ">
        <p>Rendszer indítása</p>
        {bootEvents.slice(0, index).map((bootEvents, i) => (
          <p key={`${i}-${bootEvents}`}>{bootEvents}</p>
        ))}
      </div>
    </div>
  )
}
