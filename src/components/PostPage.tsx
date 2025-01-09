import { AxiosError } from "axios";
import { ReactElement } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../api/posts";
import { useCustomContext } from "../context/DataContext";

/* type PostPageProps = {
  posts: PostType[];
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
}; */

const PostPage = (): ReactElement => {
  const { posts, setPosts, setEditPost } = useCustomContext();

  const { id } = useParams<{ id: string }>();

  const post = posts.find((post) => post.id === id);

  const navigate = useNavigate();

  // functions

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await axiosInstance.delete(`/posts/${id}`);
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
      navigate("/");
      toast.success("Post deleted successfully");
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        toast.error(`${error.response.status}: ${error.response.data}`);
      } else if (error instanceof Error) {
        console.log("Error", error.message);
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  const handleEdit = (id: string): void => {
    const postToEdit = posts.find((post) => post.id === id);

    if (postToEdit) {
      setEditPost(postToEdit);
      navigate(`/edit/${id}`, { state: { post: postToEdit, isEdit: true } });
    }
  };

  return (
    <main className="w-full flex-grow p-4 overflow-y-auto bg-[#fff]">
      <article className="mt-4 pb-4 border-b border-solid border-[lightgray] first:mt-0 last:border-b-0">
        {post ? (
          <>
            <h2 className="mb-4 font-bold text-xl">{post.title}</h2>
            <p className="text-[0.75rem] mt-1">{post.datetime}</p>
            <p className="mt-4 mb-4">{post.body}</p>
            <div className="flex justify-between">
              <button
                type="button"
                className="h-12 min-w-12 rounded p-2 text-base bg-[black] text-[#fff] cursor-pointer "
                onClick={() => handleEdit(post.id)}
              >
                Edit Post
              </button>
              <button
                type="button"
                className="h-12 min-w-12 rounded p-2 text-base bg-[red] text-[#fff] cursor-pointer "
                onClick={() => handleDelete(post.id)}
              >
                Delete Post
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="mb-4 font-bold text-xl">Post not found</h2>
            <p>
              <Link to="/" className="text-blue-500 hover:underline">
                Visit the Homepage
              </Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
