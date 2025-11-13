import type { ActionResult } from "./apiresult.server";
import {readdir, cp } from "node:fs/promises"

// node file operation wrappers

async function safeReaddir(path: string): Promise<ActionResult<string[]>> {
  try {
    const files = await readdir(path);
    return { status: "success", data: files };
  } catch (err: any) {
    return {
      status: "error",
      message: `Failed to read directory: ${err.message}`,
      code: "READDIR_ERROR",
    };
  }
}

async function safeCp(src: string, dest: string, options: Parameters<typeof cp>[2]): 
  Promise<ActionResult<void>> {
  try {
    await cp(src, dest, options);
    return { status: "success", data: undefined };
  } catch (err: any) {
    return {
      status: "error",
      message: `Copy failed: ${err.message}`,
      code: "CP_ERROR",
    };
  }
}