import { promisify } from "node:util"
import { exec, fork } from "node:child_process"

// call exec for one shot calls, fork for long running tasks with updates

export const asyncExec = promisify(exec)

export const asyncFork = promisify(fork)

