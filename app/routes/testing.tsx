import fs from "node:fs/promises"
import path from "node:process"
import type { Route } from "./+types/testing"

export const loader = async () => {
  const images = await fs.readdir(`${path.cwd()}/public/slides`)

  return images
}

export default function TestingRoute({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <p>hello</p>
    </div>
  )
}
