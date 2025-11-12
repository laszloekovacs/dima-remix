import { useNavigate } from "react-router"
import { useSequence, bootEvents } from "~/hooks/useSequence"

export default function BootSequence() {
  const navigate = useNavigate()
  
  const handleDone = () => {
    setTimeout(()=> {navigate("/tapedetails")}, 2000)
  }
  
  const index = useSequence(bootEvents.length, handleDone)

  
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
