import { AxiosError } from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axiosInstance from "../api/posts";
import useAxiosFetch from "../hooks/useAxiosFetch";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";

export type PostType = {
  id: string;
  title: string;
  datetime: string;
  body: string;
};

function App() {
  // State varialbes and hooks

  const [posts, setPosts] = useState<PostType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<PostType[]>([]);
  const [postTitle, setPostTitle] = useState<string>("");
  const [postBody, setPostBody] = useState<string>("");
  const [editPost, setEditPost] = useState<PostType | null>(null);
  const navigate = useNavigate();
  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  // useEffeccts

  useEffect(() => {
    setPosts(data);
  }, [data]);

  /*   useEffect(() => {
    const fetchPosts = async (): Promise<void> => {
      try {
        const response = await axiosInstance.get<PostType[]>("/post");
        console.log(response);

        if (response && response.data) setPosts(response.data);
      } catch (error) {
        // Not in the 200 range
        if (error instanceof AxiosError && error.response) {
          console.log(error);
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error instanceof Error) {
          console.log("Error", error.message);
        }
      }
    };
    fetchPosts();
  }, []); */

  useEffect(() => {
    const filteredResults: PostType[] = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  // Functions

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await axiosInstance.delete(`/posts/${id}`);
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error instanceof Error) {
        console.log("Error", error.message);
      }
    }
  };

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
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error instanceof Error) {
          console.log("Error", error.message);
        }
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
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error instanceof Error) {
          console.log("Error", error.message);
        }
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
    <div className="w-full max-w-[800px] h-screen flex flex-col justify-start items-center border border-solid border-[#333] shadow-[0px_0px_15px_gray]">
      <Header />

      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              posts={searchResults}
              fetchError={fetchError}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/post/:id"
          element={
            <PostPage
              posts={posts}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          }
        />
        <Route
          path="/edit/:id"
          element={
            <NewPost
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
              handleSubmit={handleSubmit}
            />
          }
        />
        <Route
          path="/post"
          element={
            <NewPost
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
              handleSubmit={handleSubmit}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
