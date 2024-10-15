import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="px-4 md:px-[105px] py-12 md:w-[320px] h-full bg-[#F5F5F5] border-r border-black/10 drop-shadow">
      <ul className="space-y-10">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-green-500 text-lg md:text-2xl font-medium' : 'text-lg md:text-2xl font-medium'}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'text-green-500 text-lg md:text-2xl font-medium' : 'text-lg md:text-2xl font-medium'}>
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/setting" className={({ isActive }) => isActive ? 'text-green-500 text-lg md:text-2xl font-medium' : 'text-lg md:text-2xl font-medium'}>
            Setting
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar;