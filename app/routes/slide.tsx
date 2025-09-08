import { readdir } from "node:fs/promises"
import type { Route } from "./+types/slide"
import { useEffect, useState } from "react"
import styles from "../slide.module.css"


export async function loader() {
    // gererate a list of file names in the slides folder
    try {
        const path = "./public/slides"
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
        }, 2000);

        return () => clearInterval(interval)
    }, [files])

    const src = resolvePath(files[index])

    return (
        <div className={styles.container}>
            <div className={styles.dialog_container}>
                <div className={styles.dialog}>
                    <p>Keresés: kulcsszó</p>
                </div>
            </div>
            <div>
                <img src={src ?? null} alt={src ?? "missing file"} width="100%" />
            </div>
            <CodeFlash files={files} />
        </div>
    )
}




const CodeFlash = ({ files }: { files: string[] }) => {
    const [code, setCode] = useState<string[]>([])

    useEffect(() => {
        const interval = setInterval(() => {
            // generate an array of random strings 
            const randomStrings = Array.from({ length: 8 }, () =>
                Math.random().toString(36).slice(2)
            );

            setCode(randomStrings)
        }, 600)

        return () => clearInterval(interval)
    }, [])

    return (
        <ul>
            {code.map((c) => (
                <li>{c}</li>
            ))}
        </ul>
    )

}