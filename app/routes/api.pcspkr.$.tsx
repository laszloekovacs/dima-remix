import { useFetcher } from "react-router"
import z from "zod"
import { asyncSafeExec } from "~/utils/exec.server"
import type { Route } from "./+types/api.pcspkr.$"

const beepPatterns = [
  "standard",
  "oneuptwodown",
  "inthemiddle",
  "baseline",
  "boot",
] as const

// create a page to generate types
export default function BeepPage() {
  const fetcher = useFetcher()

  return (
    <>
      <h1 className="mb-4">PC speaker</h1>

      <fetcher.Form method="post">
        <div className="flex flex-row gap-1">
          {beepPatterns.map((action) => (
            <input
              className="p-1 border hover:text-amber-500 active:bg-sky-50"
              key={action}
              type="submit"
              name="action"
              value={action}
              formAction={action}
            />
          ))}
        </div>
      </fetcher.Form>

      <div>
        {fetcher?.data && (
          <div>
            <pre>{JSON.stringify(fetcher.data, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  )
}

// possible parameters are Frequency, Lenght, New, Delay, Repeat

export async function action({ params }: Route.ActionArgs) {
  const action = z.parse(z.enum(beepPatterns), params["*"])

  console.log(`beep: ${action}`)

  switch (action) {
    case "standard":
      return await asyncSafeExec("beep")

    case "oneuptwodown":
      return await asyncSafeExec("beep -f 800 -n -f 500 -r 2")

    case "inthemiddle":
      return await asyncSafeExec("beep -f 600 -n -f 400 -n -f 600")

    case "baseline":
      return await asyncSafeExec("beep -f 300 -r 5")

    default:
      return await asyncSafeExec("beep")
  }
}
