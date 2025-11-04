import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

export default function TapeStatusIndiactor() {
  gsap.registerPlugin(useGSAP)
  const timeline = useRef<gsap.core.Timeline>(null)

  useGSAP(() => {})

  return <div></div>
}
