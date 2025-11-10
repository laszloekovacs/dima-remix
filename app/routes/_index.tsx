import { useHotkeys } from "react-hotkeys-hook"
import { useNavigate } from "react-router"

export default function Home() {
  const navigate = useNavigate()
  useHotkeys("enter", () => navigate("login"))

  return (
    <div className="min-h-screen min-w-screen grid place-content-center">
      <div>
        <p className="mb-4">DIMA távoli adatelérés terminál</p>
        <p>
          folytatáshoz nyomja meg az <span>Enter</span> billentyűt
        </p>
      </div>
    </div>
  )
}
