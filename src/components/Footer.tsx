import { useCustomContext } from "../context/DataContext";
const Footer: React.FC = () => {
  const today: Date = new Date();
  const { posts } = useCustomContext();
  return (
    <footer
      className={`w-full bg-[#66d8f5] p-4 flex items-center ${
        posts ? "justify-evenly" : "justify-center"
      }`}
    >
      <p>
        Copyright &copy;
        <time dateTime={today.getFullYear().toString()}>
          {" "}
          {today.getFullYear()}{" "}
        </time>{" "}
      </p>
      <p>{posts && `${posts.length} posts`}</p>
    </footer>
  );
};

export default Footer;
