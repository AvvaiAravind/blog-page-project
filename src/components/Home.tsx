import { PostType } from "./App";
import Feed from "./Feed";

type HomeProps = {
  posts: PostType[];
  isLoading: boolean;
  fetchError: any;
};

const Home: React.FC<HomeProps> = ({ posts, isLoading, fetchError }) => {
  return (
    <main className="w-full flex-grow p-4 overflow-y-auto bg-[#fff]">
      {isLoading && <p className="mt-8 font-bold text-center">.....Loading</p>}
      {fetchError && (
        <p className="mt-8 font-bold text-center text-[red]">
          {fetchError?.response?.data}
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
