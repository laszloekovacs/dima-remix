import { useHotkeys } from "react-hotkeys-hook"
import { useNavigate } from "react-router"

export default function StartCopyScreen() {
  const navigate = useNavigate()
  useHotkeys("escape", () => navigate("/tape"))

  return <p>copy screen</p>
}
