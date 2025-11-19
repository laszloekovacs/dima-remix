import { readdir } from "node:fs/promises"
import { useNavigate } from "react-router"
import { formatStopwatch, useCountdown } from "~/hooks/useCountdown"
import useSlideshow from "~/hooks/useSlideshow"
import type { Route } from "./+types/carousel"

const SLIDES_PATH = "/public/slides"
const NEXT_SCREEN = "/tape"

export const loader = async () => {
  // get image filenames from disk
  const slides = await readdir(process.cwd() + SLIDES_PATH)

  // read duration from kvstore or set default
  const duration = { minutes: 1 }

  return {
    duration,
    slides,
  }
}

export default function Carousel({ loaderData }: Route.ComponentProps) {
  const { duration, slides } = loaderData

  const navigate = useNavigate()

  const handleCountdownEnd = () => {
    navigate(NEXT_SCREEN)
  }

  const image = useSlideshow(slides, 800)
  const countdown = useCountdown(duration, () => handleCountdownEnd())

  return (
    <div className="h-screen w-screen p-16 overflow-hidden">
      <div
        className="w-full h-full grid place-content-center"
        style={{
          backgroundImage: `url(/slides/${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black text-amber-500 p-6 border-8 border-black leading-normal overflow-hidden">
          <p>Adatszalag betöltése</p>
          <p className="text-center bg-red-500 text-black text-9xl blink-slow">
            {formatStopwatch(countdown).asString}
          </p>
          <div className="h-5">
            <div className="background-animation warning-stripes"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
