import fs from "node:fs/promises"
import path from "node:process"
import { ConstrainScreen } from "~/components/hydrate-fallback"
import type { Route } from "./+types/testing"

export const loader = async () => {
  const images = await fs.readdir(`${path.cwd()}/public/slides`)

  return images
}

export default function TestingRoute({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <ConstrainScreen>
        <p>hello</p>
      </ConstrainScreen>
    </div>
  )
}
