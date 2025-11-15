import { type FormEvent, useCallback, useEffect, useRef, useState } from "react"
import { Form, useNavigate } from "react-router"

const DEFAULT_PASSCODE = "5435" //86426

const LoginPage = () => {
  const passcodeRef = useRef<HTMLInputElement | null>(null)
  const [count, setCount] = useState<number>(3)
  const navigate = useNavigate()
  const [hadFail, setFail] = useState<boolean>(false)

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

        navigate("/boot")
      } else {
        // decrease retries count
        setCount((c) => {
          const newCount = c - 1
          localStorage.setItem("passcode.count", newCount.toString())
          return newCount
        })

        // display a warning
        setFail(true)
      }
    },
    [navigate],
  )

  // check if we have retries left
  useEffect(() => {
    if (count <= 0) {
      console.log("Access denied - lockout")
      navigate("/lockdown")
    }
  }, [count, navigate])

  return (
    <div className="min-h-screen bg-black text-green-500 flex items-center justify-center p-6 font-mono">
      <div className="w-full max-w-xl border border-green-700 p-6">
        {/* Fejléc */}
        <div className="text-sm mb-4">
          <h1 className="text-6xl mb-2">★ Д.И.М.А 3850</h1>
          <p>Департамент Исследований и Мобильного Архива</p>
          <p>távoli adat központ terminál</p>
        </div>

        {/* Bejelentkezés */}
        <div className="mb-6">
          <label htmlFor="passcode" className="block text-sm mb-2">
            Belépőkód megadása:
          </label>
          <Form method="post" onSubmit={handleSubmit}>
            <input
              ref={passcodeRef}
              type="password"
              id="passcode"
              className="w-full bg-black border border-green-500 text-green-500 px-3 py-2 font-[Share_Tech_Mono] focus:outline-none focus:ring-2 focus:ring-green-700"
              placeholder="••••••••"
              onBlur={() => passcodeRef.current?.focus()}
              autoComplete="false"
            />
          </Form>
          {hadFail && (
            <p>sikertelen belépés! Hátralévő próbálkozások: {count}</p>
          )}
        </div>

        {/* Lábjegyzet */}
        <div className="text-xs my-6 border-t border-green-700 pt-4 space-y-1">
          <p>1985 Technológiai Fejlesztési Minisztérium, SZU.</p>
          <p>
            Dokumentum szám: 3850-12A | Kiadva: 1985. október 29. | Archív kód:
            STK-17/URZ
          </p>
          <p>"A hűség az intelligencia legmagasabb formája." — X Igazgatóság</p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
