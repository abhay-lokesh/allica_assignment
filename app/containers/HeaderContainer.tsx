import { Heart } from "lucide-react";
import { NavLink } from "react-router";

const HeaderContainer = () => {
  return (
    <header className="top-0 z-20 sticky flex justify-between bg-linear-to-r from-orange-600 to-orange-500 shadow-md px-4 py-2 border-b-amber-700 w-full text-white">
      <nav className="flex justify-between sm:justify-start gap-2 w-full transition-all">
        <h1 className="flex items-center font-mono font-bold text-lg sm:text-xl">
          <NavLink to={"/"} className="pr-2">
            Star Wars
          </NavLink>
        </h1>
        <a
          className="-left-96 focus:left-1/2 z-50 absolute focus:bg-white opacity-0 focus:opacity-100 focus:text-black focus:-translate-x-1/2"
          href="#main_content"
        >
          Skip to main Content
        </a>
        {/* <div className="flex justify-items-center"> */}
        <NavLink
          to="/favorite"
          className="flex items-center gap-2 hover:opacity-85 focus:opacity-85 px-1 sm:px-3 py-1 sm:py-1 text-base sm:text-lg cursor-pointer"
        >
          <span className="hidden sm:inline font-medium">Favorite</span>
          <Heart className="sm:hidden w-[1em] h-[1em]" />
        </NavLink>
        {/* </div> */}
      </nav>
    </header>
  );
};

export default HeaderContainer;
