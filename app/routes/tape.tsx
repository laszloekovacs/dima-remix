import { useHotkeys } from "react-hotkeys-hook"
import { Outlet, useNavigate } from "react-router"

export default function TapeOperations() {
  return (
    <div className="p-8 min-h-screen">
      <div className="mb-6">
        <p>Adatszalag műveletek</p>
        <p>Kiválasztott szalag: "Химера"</p>
        <p>загруженные данные: 452Kb</p>
        <p>Внимание! Память практически исчерпана</p>
      </div>

      <hr />
      <div className="my-4">
        <Outlet />
      </div>
    </div>
  )
}
