import { useEffect } from "react"
import type { Route } from "./+types/xplain"

export async function loader({ params }: Route.LoaderArgs) {
    console.log("server loader")

    return {
        message: "hello from loader"
    }
}


export async function action({ params }: Route.ActionArgs) {
    console.log("server action")

    return {
        status: "ok"
    }
}


export function HydrateFallback() {
    return (
        <div>
            <p>loading...</p>
        </div>
    )
}


export default function ExamplePage() {
    console.log("page component")

    useEffect(() => {
        console.log("inside useEffect")
    }, [])

    return (
        <div>
            <h1>Hello world</h1>
        </div>
    )
}