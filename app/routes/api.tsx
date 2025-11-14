import { NavLink, Outlet } from "react-router"

const links = ["pcspkr", "disk", "print"] as const

export default function ApiIndexPage() {
  return (
    <div className="p-6">
      <ul className="flex flex-row gap-2">
        {links.map((link) => (
          <li key={link}>
            <NavLink to={`/api/${link}`}>{link}</NavLink>
          </li>
        ))}
      </ul>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
