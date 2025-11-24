import { useFetcher } from "react-router"
import z from "zod"
import { db } from "~/utils/kvstore.server"
import type { Route } from "./+types/api.kvstore"

const settingsSchema = z.object({
  lockdownDuration: z.coerce.number().int().min(1, "Must be at least 1 minute"),
  transferDuration: z.coerce.number().int().min(1, "Must be at least 1 minute"),
  passcode: z.string().min(2, "passcode should be at least 2 characters"),
  retries: z.coerce.number().int(),
})

//type Settings = z.infer<typeof settingsSchema>

export const loader = async () => {
  // load settings from kvstore and return them
  const settings = {
    lockdownDuration: (await db.get("lockdownDuration")) ?? "1",
    transferDuration: (await db.get("transferDuration")) ?? "1",
    passcode: (await db.get("passcode")) ?? "5435",
    retries: (await db.get("retries")) ?? "3",
  }

  return settings
}

export default function KVStorePage({ loaderData }: Route.ComponentProps) {
  const fetcher = useFetcher()

  return (
    <div className="mx-auto p-6 bg-white shadow rounded">
      <h1 className="mb-4 text-xl font-semibold">KV Store</h1>
      <fetcher.Form method="post" className="space-y-4">
        <div className="flex flex-col">
          <label
            htmlFor="lockdownDuration"
            className="mb-1 font-medium text-gray-700"
          >
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
          <label
            htmlFor="transferDuration"
            className="mb-1 font-medium text-gray-700"
          >
            átviteli időtartam, percben:
          </label>
          <input
            type="number"
            name="transferDuration"
            defaultValue={loaderData.transferDuration}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="passcode" className="mb-1 font-medium text-gray-700">
            belépőkód
          </label>
          <input
            type="number"
            name="passcode"
            defaultValue={loaderData.passcode}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="retries" className="mb-2 font-medium text-gray-700">
            próbálkozások
          </label>
          <input
            type="number"
            name="retries"
            defaultValue={loaderData.retries}
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
  console.warn(actionObject)
  const action = settingsSchema.parse(actionObject)

  await db.put("lockdownDuration", action.lockdownDuration.toString())
  await db.put("transferDuration", action.transferDuration.toString())
  await db.put("passcode", action.passcode.toString())
  await db.put("retries", action.passcode.toString())

  const result = {
    lockdownDuration: await db.get("lockdownDuration"),
    transferDuration: await db.get("transferDuration"),
    passcode: await db.get("passcode"),
    retries: await db.get("passcode"),
  }

  return result
}
