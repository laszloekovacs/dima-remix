import { Outlet } from "react-router"

export default function TapeOperations() {
  return (
    <div className="p-16 min-h-screen">
      <div className="mb-16 border-4 border-amber-500 border-dashed p-10">
        <p className="text-6xl mb-6">Adatszalag műveletek</p>
        <p>
          Kiválasztott szalag: <span className="text-amber-500">"Химера"</span>
        </p>
        <p>
          загруженные данные: <span className="text-amber-500">452Kb</span>
        </p>
        <p>
          <span className="text-red-500">Внимание!</span> Память практически
          исчерпана
        </p>
      </div>

      <div className="mb-16">
        <Outlet />
      </div>
    </div>
  )
}
