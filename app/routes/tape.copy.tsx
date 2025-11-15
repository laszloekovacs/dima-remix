import { useCallback } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { useFetcher, useNavigate } from "react-router"

export default function StartCopyScreen() {
  const navigate = useNavigate()
  useHotkeys("escape", () => navigate("/tape"))
  useHotkeys("enter", () => handleCopyToDisk())

  const fetcher = useFetcher()

  const handleCopyToDisk = async () => {
    await fetch("/tape/copy", { method: "post" })
    console.log("ok")
  }

  return (
    <div>
      <p>másolás floppyra</p>
    </div>
  )
}

export const action = () => {
  console.log("action")
}
