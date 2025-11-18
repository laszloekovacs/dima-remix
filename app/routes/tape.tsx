import { Outlet } from "react-router"

export default function TapeOperations() {
  return (
    <div className="p-16 leading-normal min-h-screen flex flex-col">
      <div className="mb-16 border-4 border-amber-500 border-dashed p-10">
        <p className="text-6xl mb-6">Adatszalag műveletek</p>
        <p>
          Beolvasott szalag: <span className="text-amber-500">"Химера"</span>
        </p>
        <p>
          загруженные данные: <span className="text-amber-500">452Kb</span>
        </p>
      </div>
      <Outlet />
    </div>
  )
}
