import { readdir, cp } from "node:fs/promises"
import os from "node:os"
import { useFetcher } from "react-router"
import z from "zod"
import { asyncExec } from "~/utils/exec.server"
import type { Route } from "./+types/api.disk"


const floppyActions = [ "mount" , "unmount", "read", "format", "copy" ] as const

export default function FloppyActions() {
  const fetcher = useFetcher()

  return (
    <div className="p-5">
      <h1 className="mb-4">Floppy Műveletek</h1>

      <fetcher.Form method="post">
        <div className="flex flex-row gap-2 mb-4">
          {floppyActions.map((action)=> 
            <input className="border p-1" type="submit" name="action" value={action} formAction={action}  />
          )}
        </div>
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

export const action = async ({ request, params }: Route.ActionArgs) => {

}

