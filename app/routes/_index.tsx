import { useEffect, useRef } from "react";
import type { Route } from "./+types/_index";
import { Form, redirect } from "react-router";
import styles from "../index.module.css"

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "DIMA" },
    { name: "description", content: "Digital information matrix automation" },
  ];
}

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null)

  // focus on render
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // refocus on focus loss
  const handleBlur = () => {
    inputRef.current?.focus()
  }


  return (
    <div className={styles.layout}>
      <div>
        DIMA
      </div>
      <Form method="post" >
        <label htmlFor="passcode">belépőkód</label>
        <input id="passcode" name="passcode" ref={inputRef} type="text" onBlur={handleBlur} />
      </Form>
    </div>
  )
}


export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const passcode = formData.get("passcode")

  if (passcode == "5435") {
    return redirect("/main")
  }

  return redirect("/fail")
}