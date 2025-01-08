import { Link, useNavigate } from "react-router-dom";

type NavProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const Nav: React.FC<NavProps> = ({ search, setSearch }) => {
  const navigate = useNavigate();
  return (
    <nav className="w-full bg-[#333] flex flex-col justify-start items-center">
      <form
        className="w-full pt-4 pl-3 sm:flex sm:justfy-between sm:items-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="absolute -left-[1000px]" htmlFor="search">
          Search Posts
        </label>
        <input
          className="font-inherit w-[80%] sm:w-[60%] min-h-12 text-base p-1 rounded outline-none"
          type="text"
          id="search"
          placeholder="Search Posts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ul className="text-[#fff] list-none flex flex-nowrap items-center mt-1 ml-1">
          <li
            className="hover:bg-[#eee] hover:text-[#333] text-[#fff] p-4 hover:p-4 focus:p-4 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Link className="hover:cursor-pointer focus:cursor-pointer" to="/">
              Home
            </Link>
          </li>
          <li
            className="hover:bg-[#eee] hover:text-[#333] text-[#fff] p-4 hover:p-4 focus:p-4 cursor-pointer"
            onClick={() => navigate("/post")}
          >
            <Link
              className="hover:cursor-pointer focus:cursor-pointer"
              to="/post"
            >
              Post
            </Link>
          </li>
          <li
            className="hover:bg-[#eee] hover:text-[#333] text-[#fff] p-4 hover:p-4 focus:p-4 cursor-pointer"
            onClick={() => navigate("/about")}
          >
            <Link
              className="hover:cursor-pointer focus:cursor-pointer"
              to="/about"
            >
              About
            </Link>
          </li>
        </ul>
      </form>
    </nav>
  );
};

export default Nav;
