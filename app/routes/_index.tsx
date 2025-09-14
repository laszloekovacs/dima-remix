import { useEffect, useRef, useState } from "react";
import type { Route } from "./+types/_index";
import { Form, redirect } from "react-router";
import { useFetcher } from "react-router";


/**
 * should display a passcode input
 * keep focus on input
 * 3 tries. if failing send to lockdown page
 * on success, go to boot sequence
 */


export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null)
  const fetcher = useFetcher()
  const [attempts, setAttempts] = useState(3)

  useEffect(() => {
    // focus on render
    inputRef.current?.focus()
  }, [])

  // refocus on focus loss
  const handleBlur = () => {
    inputRef.current?.focus()
  }


  // decrement attempt number
  const handleSubmit = () => {
    setAttempts(t => --t)

    console.log("submit")
  }

  // when attempts reach 0, redirect to lockdown page

  return (
    <div>
      <div>
        <p>
          DIMA tavoli adat eleres terminal
        </p>
      </div>
      <Form method="POST" onSubmit={() => handleSubmit()}>
        <label htmlFor="passcode">belépőkód</label>
        <input type="hidden" name="attempts" value={attempts} />
        <input id="passcode" name="passcode" ref={inputRef} type="text" onBlur={handleBlur} placeholder="****" />
      </Form>
      <p>probalkozasok: <span>{attempts}</span></p>
    </div>
  )
}


export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const passcode = formData.get("passcode")
  const attempts = formData.get("attempts") as unknown as number

  console.log(`login attempt, ${attempts}`)

  if (passcode == "5435") {
    return redirect("boot")
  }

  if (attempts <= 1) {
    return redirect("lockdown")
  }
}