import { useEffect, useState } from "react"

// return a string, changes every n second
export default function useSlideshow(
  images: string[],
  frequency: number,
): string {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      // set current to the next image in the images array, set first if current > images.length

      setCurrent((prev) => (prev + 1) % images.length)
    }, frequency)

    return () => clearInterval(timer)
  }, [images, frequency])

  return images[current]
}
