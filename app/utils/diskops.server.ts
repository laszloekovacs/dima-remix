import { cp, readdir } from "node:fs/promises"
import type { ActionResult } from "./apiresult.server"

// node file operation wrappers

export async function safeReaddir(
  path: string,
): Promise<ActionResult<string[]>> {
  try {
    const files = await readdir(path)
    return { status: "success", data: files }
  } catch (err: any) {
    return {
      status: "error",
      message: `Failed to read directory: ${err.message}`,
      code: "READDIR_ERROR",
    }
  }
}

export async function safeCp(
  src: string,
  dest: string,
  options: Parameters<typeof cp>[2],
): Promise<ActionResult<void>> {
  try {
    await cp(src, dest, options)
    return { status: "success", data: undefined }
  } catch (err: any) {
    return {
      status: "error",
      message: `Copy failed: ${err.message}`,
      code: "CP_ERROR",
    }
  }
}
