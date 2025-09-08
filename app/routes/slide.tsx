import { readdir } from "node:fs/promises"
import type { Route } from "./+types/slide"
import { useEffect, useState } from "react"

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

const resolvePath = (filename: string) => {
    return "./slides/" + filename
}

export default function Slide({ loaderData }: Route.ComponentProps) {
    const files = loaderData
    const [index, setIndex] = useState(() => Math.floor(Math.random() * files.length))


    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => {
                let next = prev + 1

                // cap next
                if (next >= files.length)
                    next = 0

                return next
            })
        }, 1000);

        return () => clearInterval(interval)
    }, [files])

    const src = resolvePath(files[index])

    return (
        <div>
            <img src={src ?? null} alt={src ?? "missing file"} />
        </div>
    )
}