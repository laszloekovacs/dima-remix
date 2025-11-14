import fs from "node:fs/promises"
import path from "node:process"
import { useCallback, useMemo } from "react"
import { formatStopwatch, useCountdown } from "~/hooks/useCountdown"
import useSlideshow from "~/hooks/useSlideshow"
import type { Route } from "./+types/testing"

export const loader = async () => {
  const images = await fs.readdir(`${path.cwd()}/public/slides`)

  return images
}

export default function TestingRoute({ loaderData }: Route.ComponentProps) {
  const slide = useSlideshow(loaderData, 1000)

  const report = useCallback(() => console.log("done"), [])

  const stopwatch = useCountdown({ seconds: 8 }, report)

  return (
    <div>
      <p className="blink-slow">very cool</p>

      <span>{stopwatch && formatStopwatch(stopwatch).asString}</span>

      <div className="w-[400px]">
        <img src={`/slides/${slide}`} alt={slide} />
      </div>
    </div>
  )
}
