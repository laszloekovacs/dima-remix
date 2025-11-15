import { useCallback } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { useFetcher, useNavigate } from "react-router"
import { asyncSafeExec } from "~/utils/exec.server"

export default function StartCopyScreen() {
  const navigate = useNavigate()
  useHotkeys("escape", () => navigate("/tape"))
  useHotkeys("enter", () => handleCopyToDisk())

  const fetcher = useFetcher()

  const handleCopyToDisk = async () => {
    await fetch("/tape/copy", { method: "post" })
    // fetcher.submit

    console.log("ok")
  }

  return (
    <div>
      <p>másolás floppyra</p>
    </div>
  )
}

export const action = async () => {
  console.log("action")
  // check if mounted, if empty line, disk isnt mounted
  const result = await asyncSafeExec("grep fd0 /proc/mounts")

  if (result.status == "error") {
    return "hiba történt, van floppy a meghajtóban?"
  }

  // it's mounted, copy files
  if (result.status == "success" && result.data.length == 0) {
    const copyResult = await asyncSafeExec("cp ~/public/diskdata /mnt/floppy")

    // unmount after done
    const umountResult = await asyncSafeExec("umount /mnt/floppy")

    if (copyResult.status == "success") {
      return "sikeres másolás"
    }
  }
}
