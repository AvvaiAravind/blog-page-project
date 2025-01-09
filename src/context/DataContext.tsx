import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { PostType } from "../components/App";
import useAxiosFetch from "../hooks/useAxiosFetch";

type DataContextReturn = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
  searchResults: PostType[];
  setSearchResults: React.Dispatch<React.SetStateAction<PostType[]>>;
  editPost: PostType | null;
  setEditPost: React.Dispatch<React.SetStateAction<PostType | null>>;
  data: PostType[];
  fetchError: any;
  isLoading: boolean;
};

type DataProviderProps = {
  children: ReactNode;
};

const DataContext = createContext<DataContextReturn | null>(null);

export const DataProvider = ({ children }: DataProviderProps) => {
  const [search, setSearch] = useState<string>("");
  const [posts, setPosts] = useState<PostType[]>([]);
  const [searchResults, setSearchResults] = useState<PostType[]>([]);
  const [editPost, setEditPost] = useState<PostType | null>(null);
  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  // useEffects

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
    setPosts(data);
  }, [data]);

  useEffect(() => {
    const filteredResults: PostType[] = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  // Functions

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        setSearchResults,
        posts,
        setPosts,
        searchResults,
        editPost,
        setEditPost,
        data,
        fetchError,
        isLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useCustomContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a Dataprovider");
  }
  return context;
};

export default DataContext;
