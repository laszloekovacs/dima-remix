import { useEffect, useRef } from "react";
import type { Route } from "./+types/_index";
import { Form } from "react-router";

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
    <div>
      <div>
        DIMA
      </div>
      <Form method="post" >
        <label htmlFor="passcode">belépőkód</label>
        <input id="passcode" ref={inputRef} type="text" onBlur={handleBlur} />
      </Form>
    </div>
  )
}
