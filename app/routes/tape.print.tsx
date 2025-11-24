import { useHotkeys } from "react-hotkeys-hook"
import { useFetcher, useNavigate } from "react-router"
import { asyncSafeExec } from "~/utils/exec.server"
import type { Route } from "./+types/tape.print"

const DOCUMENT_PATH = "~/dima-remix/public/assets/kimera_ff.pdf"
const CODE_PATH = "~/dima-remix/public/assets/code.txt"

export default function PrintScreen() {
  const navigate = useNavigate()
  const fetcher = useFetcher()

  // Escape always works
  useHotkeys("escape", () => navigate("/tape"))
  /*
  // Only allow Enter if not already submitting
  useHotkeys("enter", () => {
    if (fetcher.state === "idle") {
      fetcher.submit(null, { method: "post" })
    }
  })
*/
  useHotkeys("a", () => {
    if (fetcher.state == "idle") {
      fetcher.submit({ intent: "kimera" }, { method: "post" })
    }
  })

  useHotkeys("b", () => {
    if (fetcher.state == "idle") {
      fetcher.submit({ intent: "code" }, { method: "post" })
    }
  })

  // Optional: show feedback
  const message = fetcher.data?.message
  const isError = fetcher.data?.status === "error"

  return (
    <div className="flex flex-col justify-between flex-1">
      <div>
        <p>nyomtatás menu</p>
        {fetcher.state === "submitting" && (
          <p className="bg-amber-500 text-black">Nyomtatás folyamatban...</p>
        )}
        {message && <p className="text-amber-500">{message}</p>}
      </div>
      {/* bottom key shortcuts menu */}
      <div>
        <p>
          <span className="bg-amber-500 text-black">a</span> - "Kimera"
          dokumentum nyomtatása
        </p>
        <p>
          <span className="bg-amber-500 text-black">b</span> - 6/2 kód
          nyomtatása
        </p>
        <hr />
        <p>
          <span className="bg-amber-500 text-black">ESC</span> - vissza a
          műveletek menübe
        </p>
      </div>
    </div>
  )
}

// Server action
export const action = async ({ request }: Route.ActionArgs) => {
  // figure out what document to print
  const formObject = Object.fromEntries(await request.formData())

  // quick hack, decide what to print
  let fileToPrint = DOCUMENT_PATH

  if (formObject.intent == "code") {
    console.log("printing code")
    fileToPrint = "code.txt"
  } else {
    console.log("printing kimera")
  }

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
      `lp ${fileToPrint}`, // Adjust path as needed
    )

    if (printResult.status === "error") {
      return {
        status: "error",
        message: `A nyomtatás sikertelen: ${printResult.stderr}`,
      }
    }

    /*
    // Optional: Check print queue
    const queueResult = await asyncSafeExec("lpstat -o")
    if (queueResult.status === "error") {
      return {
        status: "warning", // Not critical but worth noting
        message:
          "A dokumentum nyomtatásra került, de nem sikerült ellenőrizni a sorban állást.",
      }
    }
*/
    return {
      status: "success",
      message: "Sikeres nyomtatási feladat.",
    }
  } catch (error) {
    console.error("Unexpected error in print action:", error)
    return { status: "error", message: "Váratlan hiba történt a szerveren." }
  }
}
