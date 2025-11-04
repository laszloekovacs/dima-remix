import { useHotkeys } from "react-hotkeys-hook"
import { useNavigate } from "react-router"

// hotkeys available trough the whole system
export default function SystemKeys({
  children,
}: {
  children: React.ReactNode
}) {
  const navigate = useNavigate()

  useHotkeys("ctrl+0", () => navigate("/settings"))

  return <div>{children}</div>
}
