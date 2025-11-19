import { useHotkeys } from "react-hotkeys-hook"
import { useNavigate } from "react-router"

export default function TapeSelectionScreen() {
  const navigate = useNavigate()

  useHotkeys("1", () => navigate("print"))
  useHotkeys("2", () => navigate("copy"))

  return (
    <div className="flex flex-col justify-end flex-1">
      <p>nyomjon meg egy gombot az almenühöz:</p>
      <p>
        <span className="bg-amber-500 text-black px-2">1</span> - nyomtatás
      </p>
      <p>
        <span className="bg-amber-500 text-black px-2">2</span> - másolás
        floppyra
      </p>
    </div>
  )
}
