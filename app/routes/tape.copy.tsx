import { useCallback } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { useNavigate } from "react-router"

export default function StartCopyScreen() {
  const navigate = useNavigate()
  useHotkeys("escape", () => navigate("/tape"))

  // const handleWriteToDisc = useCallback(() => {})

  return <p>copy screen</p>
}
