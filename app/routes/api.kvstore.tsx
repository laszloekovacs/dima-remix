import { useFetcher } from "react-router"
import z from "zod"
import { db } from "~/utils/kvstore.server"
import type { Route } from "./+types/api.kvstore"

export const loader = async () => {
  // load settings from kvstore and return them
  const settings = {
    lockdownDuration: (await db.get("lockdownDuration")) ?? "",
    transferDuration: (await db.get("transferDuration")) ?? "",
  }

  return settings
}

const settingsSchema = z.object({
  lockdownDuration: z.coerce.number().int().min(1, "Must be at least 1 minute"),
  transferDuration: z.coerce.number().int().min(1, "Must be at least 1 minute"),
})

export default function KVStorePage({ loaderData }: Route.ComponentProps) {
  const { lockdownDuration, transferDuration } = loaderData
  const fetcher = useFetcher()

  return (
    <div className="mx-auto p-6 bg-white shadow rounded">
      <h1 className="mb-4 text-xl font-semibold">KV Store</h1>
      <fetcher.Form method="post" className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">
            rossz jelszó lezárás ideje, percben:
          </label>
          <input
            type="number"
            name="lockdownDuration"
            defaultValue={loaderData.lockdownDuration}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">
            átviteli időtartam, percben:
          </label>
          <input
            type="number"
            name="transferDuration"
            defaultValue={loaderData.transferDuration}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Save
        </button>
        {fetcher.data && <pre>{JSON.stringify(fetcher?.data)}</pre>}
      </fetcher.Form>
    </div>
  )
}

export const action = async ({ request }: Route.ActionArgs) => {
  const actionObject = Object.fromEntries(await request.formData())
  const action = settingsSchema.parse(actionObject)

  await db.put("lockdownDuration", action.lockdownDuration.toString())
  await db.put("transferDuration", action.transferDuration.toString())

  const result = {
    lockdownDuration: await db.get("lockdownDuration"),
    transferDuration: await db.get("transferDuration"),
  }

  console.log(result)
  return result
}
