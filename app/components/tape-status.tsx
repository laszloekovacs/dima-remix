import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { useRef } from "react"

export default function TapeStatusIndiactor() {
  gsap.registerPlugin(useGSAP)
  const timeline = useRef<gsap.core.Timeline>(null)

  useGSAP(() => {})

  return <div></div>
}
