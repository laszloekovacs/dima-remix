import { useFetcher, useNavigate } from "react-router"
import { bootEvents, useSequence } from "~/hooks/useSequence"

const NEXT_SCREEN = "/login"

export default function BootSequence() {
  const navigate = useNavigate()
  const fetcher = useFetcher()

  // move to next phase after a small delay
  const handleDone = () => {
    setTimeout(() => {
      fetcher.submit({}, { method: "post", action: "/api/pcspkr/boot" })
      navigate(NEXT_SCREEN)
    }, 2000)
  }

  const index = useSequence(bootEvents.length, handleDone, () => {}, 100, 600)

  return (
    <div className="flex min-h-screen justify-center align-middle bg-amber-950 text-amber-500 p-16 overflow-hidden">
      <div className="w-full">
        <p className="blink-slow bg-black">Rendszer indítása - kérem várjon</p>
        {bootEvents.slice(0, index).map((bootEvents, i) => (
          <p key={`${i}-${bootEvents}`}>{bootEvents}</p>
        ))}
      </div>
    </div>
  )
}
