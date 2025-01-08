import { ReactElement } from "react";
import { Link } from "react-router-dom";

const About = (): ReactElement => {
  return (
    <main className="w-full flex-grow p-4 overflow-y-auto bg-[#fff] text-center">
      <h2 className="mb-4 font-bold text-xl">About</h2>
      <p className="mt-4">
        This blog app is a project in the Learn React tutorial series.
      </p>
      <p>
        <Link to="/" className="text-blue-500 hover:underline">
          Visit the Homepage
        </Link>
      </p>
    </main>
  );
};

export default About;
