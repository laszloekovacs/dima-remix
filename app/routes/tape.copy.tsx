// app/routes/tape.copy.tsx (or wherever your route is)

import { useHotkeys } from "react-hotkeys-hook"
import { useFetcher, useNavigate } from "react-router"
import { asyncSafeExec } from "~/utils/exec.server"

export default function StartCopyScreen() {
  const navigate = useNavigate()
  const fetcher = useFetcher()

  // Escape always works
  useHotkeys("escape", () => navigate("/tape"))

  // Only allow Enter if not already submitting
  useHotkeys("enter", () => {
    if (fetcher.state === "idle") {
      fetcher.submit(null, { method: "post", action: "/tape/copy" })
    }
  })

  // Optional: show feedback
  const message = fetcher.data?.message
  const isError = fetcher.data?.status === "error"

  return (
    <div>
      <p>másolás floppyra</p>
      {fetcher.state === "submitting" && <p>Másolás folyamatban...</p>}
      {message && <p style={{ color: isError ? "red" : "green" }}>{message}</p>}
    </div>
  )
}

// Server action
export const action = async () => {
  try {
    // check if the mount exists by listing mounts
    const mountsResult = await asyncSafeExec("cat /proc/mounts")
    if (mountsResult.status === "error") {
      return {
        status: "error",
        message: "Nem sikerült ellenőrizni a meghajtókat.",
      }
    }

    if (!mountsResult.data.includes("/dev/fd0")) {
      return {
        status: "error",
        message: "Nincs floppy a meghajtóban, vagy nincs csatolva.",
      }
    }

    // Step 2: Perform copy
    const copyResult = await asyncSafeExec(
      "cp -r ~/public/diskdata/* /mnt/floppy/",
    )

    if (copyResult.status === "error") {
      // Try to unmount even if copy fails, to leave system in clean state
      await asyncSafeExec("umount /mnt/floppy").catch(() => {})
      return {
        status: "error",
        message: `A másolás sikertelen: ${copyResult.stderr}`,
      }
    }

    // Step 3: Unmount
    const umountResult = await asyncSafeExec("umount /mnt/floppy")
    if (umountResult.status === "error") {
      return {
        status: "error",
        message: `A másolás sikerült, de a lecsatolás nem: ${umountResult.stderr}`,
      }
    }

    return {
      status: "success",
      message: "Sikeres másolás és lecsatolás.",
    }
  } catch (error) {
    console.error("Unexpected error in action:", error)
    return { status: "error", message: "Váratlan hiba történt a szerveren." }
  }
}
