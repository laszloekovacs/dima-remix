import { useFetcher } from "react-router"
import type { Route } from "./+types/api.disk.$"
import { z } from "zod"
import { asyncExec } from "~/utils/exec.server"
import { readdir, cp } from "node:fs/promises"

const floppyActions = [ "mount" , "umount", "read", "format", "copy" ] as const
type ExecResult = Awaited<ReturnType<typeof asyncExec>>


export default function FloppyActions() {
  const fetcher = useFetcher()

  return (
    <div className="p-5">
      <h1 className="mb-4">Floppy Műveletek</h1>

      <fetcher.Form method="post">
        <div className="flex flex-row gap-2 mb-4">
          {floppyActions.map((action)=> 
            <input key={action} className="border p-1" type="submit" name="action" value={action} formAction={action}  />
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
  
  // check if params * is in floppyActions
  const action = z.parse(z.enum(floppyActions), params['*'])

  switch(action) {
    case "mount": 
      return await asyncExec("mount /mnt/floppy")
      
    case "umount":
      return await asyncExec("umount /mnt/floppy")

        case "read":
      return await readdir("/mnt/floppy")

    case "format": {
      await asyncExec("umount /mnt/floppy")
      return await asyncExec("mkfs.vfat /dev/fd0")
    }

    case "copy": {
      const dataDir = `${process.cwd()}/public/diskdata`

      // ensure mounting the floppy
      await asyncExec("mount /mnt/floppy")

      // copy files over
      return await cp(dataDir, "/mnt/floppy", { force: true, recursive: true })
    }
  

    default:
      return {status: "unsupported action"}

  }
}

