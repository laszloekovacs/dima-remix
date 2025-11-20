import { useHotkeys } from "react-hotkeys-hook"
import type { HotkeysEvent } from "react-hotkeys-hook/packages/react-hotkeys-hook/dist/types"
import { useNavigate } from "react-router"

// hotkeys available trough the whole system
export default function SystemKeys({
  children,
}: {
  children: React.ReactNode
}) {
  const navigate = useNavigate()

  useHotkeys(
    ["alt+0", "alt+1", "alt+2", "alt+3", "alt+4"],
    (key: KeyboardEvent, hotkeysEvent: HotkeysEvent) => {
      console.log("hotkey pressed")
      switch (hotkeysEvent.hotkey) {
        case "alt+0":
          navigate("/api")
          break

        case "alt+1":
          navigate("/")
          break

        case "alt+2":
          navigate("/lockdown")
          break

        case "alt+3":
          navigate("/boot")
          break

        case "alt+4":
          navigate("/tape")
          break
      }
    },
  )

  return <div>{children}</div>
}
