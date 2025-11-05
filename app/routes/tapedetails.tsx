import { useHotkeys } from "react-hotkeys-hook"
import { useNavigate } from "react-router"
import SystemLayout from "~/components/system-layout"

export default function TapeSelectionScreen() {
  return (
    <SystemLayout
      heading={<p>dima konzol</p>}
      main={<DetailsScreen />}
      commandLine={<KeyCommands />}
    />
  )
}

const DetailsScreen = () => {
  return (
    <div>
      <p>Kiválasztott szalag: "Химера"</p>
      <p>загруженные данные: 452Kb</p>

      <p>Внимание! Память практически исчерпана</p>
      <hr />
      <p>1. dokumentum kinyomtatása</p>
      <p>2. lemezmásolat készítése</p>
    </div>
  )
}

const KeyCommands = () => {
  const navigate = useNavigate()

  useHotkeys("1", () => navigate("/startcopy"))
  useHotkeys("2", () => navigate("/print"))

  return (
    <div>
      <p>parancsok: 1: nyomtatás, 2: másolás</p>
    </div>
  )
}
