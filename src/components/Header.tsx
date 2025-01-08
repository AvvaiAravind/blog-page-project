import { ReactElement } from "react";
import { FaLaptop, FaMobileAlt, FaTabletAlt } from "react-icons/fa";
import useWindowSize from "../hooks/useWindowSize";

type HeaderProps = {
  title?: string;
};

const Header = ({
  title = "React Blog Project",
}: HeaderProps): ReactElement => {
  const windowSize = useWindowSize();

  return (
    <header className="w-full bg-[#66d8f5] p-3 flex justify-between items-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      {windowSize && windowSize.width < 768 ? (
        <FaMobileAlt className="text-4xl" />
      ) : windowSize && windowSize.width < 992 ? (
        <FaTabletAlt className="text-4xl" />
      ) : (
        <FaLaptop className="text-4xl" />
      )}
    </header>
  );
};

export default Header;
