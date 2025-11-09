import os from "node:os"
import { useFetcher } from "react-router"
import z from "zod"
import { asyncExec } from "~/utils/exec.server"
import type { Route } from "./+types/api.disk"

export default function FloppyActions() {
  const fetcher = useFetcher()

  return (
    <div>
      <h1>Floppy Muveletek</h1>

      <fetcher.Form method="post">
        <input
          className="border p-2"
          type="submit"
          name="action"
          value="mount"
        />
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

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData()
  const formObject = Object.fromEntries(formData)

  // action can have the following values
  const formSchema = z.object({
    action: z.enum(["read", "format", "copy", "mount"]),
  })

  const actionData = await formSchema.parseAsync(formObject)

  // for good measure, log
  console.log(actionData)

  // do nothing if not on linux
  if (os.platform() !== "linux") return { result: "ok" }

  const result = await asyncExec("mount /dev/fd0 /mnt/floppy")

  return result
}
