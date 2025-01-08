import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PostType } from "./App";

type NewPostProps = {
  postTitle: string;
  setPostTitle: React.Dispatch<React.SetStateAction<string>>;
  postBody: string;
  setPostBody: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent, isEdit?: boolean, id?: string) => void;
};

const NewPost: React.FC<NewPostProps> = ({
  postTitle,
  setPostTitle,
  postBody,
  setPostBody,
  handleSubmit,
}) => {
  // variables

  const location = useLocation();
  const state: { post?: PostType; isEdit?: boolean } = location.state;

  // use Effects

  useEffect(() => {
    if (state?.post && state?.isEdit) {
      setPostTitle(state.post.title);
      setPostBody(state.post.body);
    }
    return () => {
      setPostTitle("")
      setPostBody("")
    }
  }, [state]);

  return (
    <main className="w-full flex-grow p-4 overflow-y-auto bg-[#fff]">
      <h2>{state && state.isEdit ? "Edit Post" : "New Post"}</h2>
      <form
        className="flex flex-col"
        onSubmit={(e) => handleSubmit(e, state?.isEdit, state?.post?.id)}
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
          className="mt-4 h-12 min-w-12 rounded-[10px] p-2 text-base cursor-pointer border border-solid border-black bg-gray-300"
          type="submit"
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default NewPost;
