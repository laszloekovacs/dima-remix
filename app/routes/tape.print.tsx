import { useHotkeys } from "react-hotkeys-hook"
import { useNavigate } from "react-router"

export default function PrintScreen() {
  const navigate = useNavigate()
  useHotkeys("escape", () => navigate("/tape"))

  return <p>print screen</p>
}
