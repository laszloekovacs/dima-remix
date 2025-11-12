import { useNavigate } from "react-router"
import { useSequence, bootEvents } from "~/hooks/useSequence"

export default function BootSequence() {
  const navigate = useNavigate()
  const index = useSequence(bootEvents.length, () => navigate("/tapedetails"))

  return (
    <div>
      <p>booting</p>
      <div>
        {bootEvents.slice(0, index).map((bootEvents, i) => (
          <div key={`${i}-${bootEvents}`}>{bootEvents}</div>
        ))}
      </div>
    </div>
  )
}
