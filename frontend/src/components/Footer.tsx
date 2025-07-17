import { Link } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { RiTwitterXLine } from "react-icons/ri";


const Footer = () => {
  return (
    <footer className=" bg-[#111827] text-ExtraDarkColor rounded-t-3xl mt-8 md:mt-0">
      <div className=" text-white flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">


      

<div>
  <h1 className="ml-14 font-semibold text-3xl pb-4 text-white">
    {/* Social Media */}
  </h1>
  <div className="flex gap-5 ml-12">
    {/* Facebook */}
    <Link to="">
      <FaFacebook
        size={32}
        className="hover:scale-110 cursor-pointer transition duration-300 ease-in-out"
      />
    </Link>

    {/* Twitter */}
    <Link to = "" >
      <RiTwitterXLine
        size={32}
        className="hover:scale-110 cursor-pointer transition duration-300 ease-in-out"
      />
    </Link>

    {/* YouTube */}
    <Link to="">
      <FaYoutube
        size={32}
        className=""
      />
    </Link>
  </div>
</div>


        <div>
          <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">
          Jubia
          </h1>
          <nav className=" flex flex-col gap-2">
            <Link
              to="/"
              className=" hover:scale-105 cursor-pointer transition duration-300 ease-in-out"
            >
              About us
            </Link>
            <Link
              to="/"
              className=" hover:scale-105 cursor-pointer transition duration-300 ease-in-out"
            >
              News
            </Link>
            <Link
              to="/"
              className=" hover:scale-105 cursor-pointer transition duration-300 ease-in-out"
            >
              Support
            </Link>
          </nav>
        </div>


        <div className=" w-full md:w-1/4">

      
          <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Contact Us</h1>
          <nav className=" flex flex-col gap-2">
            <Link to="/">E-mail : jubia.com</Link>

            <Link to="/">+12346789</Link>
          </nav>
        </div>


        
      </div>



      <div>

        
        <p className=" text-white text-center py-4">
          @Copy Right Jubia 2025
           | All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;


