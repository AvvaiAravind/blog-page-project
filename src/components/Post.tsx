import { Link } from "react-router-dom";
import { PostType } from "./App";

type PostProps = {
  post: PostType;
};

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <article className="relative mt-4 pb-4 border-b border-solid border-[lightgray] first:mt-0 last:border-b-0">
      <div className="absolute left-0 w-[800px] h-full -ml-[calc(50vw-400px)] bg-transparent hover:bg-gray-300 -z-10"></div>

      <Link to={`/post/${post.id}`}>
        <h2 className="font-bold text-xl">{post.title}</h2>
        <p className="text-[0.75rem] mt-1">{post.datetime}</p>
        {/* <p>{post.id}</p> */}
      </Link>
      <p className="mt-4 mb-4 relative z-10">
        {post.body.length <= 25 ? post.body : `${post.body.slice(0, 25)}...`}
      </p>
    </article>
  );
};

export default Post;
