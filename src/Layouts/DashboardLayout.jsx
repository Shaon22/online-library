import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="flex">
            <div className="w-[20%] h-screen bg-cyan-400 list-none p-5 text-lg font-semibold space-y-3">
            <li>
                <NavLink to={'/'} className={({ isActive }) => (isActive ? 'text-cyan-400' : 'text-black')}>Home</NavLink>
            </li>
            <li>
                <NavLink to={'/dashboard/borrowed'} className={({ isActive }) => (isActive ? 'text-white' : 'text-black')}>Borrowed Books</NavLink>
            </li>
            <li>
                <NavLink to={'/dashboard/bought'} className={({ isActive }) => (isActive ? 'text-white' : 'text-black')}>Bought Books</NavLink>
            </li>
            <li>
                <NavLink to={'/orders'} className={({ isActive }) => (isActive ? 'text-cyan-400' : 'text-black')}>Orders</NavLink>
            </li>

        </div>
       <div className="flex-1">
       <Outlet></Outlet>
       </div>
        </div>
    );
};

export default DashboardLayout;