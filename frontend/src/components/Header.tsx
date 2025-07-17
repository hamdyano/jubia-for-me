import { Link } from "react-router-dom";
//import MobileNav from "./MobileNav";
//import MainNav from "./MainNav";
import transLogo from "../assets/transLogo.png";

const Header = () => {
  return (
    <div className=" bg-[#111827] py-4 text-white rounded-b-3xl shadow-lg mb-8">
      {/* Changed from "container" to "w-full" */}

      <div className="w-full flex justify-between items-center px-4 md:px-8">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex flex-col items-center text-center lg:ml-38"
        >
          <img
            src={transLogo}
            alt="Logo"
            className="h-28 w-auto md:h-36 lg:h-44 object-contain"
          />
        </Link>

        <span className="flex items-center space-x-4">
          <Link
            to="/sign-in"
            className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-orange-500 orange-100 hover:text-white transition duration-300 ease-in-out"
          >
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Header;

/*


        <span className="flex items-center space-x-4">
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
            >
              Sign In
            </Link>
          
        </span>

        */
