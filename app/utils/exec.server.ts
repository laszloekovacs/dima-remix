import { promisify } from "node:util"
import { exec, fork } from "node:child_process"
import type { ActionResult } from "./apiresult.server"
import { unknown } from "zod"



// call exec for one shot calls, fork for long running tasks with updates
export const asyncFork = promisify(fork)

export const asyncExec = promisify(exec)

// exec with apiresult types

export async function asyncSafeExec(cmd: string): Promise<ActionResult<string>> {
    try {
        const result = await asyncExec(cmd)

        // in case the program exits with non zero code, result doesn't have a code member
        // it needs further investigation 
        if(result.stderr.length != 0) {
            return {
                status: "error",
                stderr: result.stderr,
                stdout: result.stdout,
                message: "error occured, check stderr",
                code: "EXEC_ERROR_CODE"
            }
        } else {
            return {
                status: "success",
                data: result.stdout.trim()
            }
        }
    } catch (err: any) {
        return {
            status: "error",
            message: err.message || "unknown error",
            stderr: err.stderr || "",
            stdout: err.stdout || "",
            code: "EXEC_THREW"
        }
    }
}

