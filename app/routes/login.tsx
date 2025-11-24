import { useEffect, useRef } from "react"
import { redirect, useFetcher } from "react-router"
import { db } from "~/utils/kvstore.server"
import type { Route } from "./+types/login"

//const DEFAULT_PASSCODE = "86426" //86426
const NEXT_SCREEN = "/transfer"
const FAIL_SCREEN = "/lockdown"

export const loader = async () => {
  // get passcode, retries from kvstore and pass it to the front end code
  const passcode = await db.get("passcode")
  const retries = await db.get("retries")

  return {
    passcode,
    retries,
  }
}

export default async function LoginPage({ loaderData }: Route.ComponentProps) {
  const fetcher = useFetcher()
  const passcodeRef = useRef<HTMLInputElement | null>(null)

  // focus to passcode input
  useEffect(() => {
    passcodeRef.current?.focus()
  }, [])

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
          <fetcher.Form method="post" className="mb-4">
            <input
              ref={passcodeRef}
              type="text"
              id="passcode"
              name="passcode"
              className="mx-auto block bg-black border-4 border-green-500 text-green-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700 text-center"
              placeholder="••••••••"
              onBlur={() => passcodeRef.current?.focus()}
              autoComplete="false"
            />
          </fetcher.Form>

          <p>Hátralévő próbálkozások: {loaderData.retries}</p>
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

export const action = async ({ request }: Route.ActionArgs) => {
  const actionObject = await Object.fromEntries(await request.formData())
  
  // compare passcode, if not matching, reduce retries, otherwise navigate to next page
  const passcode = await db.get("passcode")
  const retries = parseInt(await db.get("retries"))

  if(passcode != actionObject.passcode) {
    // reduce retries 
    const remaining = retries - 1
    await db.put("retries", (remaining).toString())

    // check if there's any left
    if(0 <= remaining) {
      return redirect(FAIL_SCREEN)
    }

    return {
      retries: retries -1 
    }
  }
  // reset retries
  await db.put("retries", "3")

  return redirect(NEXT_SCREEN)
}
