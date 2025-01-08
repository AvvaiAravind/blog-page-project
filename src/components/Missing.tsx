import { ReactElement } from "react";
import { Link } from "react-router-dom";

const Missing = (): ReactElement => {
  return (
    <main className="w-full flex-grow p-4 overflow-y-auto bg-[#fff]">
      <h2 className="mb-4 font-bold text-xl">No posts to display</h2>
      <p>
        <Link to="/" className="text-blue-500 hover:underline">
          Visit the Homepage
        </Link>
      </p>
    </main>
  );
};

export default Missing;
