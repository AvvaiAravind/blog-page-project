import { Link } from "react-router-dom";
import { PostType } from "./App";

type PostProps = {
  post: PostType;
};

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <article className="mt-4 p-4 border-b border-solid border-[lightgray] first:mt-0 last:border-b-0 hover:bg-gray-300">
      {/* <div className="absolute inset-0 bg-transparent hover:bg-gray-300 pointer-events-none"></div> */}

      <Link to={`/post/${post.id}`}>
        <h2 className="font-bold text-xl">{post.title}</h2>
        <p className="text-[0.75rem] mt-1">{post.datetime}</p>

        <p className="mt-4 mb-4">
          {post.body.length <= 25 ? post.body : `${post.body.slice(0, 25)}...`}
        </p>
      </Link>
    </article>
  );
};

export default Post;
