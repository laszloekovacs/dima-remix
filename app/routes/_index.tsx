import { useHotkeys } from "react-hotkeys-hook"
import { IoMdStar } from "react-icons/io"
import { useNavigate } from "react-router"

const NEXT_SCREEN = "/boot"

export default function Home() {
  const navigate = useNavigate()
  useHotkeys("enter", () => navigate(NEXT_SCREEN))
  useHotkeys("space", () => navigate(NEXT_SCREEN))

  return (
    <div className="min-h-screen min-w-screen grid place-content-center">
      <div>
        <div className="flex flex-row justify-center">
          <IoMdStar className="w-12 h-12 text-white mb-6 opacity-25" />
        </div>

        <p className="mb-4 text-center">DIMA távoli adatelérés terminál</p>
        <p>
          folytatáshoz nyomja meg az{" "}
          <span className="bg-amber-500 text-black">Enter</span> billentyűt
        </p>
      </div>
    </div>
  )
}
