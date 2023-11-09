import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap font-sans">
            <span className="text-slate-500">Jospont</span>
            <span className="text-state-700">Estate</span>
          </h1>
        </Link>
        <form
          action=""
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex gap-4 justify-center items-center">
          <Link to={"/"}>
            <li className="hidden sm:inline text-slate-700 cursor-pointer">
              Home
            </li>
          </Link>
          <Link to={"/about-us"}>
            <li className="hidden sm:inline text-slate-700 cursor-pointer">
              About
            </li>
          </Link>
          <Link to={"/profile"}>
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="profile"
                className="w-[40px] h-[40px] object-cover self-center rounded-full"
              />
            ) : (
              <li className="hidden sm:inline text-slate-700 cursor-pointer">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
