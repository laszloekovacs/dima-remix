import { useHotkeys } from "react-hotkeys-hook"
import { useNavigate } from "react-router"

const NEXT_PAGE = "/carousel"

export default function TransferNotifyPage() {
  const navigate = useNavigate()

  useHotkeys("enter", () => {
    navigate(NEXT_PAGE)
  })

  return (
    <div className="p-24 min-h-screen overflow-hidden grid place-content-center bg-amber-950 leading-normal">
      <div className="text-amber-500">
        <h1 className="text-8xl text-amber-500">Внимание!</h1>
        <p>Adatszalag betöltése hosszú időt vehet ígénybe!</p>
        <p>
          Átvitel indításához nyomja meg az{" "}
          <span className="bg-amber-500 text-black">ENTER</span> billentyűt
        </p>
      </div>
    </div>
  )
}
