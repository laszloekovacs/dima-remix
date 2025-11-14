import { useFetcher } from "react-router"
import z from "zod"
import { db } from "~/utils/kvstore.server"
import type { Route } from "./+types/api.kvstore"

export default function KVStorePage() {
  const fetcher = useFetcher()

  return (
    <div>
      <h1 className="mb-2">KV Store</h1>
      <fetcher.Form method="post">
        <label>
          <span>rossz jelszó lezárás ideje, percben:</span>
          <input type="number" name="lockdownDuration" />
        </label>
      </fetcher.Form>
    </div>
  )
}

export const action = async ({ request }: Route.ActionArgs) => {
  const actionObject = Object.fromEntries(await request.formData())

  const settingsSchema = z.object({
    lockdownDuration: z.string(),
  })

  const action = z.parse(settingsSchema, actionObject)

  await db.put("lockdownDuration", action.lockdownDuration.toString())

  const result = await db.get("lockdownDuration")

  console.log(result)
  return
}
