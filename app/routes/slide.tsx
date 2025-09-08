import { readdir } from "node:fs/promises"
import type { Route } from "./+types/slide"

const path = "./public/slides"


export async function loader() {
    // gererate a list of file names in the slides folder
    try {
        const files = await readdir(path)

        for (const file of files)
            console.log(file)

        return files
    } catch (err) {
        console.error(err)
        return []
    }
}

export function HydrateFallback() {
    return <div>Loading...</div>;
}

export default function Slide({ loaderData }: Route.ComponentProps) {
    const files = loaderData

    return (
        <div>
            <p>slide</p>
        </div>
    )
}