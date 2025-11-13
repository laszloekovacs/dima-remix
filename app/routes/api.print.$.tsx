import { asyncSafeExec } from "~/utils/exec.server"
import type { Route } from "./+types/api.print.$"
import { z } from "zod"
import { useFetcher } from "react-router"

// to print:
// lp file.txt

// print queue
// lpq

// status
// lpstat -p
const documentToPrint = `${process.cwd()}/public/diskdata/kimera.txt`

const printActions = ["print", "status"] as const

export default function PrintApi() {
  const fetcher = useFetcher()

  return (
    <div>
      <h1>printing api</h1>
      <fetcher.Form method="post">
        {printActions.map((action) => (
          <input
            className="p-1 border"
            key={action}
            type="submit"
            name="action"
            value={action}
            formAction={action}
          />
        ))}
      </fetcher.Form>

      <div>
        {fetcher?.data && (
          <div>
            <pre>{JSON.stringify(fetcher.data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

export const action = async ({ params }: Route.ActionArgs) => {
  const action = z.parse(z.enum(printActions), params["*"])

  console.log("print action")

  switch (action) {
    case "print":
      return await asyncSafeExec(`lp ${documentToPrint}`)

    case "status":
      return await asyncSafeExec("plstat -p")
  }
}
