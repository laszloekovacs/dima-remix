// app/routes/print.tsx
import { useHotkeys } from "react-hotkeys-hook"
import { useFetcher, useNavigate } from "react-router"
import { asyncSafeExec } from "~/utils/exec.server"

const DOCUMENT_NAME = "kimera.pdf"

export default function PrintScreen() {
  const navigate = useNavigate()
  const fetcher = useFetcher()

  // Escape always works
  useHotkeys("escape", () => navigate("/tape"))

  // Only allow Enter if not already submitting
  useHotkeys("enter", () => {
    if (fetcher.state === "idle") {
      fetcher.submit(null, { method: "post" })
    }
  })

  // Optional: show feedback
  const message = fetcher.data?.message
  const isError = fetcher.data?.status === "error"

  return (
    <div className="flex flex-col justify-between flex-1">
      <div>
        <p>nyomtatás menu</p>
        {fetcher.state === "submitting" && <p>Nyomtatás folyamatban...</p>}
        {message && (
          <p style={{ color: isError ? "white" : "green" }}>{message}</p>
        )}
      </div>
      {/* bottom key shortcuts menu */}
      <div>
        <p>
          <span className="bg-amber-500 text-black">ENTER</span>- Nyomtatás
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

// Server action
export const action = async () => {
  try {
    // Verify printer is available
    const printerCheck = await asyncSafeExec("lpstat -p")
    if (printerCheck.status === "error") {
      return {
        status: "error",
        message: "Nem sikerült ellenőrizni a nyomtatót.",
      }
    }

    // Check if printer is accepting jobs
    if (
      !printerCheck.data.includes("enabled") &&
      !printerCheck.data.includes("idle")
    ) {
      return {
        status: "error",
        message: "A nyomtató nem elérhető vagy nem fogad be feladatokat.",
      }
    }

    // Print the document
    const printResult = await asyncSafeExec(
      `lp ${process.cwd()}/public/diskdata/${DOCUMENT_NAME}`, // Adjust path as needed
    )

    if (printResult.status === "error") {
      return {
        status: "error",
        message: `A nyomtatás sikertelen: ${printResult.stderr}`,
      }
    }

    // Optional: Check print queue
    const queueResult = await asyncSafeExec("lpstat -o")
    if (queueResult.status === "error") {
      return {
        status: "warning", // Not critical but worth noting
        message:
          "A dokumentum nyomtatásra került, de nem sikerült ellenőrizni a sorban állást.",
      }
    }

    return {
      status: "success",
      message: "Sikeres nyomtatási feladat.",
    }
  } catch (error) {
    console.error("Unexpected error in print action:", error)
    return { status: "error", message: "Váratlan hiba történt a szerveren." }
  }
}
