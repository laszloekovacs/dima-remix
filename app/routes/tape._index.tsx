import { useHotkeys } from "react-hotkeys-hook"
import { useNavigate } from "react-router"

export default function TapeSelectionScreen() {
  const navigate = useNavigate()

  useHotkeys("1", () => navigate("print"))
  useHotkeys("2", () => navigate("copy"))

  return (
    <div>
      <p>1. nyomtatás</p>
      <p>2. másolás floppyra</p>
    </div>
  )
}
