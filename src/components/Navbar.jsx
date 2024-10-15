import { Link, NavLink } from "react-router-dom";

import userIcon from "./../assets/user-ts.svg";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, loading, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        return toast.success('User Logged Out!', {
          style: { marginTop: "100px" }
        })
      })
  }

  const navLinks = <>
    {
      (!loading && user) && (
        <>
          <li className="p-2 bg-green-600 rounded-full cursor-pointer relative group">
            <img src={userIcon} alt={user?.displayName} />
            <div className="hidden group-hover:block absolute -left-24 md:left-0 top-16 z-20 px-8 py-4 bg-green-200 text-nowrap rounded-sm drop-shadow-lg">
              Welcome, {user?.displayName}
            </div>
          </li>
          <li>
            <NavLink to="/updatepassword" className="text-base font-medium">
              Update Password
            </NavLink>
          </li>
          <li>
            <button onClick={handleLogOut} className="py-2 px-8 bg-red-600 text-white rounded-sm">LogOut</button>
          </li>
        </>
      )
    }
    {
      (!loading && !user) && (
        <>
          <li className="p-2 bg-green-600 rounded-full cursor-pointer relative group">
            <img src={userIcon} alt="Guest" />
            <div className="hidden group-hover:block absolute top-16 z-20 px-8 py-4 bg-green-200 text-nowrap rounded-sm drop-shadow-lg">
              Welcome, Guest
            </div>
          </li>
          <li>
            <h4 className="text-sm md:text-base font-medium">
              Guest Account
            </h4>
          </li>
          <li>
            <NavLink to="/login" className="py-2 px-8 bg-green-600 text-white text-sm md:text-base rounded-sm">
              Login
            </NavLink>
          </li>
        </>
      )
    }
  </>
  return (
    <nav className="py-8 px-4 xl:px-0 w-full bg-[#F5F5F5] border-b border-black/10 shadow-lg">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-y-5">
        <h1 className="text-green-600 text-2xl font-bold tracking-[1px]">
          <Link to="/">Grocery Buddy</Link>
        </h1>
        <ul className="flex flex-col md:flex-row justify-end items-center gap-3 md:gap-6">
          {navLinks}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;