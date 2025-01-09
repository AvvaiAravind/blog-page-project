import { AxiosError } from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../api/posts";
import { useCustomContext } from "../context/DataContext";
import { PostType } from "./App";

/* type NewPostProps = {
  postTitle: string;
  setPostTitle: React.Dispatch<React.SetStateAction<string>>;
  postBody: string;
  setPostBody: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent, isEdit?: boolean, id?: string) => void;
}; */

const NewPost /* : React.FC<NewPostProps> */ = () => {
  // variables

  const [btnLoading, setIsBtnLoading] = useState(false);
  const [postTitle, setPostTitle] = useState<string>("");
  const [postBody, setPostBody] = useState<string>("");

  const {
    editPost,
    setEditPost,
    posts,
    setPosts,
  } = useCustomContext();

  const location = useLocation();

  const navigate = useNavigate();

  const state: { post?: PostType; isEdit?: boolean } = location.state;

  // use Effects

  useEffect(() => {
    if (state?.post && state?.isEdit) {
      setPostTitle(state.post.title);
      setPostBody(state.post.body);
    }
    return () => {
      setPostTitle("");
      setPostBody("");
    };
  }, [state]);

  // functions

  const handleSubmit = async (
    e: React.FormEvent,
    isEdit?: boolean,
    id?: string
  ): Promise<void> => {
    e.preventDefault();
    const datetime: string = format(new Date(), "MMM dd, yyyy hh:mm:ss a");
    if (isEdit && id && editPost) {
      try {
        const updatedPost: PostType = {
          id,
          title: postTitle,
          datetime,
          body: postBody,
        };
        await axiosInstance.put<PostType>(`/posts/${id}`, updatedPost);
        const filteredPosts: PostType[] = posts.filter(
          (post) => post.id !== id
        );
        const allPost: PostType[] = [...filteredPosts, updatedPost];
        setPosts(allPost);
        setPostTitle("");
        setPostBody("");
        setEditPost(null);
        navigate("/");
        toast.success("Post edited successfully");
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
      } finally {
        setIsBtnLoading(false);
      }
    } else {
      const id: string = crypto.randomUUID();
      const newPost: PostType = {
        id,
        title: postTitle,
        datetime,
        body: postBody,
      };
      try {
        await axiosInstance.post<PostType>("/posts", newPost);
        const allPost: PostType[] = [...posts, newPost];
        setPosts(allPost);
        setPostTitle("");
        setPostBody("");
        navigate("/");
        toast.success("Post created successfully");
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
      } finally {
        setIsBtnLoading(false);
      }
    }
  };

  return (
    <main className="w-full flex-grow p-4 overflow-y-auto bg-[#fff]">
      <h2>{state && state.isEdit ? "Edit Post" : "New Post"}</h2>
      <form
        className="flex flex-col"
        onSubmit={(e) => {
          if(btnLoading) return;
          setIsBtnLoading(true);
          handleSubmit(e, state?.isEdit, state?.post?.id);
        }}
      >
        <label className="mt-4" htmlFor="postTitle">
          Title:
        </label>
        <input
          className="font-inherit w-full min-h-12 text-base p-1 rounded mr-1 outline-none border border-solid border-black"
          type="text"
          name="postTitle"
          id="postTitle"
          required
          value={postTitle}
          onChange={(e) => {
            setPostTitle && setPostTitle(e.target.value);
          }}
        />
        <label className="mt-4" htmlFor="postBody">
          Post:
        </label>
        <textarea
          className="font-inherit w-full min-h-12 text-base p-1 rounded mr-1 outline-none border border-solid border-black h-[100px]"
          name="postBody"
          id="postBody"
          cols={30}
          rows={10}
          required
          value={postBody}
          onChange={(e) => {
            setPostBody && setPostBody(e.target.value);
          }}
        ></textarea>
        <button
          className={`mt-4 h-12 min-w-12 rounded-[10px] p-2 flex justify-center items-center text-base cursor-pointer border border-solid border-black bg-gray-300 ${
            btnLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={btnLoading}
        >
          {btnLoading ? (
            <FaSpinner className="text-center animate-spin" />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </main>
  );
};

export default NewPost;
