import { AxiosError } from "axios";
import { useCustomContext } from "../context/DataContext";
import Feed from "./Feed";

/* type HomeProps = {
  posts: PostType[];
  isLoading: boolean;
  fetchError: any;
}; */

const Home /* : React.FC<HomeProps> */ = () => {
  const { searchResults: posts, isLoading, fetchError } = useCustomContext();

  return (
    <main className="w-full flex-grow overflow-y-auto bg-[#fff]">
      {isLoading && <p className="mt-8 font-bold text-center">.....Loading</p>}
      {!isLoading && fetchError && (
        <p className="mt-8 font-bold text-center text-[red]">
          {fetchError instanceof AxiosError && `${fetchError?.response?.status}:${fetchError?.response?.data}`}
          {fetchError instanceof Error && fetchError.message}
        </p>
      )}
      {!isLoading &&
        !fetchError &&
        (posts.length ? (
          <Feed posts={posts} />
        ) : (
          <p className="mt-8 font-bold text-center"> No posts to display </p>
        ))}
    </main>
  );
};

export default Home;
