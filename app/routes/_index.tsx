import { useEffect, useRef } from "react"
import { useNavigate } from "react-router"

export default function Home() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("login")
  }

  const buttonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    buttonRef.current?.focus()
  }, [])

  return (
    <div className="min-h-screen min-w-screen grid place-content-center">
      <div className="text-sm">
        <p>DIMA távoli adatelérés terminál</p>
        <button
          type="button"
          onClick={handleClick}
          ref={buttonRef}
          onBlur={() => buttonRef.current?.focus()}
        >
          folytatáshoz nyomja meg az Enter-t
        </button>
      </div>
    </div>
  )
}
