import { useFetcher } from "react-router"
import { z } from "zod"
import type { ErrorResult } from "~/utils/apiresult.server"
import { safeCp, safeReaddir } from "~/utils/diskops.server"
import { asyncExec, asyncSafeExec } from "~/utils/exec.server"
import type { Route } from "./+types/api.disk.$"

const floppyActions = ["mount", "umount", "read", "format", "copy"] as const
//type ExecResult = Awaited<ReturnType<typeof asyncExec>>

export default function FloppyActions() {
  const fetcher = useFetcher()

  return (
    <>
      <h1 className="mb-4">Floppy Műveletek</h1>

      <fetcher.Form method="post">
        <div className="flex flex-row gap-2 mb-4">
          {floppyActions.map((action) => (
            <input
              key={action}
              className="p-1 border"
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

export const action = async ({ params }: Route.ActionArgs) => {
  // check if params * is in floppyActions
  const action = z.parse(z.enum(floppyActions), params["*"])

  switch (action) {
    case "mount":
      return await asyncSafeExec("mount /mnt/floppy")

    case "umount":
      return await asyncSafeExec("umount /mnt/floppy")

    case "format": {
      await asyncExec("umount /mnt/floppy")
      return await asyncExec("mkfs.vfat /dev/fd0")
    }

    case "read":
      return await safeReaddir("/mnt/floppy")

    case "copy": {
      // set disk content directory
      const dataDir = `${process.cwd()}/public/diskdata`

      // ensure mounting the floppy
      await asyncExec("mount /mnt/floppy")

      // copy files over
      return await safeCp(dataDir, "/mnt/floppy", {
        force: true,
        recursive: true,
      })
    }

    default:
      return { status: "error", message: "bad request" } satisfies ErrorResult
  }
}
