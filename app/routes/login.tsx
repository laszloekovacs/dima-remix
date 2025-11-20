import { type FormEvent, useCallback, useEffect, useRef, useState } from "react"
import { Form, useNavigate } from "react-router"

const DEFAULT_PASSCODE = "86426" //86426
const NEXT_SCREEN = "/transfer"
const FAIL_SCREEN = "/lockdown"

const LoginPage = () => {
  const passcodeRef = useRef<HTMLInputElement | null>(null)
  const [count, setCount] = useState<number>(3)
  const navigate = useNavigate()

  // get localStorage value on client side only, useState is set on ssr too!
  useEffect(() => {
    const stored = Number(localStorage.getItem("passcode.count")) || count
    setCount(stored)
  })

  // focus to passcode input
  useEffect(() => {
    passcodeRef.current?.focus()
  }, [])

  // check code if it matches the one in the localstorage or default
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      // prevent sending it to backend
      e.preventDefault()

      // prevent submitting on empty value
      if (!passcodeRef.current?.value) return

      // use the local stored one or default
      const passcode = localStorage.getItem("dima.passcode") ?? DEFAULT_PASSCODE

      // compare codes
      if (passcode === passcodeRef.current?.value) {
        console.log("Access granted")

        // reset retries, no need but good to do
        localStorage.setItem("passcode.count", "3")

        navigate(NEXT_SCREEN)
      } else {
        // decrease retries count
        setCount((c) => {
          const newCount = c - 1
          localStorage.setItem("passcode.count", newCount.toString())
          return newCount
        })
      }
    },
    [navigate],
  )

  // check if we have retries left
  useEffect(() => {
    if (count <= 0) {
      console.log("Access denied - lockout")
      navigate(FAIL_SCREEN)
    }
  }, [count, navigate])

  return (
    <div className="min-h-screen text-green-500 flex items-center justify-center p-16 overflow-hidden">
      <div className="w-full max-w-6xl border-green-700 border-8 p-10">
        {/* Fejléc */}
        <div className="mb-4">
          <h1 className="text-6xl mb-2 text-center my-6">X29 лаборатория</h1>
          <p className="text-3xl text-center">Távoli adat központ terminál</p>
          <p className="text-3xl text-green-800 text-center">
            Департамент Исследований и Мобильного Архива
          </p>
        </div>

        {/* Bejelentkezés */}
        <div className="mb-6">
          <p className="mb-4 text-center">Belépőkód:</p>
          <Form method="post" onSubmit={handleSubmit} className="mb-4">
            <input
              ref={passcodeRef}
              type="text"
              id="passcode"
              className="mx-auto block bg-black border-4 border-green-500 text-green-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700 text-center"
              placeholder="••••••••"
              onBlur={() => passcodeRef.current?.focus()}
              autoComplete="false"
            />
          </Form>

          <p>Hátralévő próbálkozások: {count}</p>
        </div>

        {/* Lábjegyzet */}
        <div className="text-2xl my-6 border-t border-green-700 pt-4 space-y-1">
          <p>1985 Technológiai Fejlesztési Minisztérium, SZU.</p>
          <p>
            Dokumentum szám: 3850-12A | Kiadva: 1985. október 29. | Archív kód:
            STK-17/URZ
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
