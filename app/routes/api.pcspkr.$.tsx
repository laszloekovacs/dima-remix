import os from "node:os"
import { useFetcher } from "react-router"
import { asyncExec } from "~/utils/exec.server"
import type { Route } from "./+types/api.pcspkr.$"

const beepPatterns = ["standard"] as const

// create a page to generate types
export default function BeepPage() {
  const fetcher = useFetcher()

  return (
    <>
      <h1 className="mb-4">PC speaker</h1>

      <fetcher.Form method="post">
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
      </fetcher.Form>
    </>
  )
}

export async function action({ request }: Route.ActionArgs) {
  const data = await request.formData()
  const jsonform = Object.fromEntries(data)
  // parse with zod?

  console.log(jsonform)

  // only try to call on linux
  if (os.platform() !== "linux") return

  await asyncExec("beep -f 500")
}
