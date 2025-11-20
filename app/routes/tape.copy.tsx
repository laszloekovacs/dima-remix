// app/routes/tape.copy.tsx (or wherever your route is)

import { useHotkeys } from "react-hotkeys-hook"
import { ImFloppyDisk } from "react-icons/im"
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
    <div className="flex flex-col justify-between flex-1">
      <div>
        <div className="flex flex-row gap-4 justify-center">
          <ImFloppyDisk />
        </div>
        {fetcher.state === "submitting" && (
          <p className="blink-slow">Másolás folyamatban...</p>
        )}
        {fetcher.state === "idle" && !message && (
          <p className="text-orange-500 text-center">helyezzen be egy lemezt</p>
        )}
        {message && (
          <p style={{ color: isError ? "red" : "green" }}>{message}</p>
        )}
      </div>

      {/* bottom key shortcuts menu */}
      <div>
        <p>
          <span className="bg-amber-500 text-black">ENTER</span>- Másolás
          megkezdése
        </p>
        <p>
          <span className="bg-amber-500 text-black">ESC</span> - vissza a
          műveletek menübe
        </p>
      </div>
    </div>
  )
}

export const action = async () => {
  try {
    // --- Step 1: Try to mount the floppy ---
    const mountResult = await asyncSafeExec("mount /mnt/floppy")
    if (mountResult.status === "error") {
      return {
        status: "error",
        message:
          "Nem sikerült csatolni a floppyt. Lehet, hogy nincs lemez a meghajtóban.",
      }
    }

    // --- Step 2: Copy files ---
    const copyResult = await asyncSafeExec(
      "cp -r ~dima-remix/public/diskdata/* /mnt/floppy",
    )
    if (copyResult.status === "error") {
      return {
        status: "error",
        message: `A másolás sikertelen: ${copyResult.stderr}`,
      }
    }

    return {
      status: "success",
      message: "A másolás sikeres. vegye ki a lemezt",
    }
  } catch (err) {
    console.error("Unexpected error:", err)
    return { status: "error", message: "Váratlan hiba történt a szerveren." }
  } finally {
    // --- Always try to unmount (best-effort) ---
    await asyncSafeExec("umount /mnt/floppy").catch(() => {})
  }
}
