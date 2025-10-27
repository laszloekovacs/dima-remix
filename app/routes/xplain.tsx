import { useEffect } from "react"
import type { Route } from "./+types/xplain"
import { Form, Link, NavLink, Outlet, useActionData } from "react-router"

/*
export async function loader({ params }: Route.LoaderArgs) {
    console.log("server loader")

    return {
        message: "data from server loader"
    }
}
*/
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    // pl fetch
    return {
        message: "data from client Loader"
    }
}


export async function action({ params, request }: Route.ActionArgs) {
    console.log("server action")

    const formdata = await request.formData()
    const intent = formdata.get("intent")

    console.log(`intent was: ${intent}`)

    const random = Math.floor(Math.random() * 256)

    return {
        value: random
    }
}


export function HydrateFallback() {
    console.log("hydrating...")
    return (
        <div>
            <p>loading...</p>
        </div>
    )
}


export default function ExamplePage({ loaderData }: Route.ComponentProps) {
    const { message } = loaderData
    const data = useActionData()

    console.log("page component")

    useEffect(() => {
        console.log("inside useEffect")
    }, [])

    return (
        <div>
            <Link to="/" className="bg-amber-400">vissza a folapra</Link>
            <NavLink to="inner" className="bg-neutral-200">belso lap</NavLink>
            <NavLink to="/xplain" className="bg-amber-200">kulso lap</NavLink>
            <hr />

            <h1>Hello world</h1>
            <p>{message}</p>

            <Form method="post">
                <input type="hidden" value="generate" name="intent" />
                <button className="border-2 p-2">increase</button>
            </Form>

            <p>action data is: {data?.value} </p>


            <Outlet />
        </div>
    )
}