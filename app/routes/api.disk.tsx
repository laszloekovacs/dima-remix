import { readdir, cp } from "node:fs/promises"
import os from "node:os"
import { useFetcher } from "react-router"
import z from "zod"
import { asyncExec } from "~/utils/exec.server"
import type { Route } from "./+types/api.disk"


const floopyActions = [ "mount" , "unmount", "read", "format", "copy" ] as const

// action can have the following values
const formSchema = z.object({
  action: z.enum(["mount", "umount", "read", "format", "copy"]),
})

export default function FloppyActions() {
  const fetcher = useFetcher()

  return (
    <div className="p-5">
      <h1 className="mb-4">Floppy Műveletek</h1>

      <fetcher.Form method="post">
        <div className="flex flex-row gap-2 mb-4">
          <input
            className="border p-2"
            type="submit"
            name="action"
            value="mount"
          />
          <input
            className="border p-2"
            type="submit"
            name="action"
            value="umount"
          />
          <input
            className="border p-2"
            type="submit"
            name="action"
            value="read"
          />
          <input
            className="border p-2"
            type="submit"
            name="action"
            value="format"
          />
          <input
            className="border p-2"
            type="submit"
            name="action"
            value="copy"
          />
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

export const action = async ({ request }: Route.ActionArgs) => {
  const formObject = Object.fromEntries(await request.formData())
  const actionData = await formSchema.parseAsync(formObject)

  // for good measure, log
  console.log(actionData)

  // do nothing if not on linux
  if (os.platform() !== "linux") return { action: actionData.action }

  switch (actionData.action) {
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
  }
}
