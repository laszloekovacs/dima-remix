import os from "node:os"

import type { Route } from "./+types/api.beep"
import { useFetcher } from "react-router"

export async function action({ request }: Route.ActionArgs) {
  const data = await request.formData()
  const jsonform = Object.fromEntries(data)
  // parse with zod?

  console.log(jsonform)

  // only try to call on linux
  if (os.platform() !== "linux") return

  return
}
export async function loader() {}

// create a page to generate types
export default function BeepPage() {
  const fetcher = useFetcher()

  return (
    <div>
      <fetcher.Form method="post">
        <select name="preset">
          <option value="affirmative">affirmative</option>
          <option value="tripple">tripple</option>
        </select>

        <input type="submit" value="submit" />
      </fetcher.Form>
    </div>
  )
}
