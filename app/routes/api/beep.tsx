export async function action({ request }: Route.ActionArgs) {
  return {
    status: "ok",
  }
}

// create a page to generate types
export default function BeepPage() {
  return (
    <div>
      <p>hello</p>
    </div>
  )
}
